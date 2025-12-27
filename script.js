const btn = document.getElementById("generateBtn");
const status = document.getElementById("status");
const img = document.getElementById("resultImage");

btn.addEventListener("click", async () => {
  status.textContent = "生成中です…";
  img.src = "";

  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "3D bird's-eye view interior layout from a Japanese floor plan, realistic lighting"
      })
    });

    const data = await res.json();

    if (data.image) {
      img.src = data.image;
      status.textContent = "生成完了";
    } else {
      status.textContent = "生成失敗";
      console.error(data);
    }
  } catch (e) {
    status.textContent = "エラーが発生しました";
    console.error(e);
  }
});

