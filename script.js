// ボタン取得
const generateBtn = document.getElementById("generateBtn");

// 各表示エリア取得
const loading = document.querySelector(".loading");
const adBox = document.querySelector(".ad-box");
const result = document.querySelector(".result");

// ボタンが押された時の処理
generateBtn.addEventListener("click", () => {
  // 生成中表示 ON
  loading.style.display = "block";
  adBox.style.display = "block";
  result.textContent = "";

  // ボタン連打防止
  generateBtn.disabled = true;

  // 疑似的な生成時間（3秒）
  setTimeout(() => {
    // 生成中 OFF
    loading.style.display = "none";
    adBox.style.display = "none";

    // 結果表示
    result.textContent =
      "【提案結果】\nソファは窓側、ベッドは壁沿いに配置すると動線が良くなります。";

    // ボタン再有効化
    generateBtn.disabled = false;
  }, 3000);
});
