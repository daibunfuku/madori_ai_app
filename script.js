console.log("script.js 読み込みOK");

// 要素取得
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const patternSelect = document.getElementById("patternSelect");
const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const adArea = document.getElementById("adArea");
const result = document.getElementById("result");

// 画像アップロード表示
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

// 生成ボタン
generateBtn.addEventListener("click", () => {
  const selectedPattern = patternSelect.value;

  // 生成中ON
  loading.classList.remove("hidden");
  adArea.classList.add("hidden");
  result.innerHTML = "";

  console.log("選択パターン:", selectedPattern);

  // 疑似生成（API想定）
  setTimeout(() => {
    loading.classList.add("hidden");

    // 広告表示
    adArea.classList.remove("hidden");

    // 結果表示（仮）
    result.innerHTML = `
      <p>✅ 配置パターン：<strong>${selectedPattern}</strong></p>
      <p>（ここに生成された俯瞰図が表示されます）</p>
    `;
  }, 2000);
});
