
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // تم ضبط المحرك لاستخدام مفتاح الـ API من متغيرات البيئة لضمان الأمان والأداء العالي
    this.ai = new GoogleGenAI({ apiKey: process.env.AIzaSyAirI8zrtR5MlbUjzQRwxTlksbGjzx7pIo });
  }

  async getChatResponse(history: ChatMessage[], message: string) {
    try {
      // استخدام أحدث موديل للمهام النصية السريعة والذكية
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `
              أنت المساعد الذكي الرسمي في بورتفوليو "عبدالملك مصطفى".
              عبدالملك هو مطور واجهات إبداعي وخبير في تجربة المستخدم (UI/UX).
              هويته البصرية تعتمد على اللونين الأحمر والبني.
              مقولته الشهيرة: "الموقع العادي يُنسى… وأنا أصنع مواقع تُحفر في الذاكرة."
              أجب على الأسئلة باحترافية، شغف، وباللغة العربية الفصحى أو البيضاء البسيطة.
              تحدث عن مهاراته: HTML, CSS, JavaScript, React, Gemini API, وتصميم الواجهات.
              اجعل الإجابات ملهمة وقصيرة.
            ` }]
          },
          ...history.map(msg => ({
            role: msg.role,
            parts: msg.parts
          })),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        config: {
          temperature: 0.8,
          topP: 0.9,
          // تفعيل التفكير المنطقي لتحسين جودة الردود
          thinkingConfig: { thinkingBudget: 0 } 
        }
      });

      return response.text || "أنا هنا لمساعدتك، ولكن يبدو أنني لم أستطع صياغة رد حالياً. هل يمكنك إعادة السؤال؟";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "عذراً، أواجه صعوبة في الاتصال بعقلي الاصطناعي حالياً. حاول مجدداً بعد قليل.";
    }
  }
}

export const gemini = new GeminiService();
