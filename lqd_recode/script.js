/* ============================================================
   script.js – Phần JavaScript của trang.
   Hiện có: Thử thách 300 năm (trắc nghiệm, điểm, huy hiệu).
   Dữ liệu câu hỏi nằm ở data.js (biến QUIZ).
============================================================ */

/* ---------- Lưu trữ an toàn ----------
   localStorage có thể bị chặn (chế độ riêng tư). Dùng try/catch để trang không bị lỗi. */
function luuDuLieu(khoa, giaTri) {
  try { localStorage.setItem(khoa, JSON.stringify(giaTri)); } catch (e) { /* bỏ qua */ }
}
function docDuLieu(khoa, macDinh) {
  try {
    const s = localStorage.getItem(khoa);
    return s ? JSON.parse(s) : macDinh;
  } catch (e) { return macDinh; }
}

/* Hàm nhỏ để tạo một thẻ HTML: tao("button", "ten-class", "Chữ hiển thị") */
function tao(thẻ, lop, chu) {
  const el = document.createElement(thẻ);
  if (lop) el.className = lop;
  if (chu) el.textContent = chu;
  return el;
}

/* ============ THỬ THÁCH 300 NĂM ============ */
(function khoiTaoThuThach() {
  const khung = document.getElementById("quiz-box");
  const oTienDo = document.getElementById("quiz-progress");
  const oDiem = document.getElementById("quiz-score");
  if (!khung || typeof QUIZ === "undefined") return;   // không có dữ liệu thì thôi

  const tongCau = QUIZ.cauHoi.length;
  let cauHienTai = 0;   // đang ở câu số mấy (đếm từ 0)
  let diem = 0;         // điểm trong lượt chơi này

  function capNhatThanhTrangThai() {
    oTienDo.textContent = "Câu " + Math.min(cauHienTai + 1, tongCau) + "/" + tongCau;
    oDiem.textContent = "Điểm: " + diem;
  }

  /* Hiện một câu hỏi */
  function hienCauHoi() {
    khung.innerHTML = "";
    capNhatThanhTrangThai();
    const cau = QUIZ.cauHoi[cauHienTai];

    khung.appendChild(tao("p", "quiz__hoi", cau.hoi));

    const dsDapAn = tao("div", "quiz__dapan");
    const phanHoi = tao("div", "quiz__phanhoi");
    phanHoi.setAttribute("aria-live", "polite");   // máy đọc màn hình sẽ đọc kết quả

    cau.dapAn.forEach(function (chu, viTri) {
      const nut = tao("button", "quiz__lua-chon", chu);
      nut.type = "button";
      nut.addEventListener("click", function () {
        chonDapAn(viTri, dsDapAn, phanHoi, cau);
      });
      dsDapAn.appendChild(nut);
    });

    khung.appendChild(dsDapAn);
    khung.appendChild(phanHoi);
  }

  /* Khi học sinh chọn một đáp án */
  function chonDapAn(viTri, dsDapAn, phanHoi, cau) {
    const cacNut = dsDapAn.querySelectorAll("button");
    const dungRoi = viTri === cau.dung;

    // Khóa các nút, tô màu đáp án đúng/sai
    cacNut.forEach(function (nut, i) {
      nut.disabled = true;
      if (i === cau.dung) nut.classList.add("is-dung");
      else if (i === viTri) nut.classList.add("is-sai");
    });

    if (dungRoi) diem += QUIZ.diemMoiCau;
    capNhatThanhTrangThai();

    phanHoi.innerHTML = "";
    phanHoi.appendChild(tao("p", "quiz__ketqua " + (dungRoi ? "is-dung" : "is-sai"),
      dungRoi ? "Chính xác! +" + QUIZ.diemMoiCau + " điểm" : "Chưa đúng rồi."));
    phanHoi.appendChild(tao("p", "quiz__giaithich", cau.giaiThich));
    phanHoi.appendChild(tao("p", "quiz__nguon", "Nguồn: " + cau.nguon));

    const laCauCuoi = cauHienTai === tongCau - 1;
    const nutTiep = tao("button", "btn quiz__tiep", laCauCuoi ? "Xem kết quả" : "Câu tiếp theo");
    nutTiep.type = "button";
    nutTiep.addEventListener("click", function () {
      if (laCauCuoi) hienKetQua();
      else { cauHienTai++; hienCauHoi(); }
    });
    phanHoi.appendChild(nutTiep);
    nutTiep.focus();
  }

  /* Màn hình kết quả + trao huy hiệu */
  function hienKetQua() {
    khung.innerHTML = "";
    const tongDiem = tongCau * QUIZ.diemMoiCau;
    oTienDo.textContent = "Hoàn thành";
    oDiem.textContent = "Điểm: " + diem;

    // Điểm cao nhất được nhớ lại trên máy
    const caoNhat = Math.max(diem, docDuLieu("lqd_quiz_caonhat", 0));
    luuDuLieu("lqd_quiz_caonhat", caoNhat);

    // Trao huy hiệu (danh sách huy hiệu dùng chung cho cả trang)
    const dsHuyHieu = docDuLieu("lqd_huyhieu", []);
    const moiNhan = dsHuyHieu.indexOf(QUIZ.huyHieu.id) === -1;
    if (moiNhan) {
      dsHuyHieu.push(QUIZ.huyHieu.id);
      luuDuLieu("lqd_huyhieu", dsHuyHieu);
    }

    // Chọn lời nhận xét theo tỉ lệ đúng
    const tiLe = diem / tongDiem;
    let loi = QUIZ.nhanXet[QUIZ.nhanXet.length - 1].loi;
    for (let i = 0; i < QUIZ.nhanXet.length; i++) {
      if (tiLe >= QUIZ.nhanXet[i].tuTiLe) { loi = QUIZ.nhanXet[i].loi; break; }
    }

    khung.appendChild(tao("p", "quiz__tongdiem", diem + "/" + tongDiem + " điểm"));
    khung.appendChild(tao("p", "", loi));

    const huyHieu = tao("div", "quiz__huyhieu" + (moiNhan ? " is-moi" : ""));
    huyHieu.appendChild(tao("span", "quiz__huyhieu-icon", "</>"));
    huyHieu.appendChild(tao("strong", "", "Huy hiệu: " + QUIZ.huyHieu.ten));
    huyHieu.appendChild(tao("span", "", QUIZ.huyHieu.moTa));
    khung.appendChild(huyHieu);

    khung.appendChild(tao("p", "quiz__nguon", "Điểm cao nhất của bạn: " + caoNhat));

    const nutLai = tao("button", "btn", "Chơi lại");
    nutLai.type = "button";
    nutLai.addEventListener("click", function () {
      cauHienTai = 0; diem = 0; hienCauHoi();
    });
    khung.appendChild(nutLai);
  }

  hienCauHoi();
})();


