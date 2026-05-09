from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="TruthLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    url: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

from services.extractor import extract_post_data

from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import httpx

@app.post("/api/analyze")
async def analyze_post(request: AnalyzeRequest):
    print("ANALYZE:", request.url)
    # Fetch REAL post data using the extractor
    post_data = await extract_post_data(request.url)
    
    if not post_data:
        raise HTTPException(status_code=400, detail="Could not extract data from the provided URL.")

    # We simulate a delay as if calling Anthropic API for the verdict part
    await asyncio.sleep(2)
    
    # Grab the actual image/video to display in the UI's Visual Forensics
    actual_image_url = post_data["media"][0]["url"] if post_data["media"] else request.url
    actual_media_type = post_data["media"][0]["type"] if post_data["media"] else "image"
    
    # We construct the simulated analysis payload but use the REAL post data
    return {
        "status": "success",
        "post": post_data,
        "verdict": {
            "overall": "FAKE",
            "confidence": 98,
            "summary": "This is a live analysis simulation. The media shown is the actual media from the URL you provided. We have successfully scraped the post details, but are simulating the AI verdict since no Anthropic API Key is present."
        },
        "claims": [
            {
                "id": "c1",
                "text": "The claim presented in the caption.",
                "verdict": "FALSE",
                "explanation": "This is a simulated explanation because the real AI backend isn't connected yet.",
                "correction": "The actual truth goes here.",
                "sources": [
                    { "title": "Verified News Source", "url": "#", "credibility": "HIGHLY CREDIBLE" }
                ]
            }
        ],
        "images": [
            {
                "id": "i1",
                "type": actual_media_type,
                "url": actual_image_url,
                "description": "The AI would describe the REAL media shown here.",
                "claimed_context": "What the user claims this shows.",
                "context_match": "MISMATCH",
                "manipulation_signals": ["Simulated signal 1"],
                "actual_origin": "Unknown Source",
                "verdict": "MISUSED"
            }
        ],
        "truth_report": {
            "what_really_happened": "The TruthLens backend successfully fetched your real social media link! To replace this placeholder text with an actual AI-generated investigative report, please provide an Anthropic API Key to the backend.",
            "original_sources": [],
            "timeline": []
        },
        "sources_used": [
            { "name": "Simulated Fact Checker", "url": "#", "type": "Fact Checker", "credibility_tier": "HIGHLY CREDIBLE" }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
