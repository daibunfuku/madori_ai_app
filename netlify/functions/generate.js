import Replicate from "replicate";

export default async (req, context) => {
  try {
    const { prompt } = JSON.parse(req.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    console.log("API TOKEN EXISTS:", !!process.env.REPLICATE_API_TOKEN);

    const output = await replicate.run(
      "stability-ai/sdxl",
      {
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1
        }
      }
    );

    return new Response(
      JSON.stringify({ image: output[0] }),
      { status: 200 }
    );

  } catch (error) {
    console.error("GENERATE ERROR:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
};


