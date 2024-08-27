import { PlusCircledIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { Album } from "lucide-react"


import { cn } from "../lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu"

import { playlists } from "../utils/mocks"



const AlbumArtwork = ({ album, aspectRatio = "portrait", width,
  height, className, ...props }) => {

  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(album.name);
    // console.log("AlbumArtwork", album);
    // console.log(`/book/${album.id}`);
    navigate(`/book/${album.id}`);
  }

  return (
    <div className={("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md cursor-pointer" onClick={handleClick}>
            <img
              src={album.coverUrl}
              alt={album.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>添加到书单</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Booklist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <Album className="mr-2 h-5 w-4" />
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Mark</ContextMenuItem>
          <ContextMenuItem>Create</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="flex flex-col items-start text-sm pl-1 mt-0">
        <h3 className="font-medium text-[16px] leading-none my-1">{album.title}</h3>
        <p className="text-xs text-muted-foreground">{album.username}</p>
      </div>
    </div>
  )
}


export default AlbumArtwork;
