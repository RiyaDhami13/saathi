import { ListenButton } from "@/components/ListenButton";

interface ExplanationCardProps {
  heading?: string;
  plain: string;
  doctorNote?: string;
  doctorNoteHeading: string;
}

export function ExplanationCard({
  heading,
  plain,
  doctorNote,
  doctorNoteHeading,
}: ExplanationCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border-2 border-neutral-950 bg-white p-4">
      {heading && <h2 className="text-xl font-bold">{heading}</h2>}
      <p className="text-lg leading-relaxed">{plain}</p>
      {doctorNote && (
        <div className="border-l-4 border-[#0072B2] bg-blue-50 p-4">
          <h3 className="mb-1 text-lg font-bold">{doctorNoteHeading}</h3>
          <p className="text-lg leading-relaxed">{doctorNote}</p>
        </div>
      )}
      <ListenButton text={doctorNote ? `${plain} ${doctorNote}` : plain} />
    </article>
  );
}