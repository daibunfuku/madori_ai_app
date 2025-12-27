const generateBtn = document.getElementById("generateBtn");
const loading = document.querySelector(".loading");
const adBox = document.querySelector(".ad-box");
const result = document.querySelector(".result");

// 画像アップロード
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewImage.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// 家具配置パターン
let selectedPattern = "random";

const patternButtons = document.querySelectorAll(".patternBtn");

patternButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 全ボタンのハイライト解除
    patternButtons.forEach((b) => b.classList.remove("active"));

    // 押されたボタンをハイライト
    btn.classList.add("active");

    // 選択パターン保存
    selectedPattern = btn.dataset.type;
  });
});


const patterns = {
  hotel: "ベッドは中央、サイドテーブルを左右に配置。動線をシンプルに。",
  life: "ソファを窓側、収納は壁沿いに配置し生活動線を確保。",
  random: [
    "ベッドを壁沿い、デスクを窓側に配置。",
    "ソファ中心で回遊動線を確保。",
    "収納を集約し空間を広く使う配置。"
  ]
};

// 生成処理
generateBtn.addEventListener("click", () => {
  loading.style.display = "block";
  adBox.style.display = "block";
  result.textContent = "";
  generateBtn.disabled = true;

  setTimeout(() => {
    loading.style.display = "none";
    adBox.style.display = "none";

    let text;
    if (selectedPattern === "random") {
      const r =
        patterns.random[
          Math.floor(Math.random() * patterns.random.length)
        ];
      text = r;
    } else {
      text = patterns[selectedPattern];
    }

    result.textContent = "【提案結果】\n" + text;
    generateBtn.disabled = false;
  }, 3000);
});
