export type DecisionType = 'ACCEPT' | 'REJECT' | 'FLAGGED';

export type CheckStatus = 'pass' | 'fail' | 'warn' | 'info';

export interface ValidationStepResult {
  checkName: string;
  category: 'AUTHENTICATION' | 'INTEGRITY' | 'SCHEMA' | 'SECURITY' | 'AI_AGENT';
  status: CheckStatus;
  detail: string;
  executionTimeMs: number;
}

export interface SecurityPolicyConfig {
  maxFileSizeBytes: number;
  allowedExtensions: string[];
  requireSignature: boolean;
  strictSchema: boolean;
  detectSqlInjection: boolean;
  detectXss: boolean;
  detectMalware: boolean;
  rateLimitRpm: number;
  aiStrictness: 'LENIENT' | 'BALANCED' | 'STRICT';
  apiKeySecret: string;
}

export interface ValidationRequest {
  fileName: string;
  fileContent: string; // raw text, json string, or base64
  mimeType: string;
  fileSizeBytes?: number;
  headers?: Record<string, string>;
  apiKey?: string;
  signature?: string;
  customSchema?: string;
}

export interface ValidationResponse {
  auditId: string;
  decision: DecisionType;
  overallRiskScore: number; // 0 to 100
  reasoning: string;
  remediationAdvice?: string;
  fileChecksums: {
    md5: string;
    sha256: string;
  };
  fileSizeBytes: number;
  steps: ValidationStepResult[];
  threatCategoriesDetected: string[];
  forwardedToEndpoint: boolean;
  timestamp: string;
}

export interface AuditLogEntry {
  auditId: string;
  timestamp: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  decision: DecisionType;
  overallRiskScore: number;
  threatCategories: string[];
  executionTimeMs: number;
  clientIp: string;
  reasoning: string;
  fileChecksumMd5: string;
}

export interface SampleTestCase {
  id: string;
  title: string;
  description: string;
  fileName: string;
  mimeType: string;
  expectedDecision: DecisionType;
  fileContent: string;
  apiKey?: string;
  signature?: string;
}
