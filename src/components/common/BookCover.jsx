import { cn } from "../../lib/utils"


const BookCover = ({ src, alt = "", aspectRatio = "portrait", width,
  height, className, ...props }) => {

  return (
    <div className={("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md" >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
    </div>
  )
}


export default BookCover;
