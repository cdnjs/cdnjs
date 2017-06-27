(function($){
  $.fn.smkValidate.Languaje = {
    // Pesan error untuk bidang input kosong
    textEmpty        : 'Bidang input tidak boleh kosong',
    // Pesan error untuk validasi email
    textEmail        : 'Masukkan alamat email yang valid',
    // Pesan error untuk validasi alfanumerik
    textAlphanumeric : 'Hanya karakter huruf dan/atau angka',
    // Pesan error untuk validasi angka/nomor
    textNumber       : 'Hanya karakter angka yang diperbolehkan',
    // Pesan error untuk validasi range angka
    textNumberRange  : 'Nilai harus lebih besar dari <b> {@} </b> dan kurang dari <b> {@} </b>',
    // Pesan error untuk validasi bilangan atau angka desimal
    textDecimal      : 'Hanya angka desimal yang diperbolehkan',
    // Pesan error untuk validasi format mata uang
    textCurrency     : 'Format mata uang tidak sesuai',
    // Pesan error untuk validasi opsi selectbox
    textSelect       : 'Pilih opsi yang tersedia',
    // Pesan error untuk validasi opsi checkbox
    textCheckbox     : 'Pilih opsi yang tersedia',
    // Pesan error untuk validasi jumlah karakter
    textLength       : 'Bidang input harus berjumlah <b> {@} karakter</b>',
    // Pesan error untuk validasi range angka
    textRange        : 'Jumlah karakter harus lebih besar dari <b> {@} </b> dan kurang dari <b> {@} </b>',
    // Pesan error untuk validasi minimal 4 karakter
    textSPassDefault : 'Mínimal 4 karakter',
    // Pesan error untuk validasi minimal 6 karakter
    textSPassWeak    : 'Mínimal 6 karakter',
    // Pesan error untuk validasi minimal 6 karakter dan sebuah angka
    textSPassMedium  : 'Minimal 6 karakter dan sebuah angka',
    // Pesan error untuk validasi minimal 6 karakter dengan angka dan huruf besar
    textSPassStrong  : 'Minimal 6 karakter, sebuah angka dan sebuah huruf besar',
    textUrl          : 'Masukkan URL yang valid',
    textTel          : 'Nomor telepon harus valid',
    textColor        : 'Masukkan kode hex warna yang sesuai',
    textDate         : 'Tanggal tidak valid',
    textDatetime     : 'Tanggal dan waktu tidak valid',
    textMonth        : 'Nama bulan tidak valid',
    textWeek         : 'Jumlah minggu dalam setahun harus sesuai',
    textTime         : 'Masukkan data waktu yang valid'
  };

  $.smkEqualPass.Languaje = {
    // Pesan error untuk validasi dua bidang input kata sandi
    textEqualPass    : 'Password tidak cocok'
  };

  $.smkDate.Languaje = {
    shortMonthNames : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
    monthNames : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  };

}(jQuery));
