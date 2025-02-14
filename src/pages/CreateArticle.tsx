
import { useState } from 'react';
import { NewsHeader } from "@/components/NewsHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import { Textarea } from "@/components/ui/textarea";

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [inspiration, setInspiration] = useState('');
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

      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title,
            subtitle,
            content,
            category,
            inspiration,
            author_id: user.id,
            author: user.email,
            read_time: `${Math.ceil(content.split(' ').length / 200)} min read`,
            volume: 1,
            issue_number: 1,
            related_articles: [],
            next_in_issue: []
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article created successfully"
      });
      
      navigate(`/articles/${data.id}`);
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
        <div className="grid grid-cols-2 gap-8">
          {/* Editor Section */}
          <div>
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
              <div>
                <Textarea
                  placeholder="What inspired you to write this article? Share your motivation and the challenges you faced."
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                  className="min-h-[100px]"
                />
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

          {/* Preview Section */}
          <div className="border-l pl-8">
            <h2 className="text-2xl font-serif mb-6">Preview</h2>
            <div className="prose-newspaper">
              {title && <h1 className="text-4xl font-serif mb-4">{title}</h1>}
              {subtitle && <h2 className="text-2xl font-serif text-gray-600 mb-6">{subtitle}</h2>}
              {content && (
                <div className="markdown-preview">
                  <MDEditor.Markdown source={content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
