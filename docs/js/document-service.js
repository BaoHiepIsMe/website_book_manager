/**
 * Document Service
 * 
 * Service layer để xử lý các thao tác với tài liệu
 * Sử dụng n8n API service bên dưới
 */

class DocumentService {
    constructor(apiService) {
        this.api = apiService;
    }

    /**
     * Upload tài liệu với xử lý tự động
     */
    async uploadFile(file, userId = 'current-user') {
        try {
            // Hiển thị loading
            this.showLoading('Đang upload và xử lý tài liệu...');

            const metadata = {
                userId,
                originalName: file.name,
                fileSize: file.size,
                fileType: file.type
            };

            const result = await this.api.uploadDocument(file, metadata);

            // n8n workflow sẽ xử lý:
            // 1. OCR để đọc nội dung
            // 2. AI Classification để phân loại
            // 3. Auto-rename file
            // 4. Lưu vào storage
            // 5. Tạo audit log

            this.hideLoading();
            return result;
        } catch (error) {
            this.hideLoading();
            this.showError('Lỗi khi upload tài liệu: ' + error.message);
            throw error;
        }
    }

    /**
     * Lấy danh sách tài liệu với filter
     */
    async getDocuments(filters = {}) {
        try {
            const result = await this.api.getDocuments(filters);
            return result.documents || [];
        } catch (error) {
            this.showError('Lỗi khi lấy danh sách tài liệu: ' + error.message);
            throw error;
        }
    }

    /**
     * Tìm kiếm tài liệu
     */
    async searchDocuments(query) {
        try {
            const result = await this.api.searchDocuments(query);
            return result.documents || [];
        } catch (error) {
            this.showError('Lỗi khi tìm kiếm: ' + error.message);
            throw error;
        }
    }

    /**
     * Hiển thị loading indicator
     */
    showLoading(message) {
        // Tạo hoặc cập nhật loading indicator
        let loader = document.getElementById('global-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            `;
            document.body.appendChild(loader);
        }
        loader.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div class="spinner" style="border: 3px solid #f3f3f3; border-top: 3px solid #3b82f6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                <p>${message}</p>
            </div>
        `;
        loader.style.display = 'flex';
    }

    /**
     * Ẩn loading indicator
     */
    hideLoading() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    /**
     * Hiển thị thông báo lỗi
     */
    showError(message) {
        // Có thể sử dụng toast notification library
        alert(message); // Tạm thời dùng alert, có thể thay bằng toast
    }
}

// Khởi tạo service
const documentService = new DocumentService(n8nApi);

// Export
if (typeof window !== 'undefined') {
    window.documentService = documentService;
}

