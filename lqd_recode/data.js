/* ============================================================
   data.js – NƠI DUY NHẤT để sửa nội dung thử thách (và các phần sau).
   Quy tắc: chỉ ghi dữ kiện đã kiểm chứng. Chưa chắc thì giữ dấu [CẦN KIỂM CHỨNG].
   Chú ý khi sửa: giữ dấu nháy "..." và dấu phẩy , giữa các mục.
============================================================ */

const QUIZ = {

  // Số điểm cho mỗi câu trả lời đúng
  diemMoiCau: 10,

  // Huy hiệu nhận được khi làm xong tất cả câu hỏi
  // (id này sẽ dùng lại ở phần Hệ thống huy hiệu sau này)
  huyHieu: {
    id: "nha-khao-cuu",
    ten: "Nhà khảo cứu",
    moTa: "Đã hoàn thành Thử thách 300 năm."
  },

  // Lời nhận xét theo tỉ lệ đúng (xét từ cao xuống thấp)
  nhanXet: [
    { tuTiLe: 1.0, loi: "Tuyệt vời! Bạn nắm rất chắc về Lê Quý Đôn." },
    { tuTiLe: 0.6, loi: "Khá lắm! Đọc lại phần Hồ sơ số để chắc hơn nhé." },
    { tuTiLe: 0,   loi: "Cố lên! Xem lại Hồ sơ số rồi thử sức lần nữa." }
  ],

  // Danh sách câu hỏi.
  //   hoi       : nội dung câu hỏi
  //   dapAn     : các lựa chọn (2-4 lựa chọn)
  //   dung      : vị trí đáp án đúng, ĐẾM TỪ 0 (0 = đáp án đầu tiên)
  //   giaiThich : hiện ra sau khi trả lời
  //   nguon     : nguồn tài liệu
  cauHoi: [
    {
      hoi: "Năm 2026 là kỷ niệm 300 năm ngày sinh Lê Quý Đôn. Vậy ông sinh năm nào?",
      dapAn: ["1626", "1726", "1826", "1926"],
      dung: 1,
      giaiThich: "2026 trừ 300 năm là 1726. [CẦN KIỂM CHỨNG]",
      nguon: "Tiểu sử nhà Bác học Lê Quý Ðôn (1726 -1784) – TH Lê Quý Đôn; Kỷ niệm 300 năm Ngày sinh Danh nhân Lê Quý Đôn (1726 - 2026) – Công an Hưng Yên"
    },
    {
      hoi: "Tác phẩm nào dưới đây là của Lê Quý Đôn?",
      dapAn: ["Vân đài loại ngữ", "Truyện Kiều", "Chinh phụ ngâm", "Cung oán ngâm khúc"],
      dung: 0,
      giaiThich: "Các tác phẩm còn lại do tác giả khác sáng tác. [CẦN KIỂM CHỨNG]",
      nguon: "Tiểu sử nhà Bác học Lê Quý Ðôn (1726 -1784) – TH Lê Quý Đôn; Kỷ niệm 300 năm Ngày sinh Danh nhân Lê Quý Đôn (1726 - 2026) – Công an Hưng Yên"
    },
    {
      // CÂU MẪU: nhóm tự điền nội dung thật sau khi kiểm chứng
      hoi: "Lê Quý Đôn sinh ra ở đâu?",
      dapAn: ["Làng Diên Hà, trấn Sơn Nam Hạ", "Trường THPT Lê Quý Đôn", "Hà Nội", "Huế"],
      dung: 0,
      giaiThich: "Thôn Phú Hiếu (hoặc Đồng Phú), xã Độc Lập, huyện Hưng Hà, tỉnh Thái Bình.",
      nguon: "https://thptlequydon.edu.vn/about/Tieu-su-Nha-bac-hoc-Le-Quy-Don.html"
    },
    {
      // CÂU MẪU
      hoi: "Ông đi sứ vào thời gian nào và đến đâu? ",
    dapAn: ["1760-1762 - sang nhà Thanh(Trung Quốc)", "2025-2027, sang Israel", "1743-1750, nhà Thanh(Trung Quốc)", "Không đi sứ bao giờ"],
      dung: 0,
      giaiThich: "Là Phó sứ sang nhà Thanh. Ông giao lưu học thuật, tiếp thu tri thức mới; khi về nước được thăng Thừa chỉ Viện Hàn lâm, làm Học sĩ Bí thư các.",
      nguon: "https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327"
    },
    {
      hoi: "Muốn học theo cách làm việc của Lê Quý Đôn, việc nào phù hợp nhất?",
      dapAn: [
        "Ghi chép cẩn thận, phân loại và đối chiếu tư liệu",
        "Chỉ học thuộc lòng trước giờ kiểm tra",
        "Chép bài của bạn cho nhanh",
        "Không cần ghi chép, cứ nhớ trong đầu"
      ],
      dung: 0,
      giaiThich: "Ghi chép, phân loại, đối chiếu là phương pháp trong phần Học như Lê Quý Đôn.",
      nguon: " "
    }
  ]
};


