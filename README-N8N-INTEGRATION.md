# Hướng dẫn tích hợp n8n Backend cho AI DocOps

## Tổng quan

Project này đã được tích hợp với **n8n** làm backend để xử lý các workflows tự động. n8n là một công cụ workflow automation mã nguồn mở, cho phép bạn tạo các luồng xử lý phức tạp mà không cần viết code.

## Kiến trúc

```
Frontend (HTML/JS)
    ↓
N8N API Service (js/n8n-api.js)
    ↓
n8n Workflows (Webhooks)
    ↓
External Services (OCR, AI, Database, Email, etc.)
```

## Cài đặt nhanh

### 1. Cài đặt n8n

**Option A: Docker (Khuyến nghị)**

```bash
docker-compose up -d
```

Truy cập: http://localhost:5678

**Option B: npm**

```bash
npm install n8n -g
n8n start
```

### 2. Cấu hình Frontend

Mở file `frontend/js/config.js` và cập nhật:

```javascript
const N8N_CONFIG = {
    baseURL: 'http://localhost:5678', // URL của n8n instance
    apiKey: '', // API key nếu có
    // ...
};
```

### 3. Tạo Workflows trong n8n

Bạn cần tạo các workflows sau trong n8n (xem chi tiết trong `n8n-setup-guide.md`):

1. **Document Upload** - `/webhook/document-upload`
2. **Get Documents** - `/webhook/get-documents`
3. **Create Signature Flow** - `/webhook/create-signature-flow`
4. **Process Signature** - `/webhook/process-signature`
5. **Get Dashboard Stats** - `/webhook/get-dashboard-stats`
6. **Get Audit Logs** - `/webhook/get-audit-logs`
7. **Archive Document** - `/webhook/archive-document`

## Cấu trúc Files

```
frontend/
├── js/
│   ├── config.js              # Cấu hình kết nối n8n
│   ├── n8n-api.js             # API service layer
│   └── document-service.js    # Document service wrapper
├── app-documents.html         # Đã tích hợp upload & list documents
├── app-dashboard.html         # Đã tích hợp load stats
└── app-esignature.html        # Đã tích hợp signature flows

n8n-setup-guide.md             # Hướng dẫn chi tiết setup n8n
docker-compose.yml             # Docker config cho n8n
```

## Sử dụng

### Upload Tài liệu

1. Mở trang `app-documents.html`
2. Kéo thả file vào vùng upload hoặc click để chọn file
3. File sẽ được gửi đến n8n workflow `/webhook/document-upload`
4. n8n sẽ xử lý:
   - OCR để đọc nội dung
   - AI Classification để phân loại
   - Auto-rename file
   - Lưu vào database
   - Tạo audit log

### Lấy danh sách tài liệu

```javascript
// Trong browser console hoặc code
const documents = await documentService.getDocuments();
console.log(documents);
```

### Tìm kiếm tài liệu

```javascript
const results = await documentService.searchDocuments('hợp đồng');
```

### Tạo luồng chữ ký

```javascript
const signatureFlow = await n8nApi.createSignatureFlow({
    documentId: 'doc-123',
    signatories: [
        { email: 'user1@example.com', name: 'User 1' },
        { email: 'user2@example.com', name: 'User 2' }
    ],
    deadline: '2025-12-31'
});
```

## API Endpoints (n8n Webhooks)

Tất cả các endpoints đều là POST requests đến n8n webhooks:

| Endpoint | Mô tả | Input |
|----------|-------|-------|
| `/webhook/document-upload` | Upload và xử lý tài liệu | FormData (file + metadata) |
| `/webhook/get-documents` | Lấy danh sách tài liệu | `{ filters: {...} }` |
| `/webhook/create-signature-flow` | Tạo luồng ký | `{ documentId, signatories, ... }` |
| `/webhook/process-signature` | Xử lý chữ ký | `{ documentId, signatureId, ... }` |
| `/webhook/get-dashboard-stats` | Lấy thống kê | `{}` |
| `/webhook/get-audit-logs` | Lấy audit logs | `{ filters: {...} }` |
| `/webhook/archive-document` | Lưu trữ tài liệu | `{ documentId, ... }` |

## Testing

### Test từ Browser Console

```javascript
// Test upload
const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
await documentService.uploadFile(file);

// Test get documents
const docs = await documentService.getDocuments();

// Test search
const results = await documentService.searchDocuments('hợp đồng');
```

### Test từ Terminal (curl)

```bash
# Test webhook
curl -X POST http://localhost:5678/webhook/get-dashboard-stats \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Tích hợp AI Services

Trong n8n workflows, bạn có thể tích hợp:

- **OCR**: Google Cloud Vision, Tesseract, AWS Textract
- **AI Classification**: OpenAI GPT-4, Claude, Gemini
- **Email**: SendGrid, AWS SES, Mailgun
- **Storage**: AWS S3, Google Cloud Storage, Azure Blob

## Database

n8n có thể kết nối với:
- PostgreSQL
- MySQL
- MongoDB
- SQLite (mặc định)

Xem schema gợi ý trong `n8n-setup-guide.md`

## Security

1. **API Key**: Thêm API key trong `config.js` nếu n8n yêu cầu
2. **HTTPS**: Sử dụng HTTPS trong production
3. **Webhook Secrets**: Thêm secret token vào webhook nodes trong n8n
4. **CORS**: Cấu hình CORS trong n8n nếu cần

## Troubleshooting

### Lỗi CORS

Nếu gặp lỗi CORS, thêm vào n8n environment variables:
```
N8N_CORS_ORIGIN=http://localhost:3000
```

### Webhook không hoạt động

1. Kiểm tra workflow đã được activate chưa
2. Kiểm tra webhook path đúng chưa
3. Kiểm tra n8n logs: `docker logs ai-docops-n8n`

### API không trả về dữ liệu

1. Kiểm tra workflow execution trong n8n UI
2. Kiểm tra error logs trong từng node
3. Test webhook trực tiếp từ n8n UI

## Tài liệu tham khảo

- [n8n Documentation](https://docs.n8n.io)
- [n8n Workflow Examples](https://n8n.io/workflows)
- [n8n Community](https://community.n8n.io)

## Hỗ trợ

Nếu gặp vấn đề, xem file `n8n-setup-guide.md` để biết chi tiết cách setup từng workflow.




