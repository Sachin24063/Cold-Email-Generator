from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chains import Chain
from portfolio import Portfolio
from utils import clean_text
from langchain_community.document_loaders import WebBaseLoader

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to allow specific domains
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

chain = Chain()
portfolio = Portfolio()

class URLInput(BaseModel):
    url: str

@app.post("/generate_email/")
async def generate_email(url_input: URLInput):
    try:
        loader = WebBaseLoader([url_input.url])
        data = clean_text(loader.load().pop().page_content)
        portfolio.load_portfolio()
        jobs = chain.extract_jobs(data)
        results = []
        for job in jobs:
            skills = job.get('skills', [])
            links = portfolio.query_links(skills)
            email = chain.write_mail(job, links)
            results.append({"job": job, "email": email})
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