/* ============================================================
   NGUỒN THAM KHẢO – hiện ở phần "Nguồn tham khảo" cuối trang.
   Mỗi nguồn: ten (tiêu đề bài), donVi (nơi đăng), ngayDang, ngayTruyCap, url.
   Thêm nguồn mới: sao chép một khối { ... } và nhớ dấu phẩy giữa các khối.
============================================================ */
const NGUON = {

  // Lời nhắc hiện phía trên danh sách
  luuY: "Các nguồn có thể ghi khác nhau về một số năm tháng và con số. Nhóm cần đối chiếu nhiều nguồn rồi mới dùng, giống cách Lê Quý Đôn khảo cứu.",

  danhSach: [
    {
      ten: "Tiểu sử nhà Bác học Lê Quý Ðôn (1726 -1784)",
      donVi: "Website Trường Tiểu học Lê Quý Đôn (thlequydon.hanoi.edu.vn)",
      ngayDang: "01/07/2021",
      ngayTruyCap: "11/10/2026",
      url: "https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327"
    },
    {
      ten: "Kỷ niệm 300 năm Ngày sinh Danh nhân Lê Quý Đôn (1726 - 2026)",
      donVi: "Cổng Thông tin điện tử Công an Hưng Yên (congan.hungyen.gov.vn)",
      ngayDang: "15/04/2026",
      ngayTruyCap: "11/10/2026",
      url: "https://congan.hungyen.gov.vn/ky-niem-300-nam-ngay-sinh-danh-nhan-le-quy-don-1726-2026-c235092.html"
    }
  ]
};


/* ============================================================
   TÁC PHẨM CHÍNH – hiện ở thẻ lật phần "Hồ sơ số".
   Mỗi tác phẩm:
     id     : tên không dấu, không khoảng trắng (dùng nội bộ, KHÔNG được trùng nhau)
     ten    : tên hiển thị
     anh    : đường dẫn ảnh trong thư mục assets. PHẢI GIỐNG HỆT tên file,
              kể cả chữ hoa/chữ thường và đuôi (.jpg, .png...).
              Mẹo: trong VS Code bấm chuột phải vào file ảnh → "Copy Relative Path".
     altAnh : mô tả ảnh (cho người dùng đọc bằng máy đọc màn hình)
     doan   : các đoạn văn mặt sau thẻ. Thêm bao nhiêu đoạn tùy ý, cách nhau bằng dấu phẩy.
     nguon  : nguồn của nội dung
   Phần mô tả dưới đây diễn đạt lại từ hai nguồn ở mục NGUON, nhóm vẫn cần kiểm chứng.
============================================================ */
const TAC_PHAM = [
  {
    // van dai loai ngu
    id: "van-dai-loai-ngu",
    ten: "Vân đài loại ngữ",
    anh: "assets/Van_Dai_Loai_Ngu.jpg",
    altAnh: "Ảnh tư liệu về Vân đài loại ngữ",
    doan: [
      "Thể loại: Bách khoa toàn thư / Loại thư.",
      "Nội dung: Tập hợp và phân loại các tri thức khoa học tự nhiên, xã hội, triết học, lịch sử, văn hóa, địa lý từ các sách cổ Trung Quốc và Việt Nam.",
      "Ý nghĩa: Được xem là bộ bách khoa toàn thư đầu tiên ở Việt Nam, thể hiện tầm vóc tri thức đồ sộ và tinh thần khoa học tiến bộ của Lê Quý Đôn."
    ],
    nguon: "Nguồn: TH Lê Quý Đôn(https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327)"
  },
  {
    // dai viet thong su
    id: "dai-viet-thong-su",
    ten: "Đại Việt thông sử",
    anh: "assets/Dai_Viet_Thong_Su.jpg",
    altAnh: "Ảnh tư liệu về Đại Việt thông sử",
    doan: [
      "Thể loại: Sử thư (Lịch sử theo thể kỷ truyền).",
      "Nội dung: Ghi chép về triều đại nhà Lê bắt đầu từ thời vua Lê Thái Tổ (Lê Lợi) đến hết thời vua Lê Chiêu Tông, ghi lại các sự kiện lịch sử, thế phả, các nhân vật lịch sử.",
      "Ý nghĩa: Là tác phẩm sử học có giá trị cao về mặt tư liệu và phương pháp nghiên cứu sử học, góp phần bảo tồn di sản lịch sử dân tộc."
    ],
    nguon: "Nguồn: TH Lê Quý Đôn(https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327)"
  },
  {
    id: "kien-van-tieu-luc",
    ten: "Kiến văn tiểu lục",
    anh: "assets/Kieu_Van_Tieu_Luc.jpg",
    altAnh: "Ảnh tư liệu về Kiến văn tiểu lục",
    doan: [
      "Thể loại: Tạp ký / Bút ghi chép lịch sử, văn hóa.",
      "Nội dung: Ghi chép lại những điều nghe thấy, thấy tận mắt của Lê Quý Đôn về chế độ chính trị, kinh tế, phong tục tập quán, nhân vật và di tích lịch sử nước ta qua các thời kỳ.",
      "Ý nghĩa: Cung cấp nguồn tư liệu thực tế vô cùng phong phú và quý giá về xã hội, văn hóa Việt Nam thời phong kiến"
    ],
    nguon: "Nguồn: TH Lê Quý Đôn(https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327)"
  },
  {
    id: "phu-bien-tap-luc",
    ten: "Phủ biên tạp lục",
    anh: "assets/Phu_Bien_Tap_Luc.jpg",
    altAnh: "Ảnh tư liệu về Phủ biên tạp lục",
    doan: [
      "Thể loại: Địa chí / Tập ghi chép khảo sát địa lý - lịch sử.",
      "Nội dung: Ghi chép chi tiết về tình hình địa lý, tài nguyên, kinh tế, chính trị, văn hóa và phong tục tập quán của vùng đất Thuận Hóa và Quảng Nam (vùng xứ Đàng Trong).",
      "Tài liệu lịch sử - địa lý đặc biệt quan trọng, ghi nhận rõ ràng về chủ quyền của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa."
    ],
    nguon: "Nguồn: TH Lê Quý Đôn(https://thlequydon.hanoi.edu.vn/gioi-thieu-chung/tieu-su-nha-bac-hoc-le-quy-on-1726-1784/ctmb/12076/343327)"
  }
];
