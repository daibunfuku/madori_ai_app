export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { prompt } = await req.json();

    const replicateRes = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
  version: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7d6b3f6c8aaf4e52b8c4b5f6d8c6a",
  input: {
    prompt: prompt
  }
})

      }
    );

    const prediction = await replicateRes.json();

    // 生成完了までポーリング
    let result = prediction;
    while (result.status !== "succeeded" && result.status !== "failed") {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await fetch(result.urls.get, {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
        }
      });
      result = await pollRes.json();
    }

    if (result.status === "failed") {
      return new Response(JSON.stringify({ error: "Generation failed" }), {
        status: 500
      });
    }

    return new Response(
      JSON.stringify({ image: result.output[0] }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};

