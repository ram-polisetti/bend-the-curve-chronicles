
import { useState } from 'react';
import { NewsHeader } from "@/components/NewsHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create articles",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('articles')
        .insert([
          {
            title,
            subtitle,
            content,
            category,
            author_id: user.id,
            read_time: `${Math.ceil(content.split(' ').length / 200)} min read`,
            volume: 1,
            issue_number: 1,
            related_articles: [],
            next_in_issue: []
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article created successfully"
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">Write an Article</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-serif"
                required
              />
            </div>
            <div>
              <Input
                placeholder="Subtitle (optional)"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="text-xl font-serif"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="general">General</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="deep-learning">Deep Learning</option>
                <option value="reinforcement-learning">Reinforcement Learning</option>
                <option value="ethics">Ethics in AI</option>
                <option value="research">Research</option>
              </select>
            </div>
            <div className="min-h-[500px]">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || '')}
                height={500}
                preview="edit"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                Publish Article
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
