const db = require("../../dbConfig");

const Articles = require("./articles-model.js");

describe("articles model", () => {
  const article = {
    title: "Test Article",
    description: "Test Article How to Build Article ",
    link: "https://www.nature.com/articles/s41586-020-2665-22",
    category_id: 3,
    rank_id: 3,
    user_id: 1,
  };

  beforeEach(async () => {
    await db("articles").truncate();
  });
  describe("add()", () => {
    it("should insert a new article into the db", async () => {
      await Articles.add(article);

      const articles = await db("articles");

      expect(articles).toHaveLength(1);
    });
  });
  describe("findById(id)", () => {
    it("should find article by id", async () => {
      await Articles.add(article);
      const articleByID = await Articles.findById(1);

      expect(articleByID.title).toBe("Test Article");
    });
  });
  describe("update", () => {
    it("should update the article by id", async () => {
      const updatedArticle = {
        title: "Test Article is updated",
        description: "Description of the Test Article is updated ",
        link: "https://www.nature.com/articles/s41586-020-2665-22",
        category_id: 3,
        rank_id: 3,
        user_id: 1,
      };
      await Articles.add(article);
      await Articles.update(1, updatedArticle);
      const updatedTestArticle = await Articles.findById(1);

      expect(updatedTestArticle.title).toBe("Test Article is updated");
    });
  });
  describe("remove()", () => {
    it("should remove an article from the db", async () => {
      const addedArticle = await Articles.add(article);
      const returnedID = await Articles.remove(addedArticle.id);

      const articles = await db("articles");
      expect(articles).toHaveLength(0);
      expect(returnedID).toBe(addedArticle.id);
    });
  });
});
