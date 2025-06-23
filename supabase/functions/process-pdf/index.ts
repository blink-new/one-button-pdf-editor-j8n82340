import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.0"

// @ts-expect-error https://github.com/denoland/deno/issues/13933
serve(async (req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    )

    const { path } = await req.json()

    if (!path) {
      return new Response(JSON.stringify({ error: "File path is missing." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    }

    const { data: fileBlob, error } = await supabaseClient.storage
      .from("pdfs")
      .download(path)

    if (error) {
      throw error
    }

    // Read the content of the Blob as text
    const text = await fileBlob.text()

    return new Response(
      JSON.stringify({ text: text }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})