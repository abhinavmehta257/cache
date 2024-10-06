import cors from "../lib/cors";

export default async function handler(req,res) {
    if(cors(req,res)) return;
    
    console.log("test");
    
    if(req.method == 'POST'){
        const prompt = req.body.prompt;
        // console.log(prompt);
        
        const generatedCode = await generateCode(prompt)
        res.status(200).json({status:"true",generatedCode})
    }
}

async function generateCode(prompt){
    const assistantId = 'asst_3eKaAhaV6u0x6J1mNiKSl6yS'; // Replace with your actual assistant ID
    const token = process.env.OPENAI_API_KEY;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'OpenAI-Beta': 'assistants=v2'
    };

    try {
      // Create a thread
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: headers
      });
      const threadData = await threadResponse.json();
      const threadId = threadData.id;

      // Add a message to the thread
      await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          role: "user",
          content: prompt
        })
      });

      // Run the assistant
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          assistant_id: assistantId
        })
      });
      const runData = await runResponse.json();
      const runId = runData.id;

      // Poll for completion
      let runStatus;
      do {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        const statusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          headers: headers
        });
        const statusData = await statusResponse.json();
        runStatus = statusData.status;
      } while (runStatus !== 'completed');

      // Get the messages
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        headers: headers
      });
      const messagesData = await messagesResponse.json();
      const generatedCode = messagesData.data[0].content[0].text.value;

      // Remove code block markers from the generated code
      const newgeneratedCode = generatedCode.replace(/^```[\s\S]*?\n/, '').replace(/\n```$/, '');
      return newgeneratedCode;
    }catch(err){
        console.log(err);
    }
}
