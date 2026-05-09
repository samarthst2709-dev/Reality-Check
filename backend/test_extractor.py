import asyncio
from services.extractor import extract_post_data

async def main():
    print("Testing YouTube extraction...")
    yt_data = await extract_post_data("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    print(yt_data)
    
    print("\nTesting Instagram extraction...")
    ig_data = await extract_post_data("https://www.instagram.com/p/C-P4w8oA-6B/")
    print(ig_data)

if __name__ == "__main__":
    asyncio.run(main())
