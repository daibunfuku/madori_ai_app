// DOM取得
const generateBtn = document.getElementById("generateBtn");
const loadingEl = document.getElementById("loading");
const resultImg = document.getElementById("resultImage");
const errorEl = document.getElementById("error");

// 生成ボタン押下
generateBtn.addEventListener("click", async () => {
  // 初期化
  loadingEl.style.display = "block";
  errorEl.textContent = "";
  resultImg.style.display = "none";

  // 仮プロンプト（後でUIから切り替え可能）
  const prompt = `
A highly detailed 3D bird's-eye view interior visualization based on a Japanese apartment floor plan.
Accurately reflect room layout, wall positions, doors, and windows.
Place furniture realistically for daily living.
Soft natural lighting, realistic materials, clean modern style.
Isometric view, architectural visualization quality.
`;

  try {
    // Netlify Function を呼ぶ
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("CLIENT RESPONSE:", data);

    if (!response.ok || data.error) {
      throw new Error(data.error || "Generation failed");
    }

    // 画像表示
    resultImg.src = data.image;
    resultImg.style.display = "block";

  } catch (err) {
    console.error(err);
    errorEl.textContent = "生成に失敗しました。もう一度お試しください。";
  } finally {
    loadingEl.style.display = "none";
  }
});


