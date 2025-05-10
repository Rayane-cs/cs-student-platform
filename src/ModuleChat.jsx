import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function ModuleChat({ moduleId, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(full_name)')
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true });
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!newMessage) return;
    await supabase.from('messages').insert([
      {
        module_id: moduleId,
        user_id: user.id,
        content: newMessage,
      },
    ]);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Module Chat</h3>
      <div style={{ border: '1px solid #ccc', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.profiles ? msg.profiles.full_name : 'User'}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
