# Bài test đầu vào — Trang Đăng nhập / Đăng ký

> **Thời gian:** 1 ngày (~4–6 giờ). **Mục đích:** giúp mentor hiểu *cách em lập trình*. Làm được đến đâu cũng được — hãy ghi lại trung thực phần chưa làm được.

## Quy định
- Chỉ dùng **HTML, CSS, JavaScript thuần** — không framework, không thư viện.
- Được tra MDN, Google. **Không dùng AI** để sinh code hoặc câu trả lời.
- Em nhận sẵn thư mục `starter/` gồm `index.html` và `data.js`. **Không sửa `data.js`**. Trong `index.html` chỉ sửa đúng chỗ đề yêu cầu (Phần 1, câu 1).
- Em tự tạo 3 file: `style.css`, `user-utils.js`, `app.js`, và file `NOTES.md` ghi:
  - câu trả lời Phần 1,
  - thời gian làm từng phần,
  - phần chưa làm được, chỗ thấy khó,
  - các giả định em tự đặt ra khi đề chưa rõ.
- Nộp bằng repo GitHub, **commit sau mỗi phần**.
- Mở `index.html` trực tiếp trên trình duyệt hoặc dùng VS Code Live Server.

| Phần | Nội dung | Thời gian gợi ý |
|---|---|---|
| 1 | Lý thuyết (2 câu) | 15 phút |
| 2 | CSS: căn giữa khung đăng nhập | 45 phút |
| 3 | JavaScript: đăng ký / đăng nhập | 1.5–2 giờ |
| 4 | JavaScript: các hàm thống kê người dùng | 1.5–2 giờ |
| Bonus | Nâng cao (không bắt buộc) | còn thời gian thì làm |

---

## Phần 1 — Lý thuyết (15 phút)

Trả lời trong `NOTES.md`.

**Câu 1.** Thuộc tính `for` của thẻ `<label>` dùng để làm gì? Lợi ích với người dùng (kể cả người dùng trình đọc màn hình) là gì?
Trong form **Đăng ký** của `index.html` có **một ô nhập mà label chưa được gắn đúng** — hãy tìm và sửa lại.

**Câu 2.** Thẻ `<script>` có `defer` và `async` khác nhau thế nào? (Thời điểm tải, thời điểm chạy, thứ tự chạy.)
Trong `index.html`, 3 file script được nạp bằng `defer`. Giải thích vì sao. Nếu đổi cả 3 thành `async` thì có thể xảy ra lỗi gì?

---

## Phần 2 — CSS: căn giữa khung đăng nhập (45 phút)

Viết `style.css` cho `index.html`:

1. **Bắt buộc:** khung `.auth-card` nằm **chính giữa màn hình theo cả chiều ngang và chiều dọc**, kể cả khi thay đổi kích thước cửa sổ.
2. Viết **thêm ít nhất 1 cách căn giữa khác** (để trong comment của `style.css`), và ghi trong `NOTES.md` em chọn cách nào làm chính và vì sao.
3. Trình bày khung cho gọn gàng:
   - Khung rộng tối đa `360px`, có padding, bo góc, đổ bóng nhẹ, nền trắng trên nền trang màu xám nhạt.
   - Label nằm trên ô nhập; ô nhập và nút rộng hết khung.
   - Có trạng thái `:focus` rõ ràng cho ô nhập và `:hover` cho nút.
   - Màn hình nhỏ hơn `400px`: khung rộng gần hết màn hình, vẫn có lề hai bên.
4. Khai báo màu chính, màu nền, bo góc bằng **CSS variables** trong `:root`.

---

## Phần 3 — JavaScript: đăng ký / đăng nhập (1.5–2 giờ)

Viết trong `app.js`. Danh sách người dùng ban đầu lấy từ biến `users` trong `data.js`.

### 3.1 Chuyển form
- Bấm "Đăng ký" → ẩn form đăng nhập, hiện form đăng ký. Bấm "Đăng nhập" → ngược lại.
- Gợi ý: dùng thuộc tính `hidden` sẵn có trong HTML.

### 3.2 Đăng ký
Khi bấm "Tạo tài khoản", kiểm tra lần lượt. Gặp lỗi thì `alert` thông báo rõ ràng và **dừng lại**:

| Kiểm tra | Ví dụ thông báo |
|---|---|
| Không được bỏ trống ô nào (khoảng trắng cũng coi là trống) | "Vui lòng nhập Họ và tên" |
| Ngày sinh không được lớn hơn ngày hôm nay (`TODAY` trong `data.js`) | "Ngày sinh không hợp lệ" |
| **Tên đăng nhập chưa tồn tại** (không phân biệt hoa thường: `AnNguyen` trùng `annguyen`) | "Tên đăng nhập đã tồn tại" |
| Mật khẩu tối thiểu 6 ký tự | "Mật khẩu phải có ít nhất 6 ký tự" |
| **Mật khẩu và Nhập lại mật khẩu phải giống nhau** | "Mật khẩu nhập lại không khớp" |

Hợp lệ → thêm người dùng mới vào danh sách (gồm `username`, `password`, `fullName`, `birthDate`), `alert("Đăng ký thành công!")`, xoá trắng form và chuyển sang form đăng nhập.

