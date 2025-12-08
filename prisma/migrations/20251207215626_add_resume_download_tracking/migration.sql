-- CreateTable
CREATE TABLE "resume_downloads" (
    "id" TEXT NOT NULL,
    "resumeType" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "downloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_downloads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resume_downloads_resumeType_idx" ON "resume_downloads"("resumeType");

-- CreateIndex
CREATE INDEX "resume_downloads_downloadedAt_idx" ON "resume_downloads"("downloadedAt");
