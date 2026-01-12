
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, X, Bot, User, Trash2, 
  Maximize2, Minimize2, Plus, History, 
  Check, Edit2, MessageCircle
} from 'lucide-react';
import { gemini } from '../services/geminiService';
import { ChatMessage, Conversation } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // حالات التعديل
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // تحميل المحادثات من LocalStorage عند البدء
  useEffect(() => {
    const saved = localStorage.getItem('abdulmalik_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0 && !activeChatId) {
          setActiveChatId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // حفظ المحادثات عند أي تغيير
  useEffect(() => {
    localStorage.setItem('abdulmalik_chat_history', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [activeChatId, conversations, isLoading]);

  useEffect(() => {
    if (isOpen && !showHistory && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showHistory]);

  const activeChat = conversations.find(c => c.id === activeChatId);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat: Conversation = {
      id: newId,
      title: 'محادثة جديدة',
      messages: [],
      timestamp: Date.now()
    };
    setConversations([newChat, ...conversations]);
    setActiveChatId(newId);
    setShowHistory(false);
    setInput('');
  };

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('هل أنت متأكد من حذف هذه المحادثة؟')) {
      const filtered = conversations.filter(c => c.id !== id);
      setConversations(filtered);
      if (activeChatId === id) {
        setActiveChatId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  const startEditing = (e: React.MouseEvent, chat: Conversation) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditValue(chat.title);
    setTimeout(() => editInputRef.current?.focus(), 100);
  };

  const saveTitle = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editingChatId || !editValue.trim()) return;
    
    setConversations(prev => prev.map(c => 
      c.id === editingChatId ? { ...c, title: editValue.trim() } : c
    ));
    setEditingChatId(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    let currentId = activeChatId;
    let currentConvs = [...conversations];

    if (!currentId) {
      currentId = Date.now().toString();
      const newChat: Conversation = {
        id: currentId,
        title: input.slice(0, 30),
        messages: [],
        timestamp: Date.now()
      };
      currentConvs = [newChat, ...currentConvs];
      setActiveChatId(currentId);
    }

    const userMsg: ChatMessage = { role: 'user', parts: [{ text: input }] };
    
    const updatedConvs = currentConvs.map(c => {
      if (c.id === currentId) {
        const newTitle = c.messages.length === 0 ? input.slice(0, 30) : c.title;
        return { ...c, messages: [...c.messages, userMsg], title: newTitle };
      }
      return c;
    });

    setConversations(updatedConvs);
    setInput('');
    setIsLoading(true);

    try {
      const activeMessages = updatedConvs.find(c => c.id === currentId)?.messages || [];
      const responseText = await gemini.getChatResponse(activeMessages, input);
      const modelMsg: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
      
      setConversations(prev => prev.map(c => 
        c.id === currentId ? { ...c, messages: [...c.messages, modelMsg] } : c
      ));
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed z-[100] transition-all duration-300 ease-in-out ${
      isOpen 
        ? isFullScreen 
          ? 'inset-0' 
          : 'bottom-4 right-4 left-4 md:left-auto md:bottom-8 md:right-8'
        : 'bottom-8 right-8'
    }`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-brand-red text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-float ring-4 ring-brand-red/20"
        >
          <MessageSquare size={32} />
        </button>
      ) : (
        <div className={`glass shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 border border-brand-red/20 transition-all duration-300 ${
          isFullScreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full md:w-[450px] h-[80vh] md:h-[650px] rounded-[2rem]'
        }`}>
          {/* Header */}
          <div className="p-5 bg-brand-red text-white flex justify-between items-center shadow-lg shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-xl transition-colors ${showHistory ? 'bg-white/30' : 'hover:bg-white/20'}`}
                title="سجل المحادثات"
              >
                <History size={22} />
              </button>
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm md:text-base leading-none mb-1 truncate max-w-[150px]">
                  {showHistory ? 'سجل المحادثات' : (activeChat?.title || 'المساعد الذكي')}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-red-100 uppercase tracking-wider">نشط الآن</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={createNewChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="محادثة جديدة"
              >
                <Plus size={22} />
              </button>
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)} 
                className="hidden md:block p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button onClick={() => {setIsOpen(false); setIsFullScreen(false); setShowHistory(false);}} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden relative">
            {/* History View */}
            {showHistory && (
              <div className="absolute inset-0 z-20 bg-white dark:bg-brand-dark flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {conversations.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 p-8">
                      <MessageCircle size={48} className="mb-4" />
                      <p>لا توجد محادثات سابقة</p>
                    </div>
                  ) : (
                    conversations.map(conv => (
                      <div 
                        key={conv.id}
                        onClick={() => { setActiveChatId(conv.id); setShowHistory(false); }}
                        className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                          activeChatId === conv.id 
                            ? 'bg-brand-red/10 border-brand-red/30 shadow-inner' 
                            : 'hover:bg-gray-100 dark:hover:bg-white/5 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden flex-1">
                          <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${activeChatId === conv.id ? 'bg-brand-red text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500'}`}>
                            <MessageSquare size={18} />
                          </div>
                          
                          <div className="overflow-hidden flex-1">
                            {editingChatId === conv.id ? (
                              <form onSubmit={saveTitle} className="flex items-center gap-1">
                                <input 
                                  ref={editInputRef}
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onBlur={() => saveTitle()}
                                  className="w-full bg-white dark:bg-black/40 border border-brand-red/30 rounded px-2 py-1 text-xs outline-none"
                                />
                                <button type="submit" className="p-1 text-green-500 hover:scale-110"><Check size={14} /></button>
                              </form>
                            ) : (
                              <>
                                <h4 className="font-bold text-sm truncate">{conv.title}</h4>
                                <p className="text-[10px] opacity-50">{new Date(conv.timestamp).toLocaleDateString('ar-EG')}</p>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => startEditing(e, conv)}
                            className="p-2 text-gray-400 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all"
                            title="تعديل الاسم"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => deleteChat(e, conv.id)}
                            className="p-2 text-gray-400 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all"
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                  <button 
                    onClick={createNewChat}
                    className="w-full py-3 bg-brand-red text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg active:scale-[0.98]"
                  >
                    <Plus size={18} />
                    <span>بدء محادثة جديدة</span>
                  </button>
                </div>
              </div>
            )}

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white/40 dark:bg-black/20 scroll-smooth custom-scrollbar"
            >
              {(!activeChat || activeChat.messages.length === 0) && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8 space-y-4">
                  <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red animate-float">
                    <Bot size={40} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">كيف يمكنني مساعدتك؟</h4>
                    <p className="text-sm">أنا هنا للإجابة على استفساراتك حول عبدالملك ومجال عمله.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {['ما هي لغات البرمجة؟', 'كيف أتواصل معه؟', 'مشاريعه الأخيرة'].map((q, idx) => (
                      <button 
                        key={idx}
                        onClick={() => { setInput(q); }}
                        className="text-xs px-4 py-2 glass border-brand-red/10 hover:border-brand-red/30 transition-all rounded-full text-brand-red font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                activeChat?.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-red text-white rounded-br-none shadow-brand-red/20' 
                        : 'glass dark:bg-white/5 rounded-bl-none border border-brand-red/10 text-gray-800 dark:text-gray-100'
                    }`}>
                      <div className="shrink-0 mt-1 opacity-70">
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start animate-in fade-in">
                  <div className="glass p-4 rounded-2xl rounded-bl-none border border-brand-red/10">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-4 md:p-5 bg-white/95 dark:bg-black/90 border-t border-brand-red/10 backdrop-blur-md shrink-0">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="اسألني عن أي شيء..."
                className="flex-1 bg-gray-100 dark:bg-white/5 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 ring-brand-red/30 transition-all text-sm md:text-base text-gray-900 dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 md:w-14 md:h-14 bg-brand-red text-white rounded-2xl flex items-center justify-center hover:bg-red-700 disabled:opacity-50 transition-all shadow-lg active:scale-90 shrink-0"
              >
                <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
