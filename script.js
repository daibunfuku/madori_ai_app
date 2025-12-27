// ===== DOM取得 =====
const generateBtn = document.getElementById("generateBtn");
const loadingEl = document.getElementById("loading");
const resultImg = document.getElementById("resultImage");
const errorEl = document.getElementById("error");

// ===== 仮プロンプト一覧（後で増やせる） =====
const prompts = {
  living: `
A highly detailed 3D bird's-eye view interior visualization of a Japanese apartment.
Designed for everyday living, practical furniture layout.
Natural light, warm atmosphere, realistic scale.
Isometric view, architectural visualization.
`,
  hotel: `
A highly detailed 3D bird's-eye view interior visualization of a Japanese apartment.
Hotel-like layout, minimal furniture, clean and luxury atmosphere.
Soft lighting, modern materials.
Isometric view, architectural visualization.
`,
  random: `
A highly detailed 3D bird's-eye view interior visualization of a Japanese apartment.
Creative and varied furniture placement.
Balanced realism and style.
Isometric view, architectural visualization.
`
};

// ===== 生成ボタン押下 =====
generateBtn.addEventListener("click", async () => {
  // UI初期化
  loadingEl.style.display = "flex";
  generateBtn.disabled = true;
  errorEl.textContent = "";
  resultImg.style.display = "none";

  // 今は仮で random を使用
  const prompt = prompts.random;

  try {
    // Netlify Function を呼び出し
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("CLIENT RESPONSE:", data);

    // エラー判定
    if (!response.ok || data.error) {
      throw new Error(data.error || "Generation failed");
    }

    // 画像表示
    resultImg.src = data.image;
    resultImg.style.display = "block";

  } catch (error) {
    console.error(error);

    // 人間向けエラーメッセージ
    errorEl.textContent =
      "生成に失敗しました。時間をおいて、もう一度お試しください。";
  } finally {
    // ローディング解除
    loadingEl.style.display = "none";
    generateBtn.disabled = false;
  }
});

/* ===== 課金待ち中UI確認用（必要なら一時的にON） =====
loadingEl.style.display = "flex";
setTimeout(() => {
  loadingEl.style.display = "none";
}, 3000);
*/


