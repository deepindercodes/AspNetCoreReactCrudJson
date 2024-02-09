using AspNetCoreReactCrudJson.Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreReactCrudJson.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        string jsonFilePath = "";

        public ArticlesController(IWebHostEnvironment env)
        {
            _env = env;
            jsonFilePath = _env.ContentRootPath.ToString() + ("/wwwroot/db/data.json");
        }

        // GET: api/<ArticlesController>
        [HttpGet]
        public IEnumerable<Article> Get()
        {
            jsonData objarticles = new jsonData();
            return objarticles.GetArticles(jsonFilePath);
        }

        // GET api/<ArticlesController>/5
        [HttpGet("{id}")]
        public Article Get(int id)
        {
            jsonData objarticles = new jsonData();
            return objarticles.GetArticles(jsonFilePath).Where(u => u.id == id.ToString()).FirstOrDefault();
        }

        // POST api/<ArticlesController>
        [HttpPost]
        public string Post([FromBody] Article article)
        {
            jsonData objarticles = new jsonData();
            objarticles.AddArticle(article, jsonFilePath);
            return "{ status : 'New Article Added'}";
        }

        // PUT api/<ArticlesController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Article article)
        {
            jsonData objarticles = new jsonData();
            objarticles.EditArticle(article, id, jsonFilePath);
            return "{ status : 'Article Edited'}";
        }

        // DELETE api/<ArticlesController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            jsonData objarticles = new jsonData();
            objarticles.DeleteArticle(id.ToString(), jsonFilePath);
            return "{ status : 'Article Deleted'}";
        }
    }
}