/* ============ NGUỒN THAM KHẢO ============ */
(function khoiTaoNguon() {
  const dsNguon = document.getElementById("nguon-list");
  const oLuuY = document.getElementById("nguon-luuy");
  if (!dsNguon || typeof NGUON === "undefined") return;

  oLuuY.textContent = NGUON.luuY;

  NGUON.danhSach.forEach(function (n) {
    const muc = tao("li", "nguon__muc");

    // Tiêu đề là liên kết; mở tab mới. rel="noopener noreferrer" để an toàn.
    const lienKet = tao("a", "nguon__ten", n.ten);
    lienKet.href = n.url;
    lienKet.target = "_blank";
    lienKet.rel = "noopener noreferrer";
    muc.appendChild(lienKet);

    muc.appendChild(tao("span", "nguon__donvi", n.donVi));
    muc.appendChild(tao("span", "nguon__ngay",
      "Đăng: " + n.ngayDang + " · Truy cập: " + n.ngayTruyCap));
    dsNguon.appendChild(muc);
  });
})();


/* ============ TÁC PHẨM CHÍNH (thẻ lật) ============
   Đọc danh sách TAC_PHAM trong data.js rồi tạo thẻ lật cho từng tác phẩm. */
(function khoiTaoTacPham() {
  const khung = document.getElementById("works-list");
  if (!khung || typeof TAC_PHAM === "undefined") return;

  TAC_PHAM.forEach(function (tp) {
    const the = tao("div", "flip");

    // Ô tick ẩn + nhãn: chạm vào nhãn là lật thẻ (chạy được cả trên iPhone)
    const oTick = tao("input", "flip__toggle");
    oTick.type = "checkbox";
    oTick.id = "work-" + tp.id;

    const nhan = tao("label", "flip__card");
    nhan.htmlFor = oTick.id;

    // ----- Mặt trước: ảnh + tên -----
    const matTruoc = tao("span", "flip__face flip__front");
    const oAnh = tao("span", "flip__img");
    const anh = document.createElement("img");
    anh.src = tp.anh;
    anh.alt = tp.altAnh || tp.ten;
    anh.loading = "lazy";
    // Nếu không tìm thấy ảnh: hiện dòng báo lỗi kèm đường dẫn để biết sửa chỗ nào
    anh.addEventListener("error", function () {
      oAnh.textContent = "Chưa tìm thấy ảnh: " + tp.anh + " (kiểm tra tên file trong data.js)";
    });
    oAnh.appendChild(anh);
    matTruoc.appendChild(oAnh);
    matTruoc.appendChild(tao("span", "flip__name", tp.ten));
    matTruoc.appendChild(tao("span", "flip__tap", "Chạm để xem"));

    // ----- Mặt sau: nội dung chữ -----
    const matSau = tao("span", "flip__face flip__back");
    matSau.appendChild(tao("span", "flip__back-ten", tp.ten));
    tp.doan.forEach(function (d) {
      matSau.appendChild(tao("span", "flip__back-doan", d));
    });
    matSau.appendChild(tao("small", "", tp.nguon + " · Chạm để lật lại"));

    nhan.appendChild(matTruoc);
    nhan.appendChild(matSau);
    the.appendChild(oTick);
    the.appendChild(nhan);
    khung.appendChild(the);
  });
})();
