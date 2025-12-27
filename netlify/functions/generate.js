export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { prompt, imageBase64 } = await req.json();

    if (!prompt || !imageBase64) {
      return new Response(
        JSON.stringify({ error: "prompt or image missing" }),
        { status: 400 }
      );
    }

    const replicateRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b",
        input: {
          prompt: prompt,
          image: imageBase64,
          guidance_scale: 7.5,
          num_inference_steps: 30
        }
      })
    });

    if (!replicateRes.ok) {
      const errText = await replicateRes.text();
      return new Response(
        JSON.stringify({ error: errText }),
        { status: 500 }
      );
    }

    const prediction = await replicateRes.json();

    // ---- ポーリング開始 ----
    let result = prediction;
    while (result.status !== "succeeded" && result.status !== "failed") {
      await new Promise(r => setTimeout(r, 2000));

      const pollRes = await fetch(
        `https://api.replicate.com/v1/predictions/${result.id}`,
        {
          headers: {
            "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
          }
        }
      );
      result = await pollRes.json();
    }

    if (result.status === "failed") {
      return new Response(
        JSON.stringify({ error: "Generation failed" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        imageUrl: result.output[0]
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
