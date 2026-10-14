const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.SARGALAY_API_KEY,
  baseURL: process.env.SARGALAY_BASE_URL || 'https://sargalay.com/api/v1'
});

// ⭐ တိုတောင်းသော System Prompt — Token သက်သာစေ
const SYSTEM_PROMPT = `သင်သည် "ဆီးချိုအကူအညီ" ဖြစ်သည်။ ဆီးချိုရောဂါနှင့်သာ သက်ဆိုင်သော မေးခွန်းများကို မြန်မာဘာသာဖြင့် ဖြေပါ။

စည်းမျဉ်းများ:
- အလွန်တိုတောင်းစွာ ဖြေပါ (အချက် ၅-၇ ချက်ထက် မကျော်ပါစေနှင့်)
- ခေါင်းစဉ်တိုနှင့် Bullet points သုံးပါ
- ရှည်လျားသော ရှင်းလင်းချက် မထည့်ပါနှင့်
- ဆေးဘက်ဆိုင်ရာ အကြံဉာဏ်တိုင်း အောက်ဆုံးတွင် "⚠️ ဆရာဝန်နှင့် တိုင်ပင်ပါ။" ဟု တစ်ကြောင်းသာ ထည့်ပါ
- ဆီးချိုနှင့် မသက်ဆိုင်သော မေးခွန်းကို "ဆီးချိုအကြောင်းသာ ဖြေပါသည်။" ဟု ပြန်ပါ`;

const getChatbotResponse = async (userMessage) => {
  try {
    console.log('📤 Sargalay API ကို ခေါ်နေသည်...');

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.5-flash-lite',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,      // ⭐ 0.5 → 0.3 (ပိုတည်ငြိမ်၊ ပိုတို)
      max_tokens: 400,       // ⭐ 1024 → 400 (Output လျှော့)
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';
    console.log('✅ Sargalay ရလဒ် ရပါပြီ');

    return { success: true, message: text };

  } catch (error) {
    console.error('❌ Chatbot Error:', error.message);
    return {
      success: false,
      message: 'တောင်းပန်ပါတယ်၊ ခဏနေရင် ပြန်ကြိုးစားကြည့်ပါ။'
    };
  }
};

module.exports = { getChatbotResponse };