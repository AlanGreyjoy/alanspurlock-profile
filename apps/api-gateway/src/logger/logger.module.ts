import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level:
          process.env.LOG_LEVEL ||
          (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),

        // Pretty print for development, JSON for production
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  levelFirst: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
                  ignore: 'pid,hostname',
                  singleLine: false,
                  messageFormat: '{req.method} {req.url} | {msg}',
                },
              },

        // Customize log messages
        customProps: (req, res) => ({
          context: 'HTTP',
        }),

        // Custom serializers for better log output
        serializers: {
          req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params,
            // Don't log sensitive headers or body by default
            headers: {
              host: req.headers.host,
              'user-agent': req.headers['user-agent'],
              'content-type': req.headers['content-type'],
            },
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },

        // Don't log every request in production (optional - remove if you want all logs)
        autoLogging: {
          ignore: (req) => {
            // Don't log health check endpoints
            return req.url === '/api/health' || req.url === '/health';
          },
        },

        // Add request ID for correlation
        genReqId: (req, res) => {
          const existingId = req.headers['x-request-id'];
          if (existingId) return existingId;

          const id = Math.random().toString(36).substring(2, 15);
          res.setHeader('X-Request-Id', id);
          return id;
        },

        // Redact sensitive data from logs
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.token',
            'req.body.secret',
          ],
          censor: '[REDACTED]',
        },
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
