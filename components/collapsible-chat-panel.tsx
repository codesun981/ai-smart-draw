"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Github } from "lucide-react";
import ChatPanel from "@/components/chat-panel";
import ExcalidrawChatPanel from "@/components/excalidraw-chat-panel";
import MermaidChatPanel from "@/components/mermaid-chat-panel";
import PlantUMLChatPanel from "@/components/plantuml-chat-panel";
import KrokiChatPanel from "@/components/kroki-chat-panel";
import GraphvizChatPanel from "@/components/graphviz-chat-panel";
import { ModelConfigDialog } from "@/components/model-config-dialog";
import { cn } from "@/lib/utils";

type PanelType = "drawio" | "excalidraw" | "mermaid" | "plantuml" | "kroki" | "graphviz";

interface CollapsibleChatPanelProps {
  type: PanelType;
  className?: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function CollapsibleChatPanel({ 
  type,
  className = "",
  onCollapseChange
}: CollapsibleChatPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const renderChatPanel = () => {
    switch (type) {
      case "drawio":
        return <ChatPanel />;
      case "excalidraw":
        return <ExcalidrawChatPanel />;
      case "mermaid":
        return <MermaidChatPanel />;
      case "plantuml":
        return <PlantUMLChatPanel />;
      case "kroki":
        return <KrokiChatPanel />;
      case "graphviz":
        return <GraphvizChatPanel />;
      default:
        return <ChatPanel />;
    }
  };

  if (isCollapsed) {
    return (
      <div className={cn("absolute right-4 top-4 z-50", className)}>
        <Button
          onClick={() => setIsCollapsed(false)}
          className="rounded-full shadow-lg h-12 w-12 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full relative overflow-hidden", className)}>
      <div className="flex-1 h-full">
        {renderChatPanel()}
      </div>
      <div className="absolute right-2 top-4 z-50 flex gap-1">
        <ModelConfigDialog size="sm" />
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 h-8 px-2"
          onClick={() => window.open('https://github.com/shenpeiheng/ai-smart-draw', '_blank')}
        >
          <Github className="h-4 w-4" />
          {/*<span className="hidden sm:inline">GitHub</span>*/}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 h-8 px-2"
          onClick={() => setIsCollapsed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
