document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("startScreen");
  const startButton = document.getElementById("startButton");
  const photoScreen = document.getElementById("photoScreen");
  const photoCards = document.querySelectorAll(".photo-card"); // Tüm kartları seçiyoruz
  const endScreen = document.getElementById("endScreen");
  const endMessage = document.getElementById("endMessage");
  const confettiCanvas = document.getElementById("confetti-canvas");

  // Konfeti kütüphanesini başlat (belirli bir canvas'a bağlıyoruz)
  const myConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  let currentPhotoIndex = 0; // Hangi kartın aktif olduğunu tutan indeks

  // --- Fonksiyonlar ---

  // Ekranlar arası geçişi sağlayan genel fonksiyon
  function showScreen(screenToShow) {
    const allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen) => {
      screen.classList.remove("active"); // Tüm ekranları gizle
    });
    screenToShow.classList.add("active"); // İstenen ekranı göster
  }

  // "Tıkla" butonuna basıldığında çağrılacak fonksiyon
  function startJourney() {
    startScreen.classList.remove("active"); // Başlangıç ekranını gizle
    showPhotos(); // Direkt fotoğraf ekranını göster
  }

  // Fotoğraf kartları ekranını gösteren fonksiyon
  function showPhotos() {
    showScreen(photoScreen); // Fotoğraf ekranını aktif yap
    displayCurrentPhoto(); // İlk kartı veya mevcut kartı göster
  }

  // Mevcut fotoğraf kartını gösteren ve diğerlerini gizleyen fonksiyon
  function displayCurrentPhoto() {
    // Tüm kartlardan 'active' sınıfını kaldır (gizle)
    photoCards.forEach((card) => {
      card.classList.remove("active");
    });

    // Eğer gösterilecek daha fazla kart varsa
    if (currentPhotoIndex < photoCards.length) {
      // Mevcut indeksteki kartı aktif yap (görünür kıl)
      photoCards[currentPhotoIndex].classList.add("active");
    } else {
      // Tüm kartlar bittiyse bitiş mesajını göster
      showEndMessage();
    }
  }

  // Bitiş mesajını gösteren fonksiyon ve konfeti tetikleyicisi
  function showEndMessage() {
    showScreen(endScreen);
    endMessage.textContent =
      "Bana sevilmeyi ve sevmeyi, sahiplenilmeyi ve aşkı öğreten, birisi için yaşanılmanın ne demek olduğunu anlamamı sağlayan, hayatımın en güzel parçası. Doğum günün kutlu olsun sevgilim. İyi ki varsın seni çok seviyorum :)";
    endMessage.classList.remove("hidden");
    triggerConfetti(); // Konfeti efektini başlat
  }

  // Konfeti efektini tetikleyen fonksiyon
  function triggerConfetti() {
    myConfetti({
      particleCount: 200, // Patlayacak konfeti sayısı
      spread: 120, // Patlama yayılımı
      origin: { x: 0.5, y: 0.6 }, // Ekranın ortasından biraz aşağıdan
      colors: ["#ff6f91", "#e91e63", "#fce4ec", "#fff"], // Renkler
      ticks: 200, // Animasyonun süresi
    });

    // İkinci bir patlama için biraz gecikme
    setTimeout(() => {
      myConfetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#ff6f91", "#e91e63", "#fce4ec", "#fff"],
        ticks: 200,
      });
    }, 400); // 0.4 saniye sonra ikinci patlama
  }

  // --- Olay Dinleyicileri ---

  // Başlat butonuna tıklandığında startJourney fonksiyonunu çağır
  startButton.addEventListener("click", startJourney);

  // Her bir fotoğraf kartına tıklama olayı ekle
  photoCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Sadece aktif olan karta tıklanırsa bir sonraki karta geçişi tetikle
      if (card.classList.contains("active")) {
        currentPhotoIndex++; // Bir sonraki kartın indeksine geç
        displayCurrentPhoto(); // Yeni indeksteki kartı göster
      }
    });
  });

  // Sayfa yüklendiğinde başlangıç ekranını göster
  showScreen(startScreen);
});
