import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { useEffect } from "react";


const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelDetailById",
    () => apiClient.fetchHotelDetailById(hotelId as string),
    { enabled: !!hotelId } //if react render without hotelId
  );

     useEffect(() => {
      if (!hotel) return;
      document.title = hotel.name + " | TanziBooking";
    }, []);

  if (!hotel) {
    return <></>;
  }

return (
  <>
    {/* ─────────────── TOOLBAR ─────────────── */}
    <div className="sticky top-0 z-20 mb-6">
      <div className="flex flex-wrap items-center justify-end gap-2 p-3
        rounded-2xl border border-gray-200 dark:border-white/10
        bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm">

        <Button
          variant="outline"
          size="sm"
          onClick={() => setHighlighterOn((v) => !v)}
          className={`rounded-xl transition ${
            highlighterOn
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <Highlighter className="w-4 h-4 mr-1" />
          {highlighterOn ? "Highlighting" : "Highlight"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={readText}
          className={`rounded-xl transition ${
            reading
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <Volume2 className="w-4 h-4 mr-1" />
          {reading ? "Stop" : "Read"}
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFontSize((s) => Math.max(s - 1, 12))}
            className="rounded-xl bg-gray-100 dark:bg-gray-800 px-2.5"
          >
            A−
          </Button>

          <span className="text-xs w-10 text-center text-gray-500 tabular-nums">
            {fontSize}pt
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFontSize((s) => Math.min(s + 1, 24))}
            className="rounded-xl bg-gray-100 dark:bg-gray-800 px-2.5"
          >
            A+
          </Button>
        </div>

        <Button
          size="sm"
          className="rounded-xl bg-black text-white hover:bg-gray-800
          dark:bg-white dark:text-black"
        >
          <Link href="/dashboard/book/new-book/" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            New Book
          </Link>
        </Button>
      </div>
    </div>

    {/* ─────────────── BOOK CONTENT ─────────────── */}
    <div id="book-container" ref={contentRef}>
      <div id="pText" className="flex flex-col gap-6 md:px-20">
        {chunks.map((chunk, index) => (
          <div
            key={index}
            className="
              rounded-[28px]
              border border-gray-100 dark:border-white/10
              bg-white/70 dark:bg-white/[0.03]
              backdrop-blur-xl shadow-sm
              p-6 md:p-10
              transition hover:shadow-md
            "
          >
            <p
              id={chunk.id}
              className="
                text-justify
                text-gray-800 dark:text-gray-200
                leading-loose
                selection:bg-cyan-400/30
              "
              style={{
                fontSize: `${fontSize}pt`,
                lineHeight: "1.9",
              }}
              onMouseDown={(e) => {
                if (e.detail === 3) e.preventDefault();
              }}
            >
              {parse(chunk.chunk)}
            </p>

            <div className="flex justify-end mt-6 text-xs text-gray-400 font-medium">
              Page {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ─────────────── TOOLTIP ─────────────── */}
    {tooltip && user && (
      <div
        id="tooltip-box"
        className="
          absolute z-50 flex flex-col gap-3
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-white/10
          rounded-2xl shadow-2xl p-4
          backdrop-blur-xl
        "
        style={{
          top: tooltip.y,
          left: tooltip.x,
          width: TOOLTIP_W,
          minHeight: TOOLTIP_H,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
            "{tooltip.text}"
          </span>

          <button
            onClick={clearTooltip}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
          >
            ×
          </button>
        </div>

        <Tabs defaultValue="comment" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="comment">
              <MessageSquare size={14} />
            </TabsTrigger>
            <TabsTrigger value="translate" onClick={handleTranslateGrammar}>
              <LanguagesIcon size={14} />
            </TabsTrigger>
            <TabsTrigger value="grammar" onClick={handleTranslateGrammar}>
              <span className="text-xs font-bold">ABC</span>
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkle size={14} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comment" className="mt-2">
            <textarea
              className="
                w-full min-h-[70px] resize-none rounded-lg
                border border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800
                text-sm text-gray-800 dark:text-gray-200
                p-2 focus:ring-1 focus:ring-blue-500
              "
              value={tabComment}
              onChange={(e) => setTabComment(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="translate" className="mt-2 text-sm text-gray-300">
            {tabTranslate === "LOADING"
              ? "Loading..."
              : tabTranslate || "—"}
          </TabsContent>

          <TabsContent value="grammar" className="mt-2 text-sm text-gray-300">
            {tabGrammar === "LOADING"
              ? "Loading..."
              : tabGrammar || "—"}
          </TabsContent>

          <TabsContent value="ai" className="mt-2">
            <input
              value={tabQuery}
              onChange={(e) => setTabQuery(e.target.value)}
              onKeyDown={handleQuery}
              className="
                w-full rounded-lg border
                border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800
                text-sm px-3 py-2
                text-gray-800 dark:text-gray-200
              "
              placeholder="Ask AI…"
            />
          </TabsContent>
        </Tabs>
      </div>
    )}
  </>
);
};

export default Detail;
