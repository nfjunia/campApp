"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function DraggableBackButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (x: number, y: number) => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate(${
          x - offset.current.x
        }px, ${y - offset.current.y}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) onMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        const touch = e.touches[0];
        onMove(touch.clientX, touch.clientY);
      }
    };

    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const startDragging = (clientX: number, clientY: number) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    offset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    isDragging.current = true;
  };

  return (
    <div
      ref={buttonRef}
      className="fixed z-50 w-13 h-13 bg-black/10 backdrop-blur-lg text-[#033566] rounded-full flex items-center justify-center shadow-sm active:scale-95"
      style={{
        top: 0,
        left: 0,
        transform: "translate(280px, 80px)",
        transition: isDragging.current ? "none" : "transform 0.2s ease-out",
        touchAction: "none",
      }}
      onMouseDown={(e) => startDragging(e.clientX, e.clientY)}
      onTouchStart={(e) =>
        startDragging(e.touches[0].clientX, e.touches[0].clientY)
      }
      onClick={() => {
        if (!isDragging.current) router.push("/web/home");
      }}
    >
      <ArrowLeft className="w-5 h-5" />
    </div>
  );
}