### 3.3 Đăng nhập
- Bỏ trống → báo lỗi.
- Sai tên đăng nhập **hoặc** mật khẩu → `alert("Tên đăng nhập hoặc mật khẩu không đúng")`. (Vì sao không nên báo riêng "sai tên đăng nhập" hay "sai mật khẩu"? Trả lời trong `NOTES.md`.)
- Đúng → ẩn form, hiện phần **Thống kê** với dòng "Xin chào, {Họ và tên}".
- Nút "Đăng xuất" → quay lại form đăng nhập.
- Thử đăng nhập bằng tài khoản **vừa đăng ký** — phải thành công.

---

## Phần 4 — JavaScript: các hàm thống kê người dùng (1.5–2 giờ)

Viết trong `user-utils.js`, **từ dễ đến khó**. Yêu cầu chung:
- Mỗi hàm nhận dữ liệu qua **tham số** (không dùng trực tiếp biến toàn cục `users`, `TODAY` bên trong hàm).
- **Không làm thay đổi mảng `users` gốc.**
- Ưu tiên dùng `filter`, `map`, `reduce`, `find`, `sort`…
- "Tên" là **từ cuối cùng** của họ tên. Ví dụ "Nguyễn Thị Lan Anh" → tên là "Anh".

| # | Hàm | Yêu cầu |
|---|---|---|
| 4.1 | `getAge(birthDate, today)` | Tính tuổi **chính xác**: chưa tới sinh nhật trong năm thì chưa tính thêm tuổi. Ví dụ `getAge('2008-11-20', '2026-11-15')` → `17` |
| 4.2 | `getFirstName(fullName)` | Lấy tên: `'Nguyễn Thị Lan Anh'` → `'Anh'` (cẩn thận khoảng trắng thừa) |
| 4.3 | `countByFirstLetter(users, letter)` | **Số người có tên bắt đầu bằng chữ `letter`**, không phân biệt hoa thường. Ví dụ đếm tên bắt đầu bằng "A" |
| 4.4 | `countAdults(users, today)` | **Số người từ 18 tuổi trở lên** |
| 4.5 | `findOldest(users, today)` / `findYoungest(users, today)` | **Người lớn tuổi nhất / nhỏ tuổi nhất** (trả về object người dùng). Mảng rỗng → `null` |
| 4.6 | `getAverageAge(users, today)` | Tuổi trung bình, làm tròn 1 chữ số thập phân |
| 4.7 | `sortByAge(users, today)` | Mảng **mới** sắp xếp theo tuổi tăng dần |
| 4.8 | `searchByName(users, keyword)` | Tìm người có họ tên chứa `keyword`, không phân biệt hoa thường, bỏ khoảng trắng thừa ở `keyword` |
| 4.9 | `countByAgeGroup(users, today)` | Đếm theo nhóm, trả về `{ under18: số, from18to30: số, over30: số }` |

**Hiển thị:** sau khi đăng nhập, phần Thống kê (`#stats-list`) hiển thị kết quả dựa trên danh sách người dùng **hiện tại** (kể cả người vừa đăng ký), ví dụ:
```
Tổng số người dùng: 10
Số người có tên bắt đầu bằng "A": 3
Số người từ 18 tuổi trở lên: 7
Lớn tuổi nhất: ... (.. tuổi)
Nhỏ tuổi nhất: ... (.. tuổi)
Tuổi trung bình: ...
Dưới 18: ... · 18–30: ... · Trên 30: ...
```
Thêm một ô tìm kiếm trong phần Thống kê dùng `searchByName` để hiển thị danh sách người phù hợp.

**Tự kiểm tra:** viết code kiểm tra từng hàm bằng `console.assert(...)` hoặc in kết quả ra console, có cả trường hợp đặc biệt (mảng rỗng, người sinh đúng ngày hôm nay, keyword toàn khoảng trắng…).

---

## Bonus (không bắt buộc)
1. Lưu danh sách người dùng vào `localStorage`: tải lại trang vẫn đăng nhập được bằng tài khoản đã đăng ký.
2. `countByFirstLetter` bỏ qua dấu tiếng Việt (tên "Ánh" cũng tính là bắt đầu bằng "A"); `searchByName("anh")` khớp cả "Ánh".
3. `findOldest` trả về **tất cả** những người bằng tuổi nhau nếu có nhiều người cùng lớn tuổi nhất.
4. `getUpcomingBirthdays(users, today, days)`: danh sách người có sinh nhật trong `days` ngày tới, sắp xếp theo ngày gần nhất.
5. Thay `alert` bằng dòng báo lỗi hiển thị ngay dưới ô nhập bị sai.

---

## Trước khi nộp — tự kiểm tra
- [x] Đã sửa label trong form Đăng ký (Phần 1, câu 1).
- [x] Khung luôn ở giữa màn hình khi đổi kích thước cửa sổ.
- [x] Đăng ký trùng tên đăng nhập / mật khẩu nhập lại sai đều có thông báo.
- [x] Đăng nhập được bằng tài khoản vừa tạo.
- [ ] Không còn `console.log` thừa (trừ phần tự kiểm tra), không có lỗi trong Console.
- [ ] `NOTES.md` đầy đủ; mỗi phần có ít nhất 1 commit.
