# Pino Logger Usage Guide

## Overview

This API uses `nestjs-pino` for high-performance structured logging. The logger is configured to:

- 🎨 Pretty print logs in development
- 📊 Output structured JSON logs in production
- 🔍 Automatically track request IDs for correlation
- 🔒 Redact sensitive data (passwords, tokens, cookies)
- ⚡ Log all HTTP requests and responses

## Configuration

The logger is configured in `src/logger/logger.module.ts` with:

- **Development**: Colorized, human-readable logs with timestamps
- **Production**: Structured JSON logs for log aggregation services
- **Request ID**: Automatic correlation IDs for tracing requests
- **Sensitive Data**: Automatic redaction of passwords, tokens, authorization headers

### Environment Variables

```bash
# Optional: Set log level (default: debug in dev, info in production)
LOG_LEVEL=debug|info|warn|error

# Environment (affects log format)
NODE_ENV=development|production
```

## Usage in Controllers

### Basic Usage

```typescript
import { Controller, Get } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Controller('example')
export class ExampleController {
  constructor(private readonly logger: Logger) {}

  @Get()
  async findAll() {
    this.logger.log('Fetching all items', 'ExampleController');

    try {
      const items = await this.getItems();
      this.logger.log(`Found ${items.length} items`, 'ExampleController');
      return items;
    } catch (error) {
      this.logger.error(`Failed to fetch items: ${error.message}`, error.stack, 'ExampleController');
      throw error;
    }
  }
}
```

### Advanced Usage with Context

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Controller('users')
export class UsersController {
  constructor(private readonly logger: Logger) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Add contextual information to logs
    this.logger.log({ userId: id }, 'Fetching user');

    try {
      const user = await this.findUserById(id);

      // Log with structured data
      this.logger.log(
        {
          userId: id,
          username: user.username,
          found: true,
        },
        'User fetched successfully'
      );

      return user;
    } catch (error) {
      // Log errors with context
      this.logger.error(
        {
          userId: id,
          error: error.message,
        },
        'Failed to fetch user'
      );
      throw error;
    }
  }
}
```

## Usage in Services

```typescript
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(private readonly logger: Logger) {}

  async createUser(userData: CreateUserDto) {
    this.logger.log({ email: userData.email }, 'Creating new user');

    try {
      const user = await this.repository.create(userData);

      this.logger.log({ userId: user.id, email: user.email }, 'User created successfully');

      return user;
    } catch (error) {
      this.logger.error(
        {
          email: userData.email,
          error: error.message,
        },
        'Failed to create user'
      );
      throw error;
    }
  }

  async performComplexOperation() {
    const startTime = Date.now();

    this.logger.log('Starting complex operation', 'UserService');

    try {
      // ... perform operation
      const duration = Date.now() - startTime;

      this.logger.log({ duration, unit: 'ms' }, 'Complex operation completed');
    } catch (error) {
      const duration = Date.now() - startTime;

      this.logger.error(
        {
          duration,
          error: error.message,
          stack: error.stack,
        },
        'Complex operation failed'
      );
      throw error;
    }
  }
}
```

## Log Levels

```typescript
// Debug - verbose information for debugging
this.logger.debug('Detailed debug information', 'Context');

// Log/Info - general informational messages
this.logger.log('User logged in', 'AuthService');

// Warn - warning messages (non-critical issues)
this.logger.warn('API rate limit approaching', 'RateLimitService');

// Error - error messages (critical issues)
this.logger.error('Database connection failed', error.stack, 'DatabaseService');

// Fatal - critical errors that require immediate attention
this.logger.fatal('Cannot start application', error.stack, 'Bootstrap');
```

## Automatic HTTP Request Logging

All HTTP requests are automatically logged with:

- Request ID (for correlation)
- HTTP method and URL
- Query parameters
- Response status code
- Response time

Example output (development):

```
[10:30:45.123] INFO (HTTP): GET /api/users?limit=10
  reqId: "abc123xyz"
  method: "GET"
  url: "/api/users"
  query: { limit: "10" }
  statusCode: 200
  responseTime: 45
```

## Request ID Correlation

Every request gets a unique ID that's:

1. Generated automatically
2. Added to response headers (`X-Request-Id`)
3. Included in all logs for that request
4. Can be passed by client via `X-Request-Id` header

This helps trace a single request through your entire system.

## Sensitive Data Redaction

The following fields are automatically redacted in logs:

- `req.headers.authorization`
- `req.headers.cookie`
- `req.body.password`
- `req.body.token`
- `req.body.secret`

These will appear as `[REDACTED]` in logs.

## Best Practices

### ✅ DO

```typescript
// Include context/metadata with logs
this.logger.log({ userId, action: 'update' }, 'User updated');

// Use structured logging for better searchability
this.logger.log(
  {
    event: 'payment_processed',
    amount: 100,
    currency: 'USD',
    userId: 123,
  },
  'Payment processed'
);

// Log errors with full stack traces
this.logger.error('Operation failed', error.stack, 'ServiceName');

// Add timing information for performance monitoring
const start = Date.now();
// ... operation
this.logger.log({ duration: Date.now() - start }, 'Operation completed');
```

### ❌ DON'T

```typescript
// Don't log sensitive information
this.logger.log(`Password: ${password}`); // ❌

// Don't log huge objects/arrays without filtering
this.logger.log(entireDatabase); // ❌

// Don't use console.log
console.log('Something happened'); // ❌ Use this.logger instead

// Don't log at wrong levels
this.logger.error('User logged in'); // ❌ Should be .log()
```

## Production Considerations

### Log Aggregation

In production, logs are output as JSON which can be:

- Collected by Docker/Kubernetes
- Sent to log aggregation services (Datadog, New Relic, CloudWatch, etc.)
- Parsed and searched efficiently

### Log Volume

- Health check endpoints are excluded from request logs
- Consider log sampling for high-traffic endpoints
- Use appropriate log levels (info/warn/error in prod, debug in dev)

### Performance

Pino is one of the fastest Node.js loggers:

- Asynchronous logging
- Low CPU overhead
- Minimal memory footprint

## Example: Complete Controller

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Controller('products')
export class ProductsController {
  constructor(private readonly logger: Logger, private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    this.logger.log('Fetching all products', 'ProductsController');

    const startTime = Date.now();
    const products = await this.productsService.findAll();
    const duration = Date.now() - startTime;

    this.logger.log({ count: products.length, duration }, 'Products fetched');

    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log({ productId: id }, 'Fetching product');

    try {
      const product = await this.productsService.findOne(id);
      this.logger.log({ productId: id, found: true }, 'Product found');
      return product;
    } catch (error) {
      this.logger.error({ productId: id, error: error.message }, 'Product not found');
      throw error;
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    this.logger.log({ name: createProductDto.name }, 'Creating product');

    try {
      const product = await this.productsService.create(createProductDto);

      this.logger.log({ productId: product.id, name: product.name }, 'Product created successfully');

      return product;
    } catch (error) {
      this.logger.error({ name: createProductDto.name, error: error.message }, 'Failed to create product', error.stack);
      throw error;
    }
  }
}
```

## Troubleshooting

### Logs not appearing?

- Check `LOG_LEVEL` environment variable
- Ensure LoggerModule is imported in AppModule
- Verify app.useLogger() is called in main.ts

### Want to disable request logging for specific endpoints?

Edit the `autoLogging.ignore` function in `logger.module.ts`:

```typescript
autoLogging: {
  ignore: (req) => {
    return req.url === '/api/health' || req.url === '/api/metrics';
  },
}
```

### Need to log to file or external service?

Add additional transports in production mode in `logger.module.ts`.
