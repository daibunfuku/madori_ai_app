// アップロード画像を表示する
const fileInput = document.querySelector('input[type="file"]');
const previewArea = document.getElementById("previewArea");
const floorPreview = document.getElementById("floorPreview");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    floorPreview.src = e.target.result;
    previewArea.style.display = "block";
  };

  reader.readAsDataURL(file);
});
function generateLayout() {
  console.log("generateLayout start");

  // HTML要素取得
  const mode = document.getElementById("mode");
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  const layoutText = document.getElementById("layoutText");
  const layoutImage = document.getElementById("layoutImage");
  const description = document.getElementById("description");

  // デバッグ表示
  console.log(mode, loading, result, layoutText, layoutImage, description);

  // ID不一致チェック
  if (!mode || !loading || !result || !layoutText || !layoutImage || !description) {
    alert("HTMLのidが一致していません");
    return;
  }

  // 表示切り替え
  loading.style.display = "block";
  result.style.display = "none";

  // 家具配置パターン
  const layouts = {
    living: [
      "ベッドは壁に沿って配置し、生活動線を確保",
      "ベッド同士の間隔を広めに取り、日常使いを重視",
      "収納動線を意識した実用的な配置"
    ],
    hotel: [
      "ベッドを左右対称に配置し、ホテルライクな印象",
      "ベッドを中央に整列させ、視覚的なバランスを重視",
      "装飾を抑えた整然とした配置"
    ]
  };

  // モード説明文
  const descriptions = {
    living: "実際の生活を想定した、現実的で使いやすい家具配置案です。",
    hotel: "宿泊施設のように整った、美しく見える家具配置案です。"
  };

  // 疑似生成（AIの代わり）
  setTimeout(() => {
    console.log("timeout fired");

    const patterns = layouts[mode.value];
    const selected = patterns[Math.floor(Math.random() * patterns.length)];

    // テキスト更新
    description.textContent = descriptions[mode.value];
    layoutText.innerHTML = "";

    const li = document.createElement("li");
    li.textContent = selected;
    layoutText.appendChild(li);

    // 仮画像（俯瞰っぽいインテリア）
    layoutImage.src =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=60";

    // 表示切り替え
    loading.style.display = "none";
    result.style.display = "block";
  }, 1500);
}
