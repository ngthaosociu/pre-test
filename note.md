**Câu 1.** Thuộc tính `for` của thẻ `<label>` dùng để làm gì? Lợi ích với người dùng (kể cả người dùng trình đọc màn hình) là gì?
Trong form **Đăng ký** của `index.html` có **một ô nhập mà label chưa được gắn đúng** — hãy tìm và sửa lại.
Ans: Thuộc tính `for` dùng để liên kết rõ ràng nhãn đó với 1 phần tử điều khiển biểu mẫu thông qua giá trị `id` trùng khớp. Lợi ích với người dùng gồm: Tăng vùng tương tác, hỗ trợ tối đa cho trình đọc màn hình, cải thiện tính trợ năng
Phần gắn chưa đúng là 
`<div class="form-field">`
          `<label> Ngày sinh</label>`
          `<input type="date" id="reg-birthdate" name="birthDate" />`
        `</div>`
sửa thành:
`<div class="form-field">`
          `<label for="reg-birthdate"> Ngày sinh</label>`
          `<input type="date" id="reg-birthdate" name="birthDate" />`
        `</div>`

**Câu 2.** Thẻ `<script>` có `defer` và `async` khác nhau thế nào? (Thời điểm tải, thời điểm chạy, thứ tự chạy.)
Trong `index.html`, 3 file script được nạp bằng `defer`. Giải thích vì sao. Nếu đổi cả 3 thành `async` thì có thể xảy ra lỗi gì?
Ans: Sự khác biệt của `defer` và `async` 
-Fetch: `defer` và `async` đều tải song song trong khi đang parse HTML.
-Execute: `defer` chạy sau khi HTML đã được phân tích hoàn tất (trước DOMContentLoad), `async` chạy ngay lập tức khi vừa tải xong (có dừng parse HTML tạm thời).
-Thứ tự chạy: `defer` giữ đúng thứ tự xuất hiện trong file, `async` không giữ thứ tự mà file script có thuộc tính `async` sẽ được thực thi ngay sau khi tải xong.

-3 file được nạp bằng `defer` vì: đảm bảo đúng thứ tự được khai báo trong HTML, chạy sau khi HTML đã hoàn tất và tải song song trong khi đang parse HTML mà không chặn phân tích HTML.
-Nếu đổi cả 3 thành `async` thì có thể sẽ có lỗi như: sai thứ tự thực thi, lỗi truy cập DOM.