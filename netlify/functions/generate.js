export default async (req) => {
  // POST 以外は拒否
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // APIキー確認（true が出ているはず）
  console.log(
    "API TOKEN EXISTS:",
    !!process.env.REPLICATE_API_TOKEN
  );

  try {
    const { prompt } = await req.json();

    // ① 予測（prediction）を作成
    const createResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // SDXL 安定版 version ID（※これ重要）
          version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7d6b3f6c8aaf4e52b8c4b5f6d8c6a",
          input: {
            prompt: prompt,
            width: 1024,
            height: 1024,
            guidance_scale: 7.5,
            num_inference_steps: 30
          }
        })
      }
    );

    const prediction = await createResponse.json();
    console.log("CREATE RESPONSE:", prediction);

    if (!prediction.id) {
      return new Response(
        JSON.stringify({ error: "Failed to create prediction", detail: prediction }),
        { status: 500 }
      );
    }

    // ② 完了するまでポーリング（最大20回）
    let result = prediction;
    let attempts = 0;

    while (
      result.status !== "succeeded" &&
      result.status !== "failed" &&
      attempts < 20
    ) {
      await new Promise((r) => setTimeout(r, 1500));

      const pollResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
          }
        }
      );

      result = await pollResponse.json();
      console.log("POLL STATUS:", result.status);
      attempts++;
    }

    // ③ 成功
    if (result.status === "succeeded") {
      return new Response(
        JSON.stringify({ image: result.output[0] }),
        { status: 200 }
      );
    }

    // ④ 失敗
    return new Response(
      JSON.stringify({ error: "Generation failed", detail: result }),
      { status: 500 }
    );

  } catch (err) {
    console.error("FUNCTION ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};


