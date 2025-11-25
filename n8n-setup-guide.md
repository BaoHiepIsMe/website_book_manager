# Hướng dẫn tích hợp n8n làm Backend cho AI DocOps

## Tổng quan

n8n là một công cụ workflow automation mã nguồn mở, hoàn hảo để làm backend cho AI DocOps. Bạn có thể tự host hoặc sử dụng n8n cloud.

## Cài đặt n8n

### Option 1: Docker (Khuyến nghị)

```bash
# Tạo file docker-compose.yml
docker-compose up -d
```

### Option 2: npm

```bash
npm install n8n -g
n8n start
```

### Option 3: n8n Cloud

Đăng ký tại https://n8n.io và sử dụng cloud instance.

## Cấu hình

1. **Truy cập n8n**: http://localhost:5678
2. **Tạo API Key** (nếu cần): Settings > API
3. **Cập nhật config trong frontend**: `frontend/js/config.js`

```javascript
const N8N_CONFIG = {
    baseURL: 'http://localhost:5678', // hoặc URL của n8n cloud
    apiKey: 'your-api-key-here', // nếu có
    // ...
};
```

## Các Workflows cần tạo trong n8n

### 1. Workflow: Document Upload & Classification

**Webhook Path**: `/webhook/document-upload`

**Flow**:
```
Webhook (POST) 
  → Save File to Storage
  → OCR (Tesseract/Google Vision API)
  → AI Classification (OpenAI/Claude API)
  → Auto Rename File
  → Save Metadata to Database
  → Create Audit Log
  → Return Response
```

**Nodes cần thiết**:
- Webhook node (trigger)
- HTTP Request (OCR service)
- Code node (AI classification logic)
- Database node (lưu metadata)
- Response node

### 2. Workflow: Get Documents

**Webhook Path**: `/webhook/get-documents`

**Flow**:
```
Webhook (POST với filters)
  → Query Database
  → Format Response
  → Return Documents List
```

### 3. Workflow: Create Signature Flow

**Webhook Path**: `/webhook/create-signature-flow`

**Flow**:
```
Webhook (POST với documentId, signatories)
  → Validate Document
  → Create Signature Request
  → Send Email to First Signer
  → Save to Database
  → Schedule Reminder (nếu cần)
  → Return Signature Flow ID
```

### 4. Workflow: Process Signature

**Webhook Path**: `/webhook/process-signature`

**Flow**:
```
Webhook (POST với signature data)
  → Validate Signature
  → Apply Signature to Document
  → Update Signature Status
  → Check if All Signed
  → If Yes: Mark Complete, Send Notification
  → If No: Send Email to Next Signer
  → Create Audit Log
  → Return Status
```

### 5. Workflow: Get Dashboard Stats

**Webhook Path**: `/webhook/get-dashboard-stats`

**Flow**:
```
Webhook (POST)
  → Query Database (counts, stats)
  → Calculate Metrics
  → Return Statistics
```

### 6. Workflow: Get Audit Logs

**Webhook Path**: `/webhook/get-audit-logs`

**Flow**:
```
Webhook (POST với filters)
  → Query Audit Logs Database
  → Apply Filters
  → Format Response
  → Return Logs
```

### 7. Workflow: Archive Document

**Webhook Path**: `/webhook/archive-document`

**Flow**:
```
Webhook (POST với documentId)
  → Encrypt Document
  → Move to Cold Storage
  → Update Database
  → Create Audit Log
  → Return Status
```

## Database Schema (Gợi ý)

Bạn có thể sử dụng PostgreSQL, MySQL, hoặc MongoDB với n8n.

### Documents Table
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    original_name VARCHAR(255),
    stored_name VARCHAR(255),
    file_path TEXT,
    file_size BIGINT,
    file_type VARCHAR(50),
    ai_tags JSONB,
    ai_confidence DECIMAL,
    category VARCHAR(100),
    uploaded_by VARCHAR(100),
    uploaded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Signature Flows Table
```sql
CREATE TABLE signature_flows (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    status VARCHAR(50),
    signatories JSONB,
    current_signer_index INTEGER,
    created_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    user_id VARCHAR(100),
    action VARCHAR(100),
    resource_type VARCHAR(50),
    resource_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);
```

## Tích hợp AI Services

### OCR (Optical Character Recognition)
- **Google Cloud Vision API**
- **Tesseract OCR** (open source)
- **AWS Textract**

### AI Classification
- **OpenAI GPT-4**
- **Anthropic Claude**
- **Google Gemini**

### Email Service
- **SendGrid**
- **AWS SES**
- **Mailgun**

## Ví dụ Workflow JSON (n8n Export)

Bạn có thể export workflow từ n8n và lưu vào thư mục `n8n-workflows/` để version control.

## Testing

1. **Test Webhook trực tiếp**:
```bash
curl -X POST http://localhost:5678/webhook/document-upload \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

2. **Test từ Frontend**:
   - Mở browser console
   - Gọi: `n8nApi.uploadDocument(file)`

## Security

1. **API Authentication**: Sử dụng API Key hoặc OAuth
2. **Webhook Security**: Thêm secret token vào webhook
3. **HTTPS**: Luôn sử dụng HTTPS trong production
4. **Rate Limiting**: Cấu hình rate limiting trong n8n

## Monitoring

- Sử dụng n8n's built-in execution logs
- Tích hợp với monitoring tools (Prometheus, Grafana)
- Set up alerts cho failed workflows

## Tài liệu tham khảo

- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io
- n8n Workflow Examples: https://n8n.io/workflows

