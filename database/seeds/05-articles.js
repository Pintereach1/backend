exports.seed = function (knex) {
  return knex("articles").insert([
    {
      title: "Microbial OmcZ nanowires",
      description:
        "Electric field stimulates production of highly conductive microbial OmcZ nanowires",
      link: "https://www.nature.com/articles/s41589-020-0623-9",
      category_id: 1,

      rank_id: 2,
      user_id: 1,
    },
    {
      title: "Anticancer immune response",
      description:
        "Targeted glycan degradation potentiates the anticancer immune response in vivo",
      link: "https://www.nature.com/articles/s41589-020-0622-x",
      category_id: 2,

      rank_id: 4,
      user_id: 2,
    },

    {
      title: "New Habit",
      description:
        "How Long Does it Actually Take to Form a New Habit? (Backed by Science)",
      link: "https://jamesclear.com/new-habit",
      category_id: 4,

      rank_id: 1,
      user_id: 3,
    },
    {
      title: "SARS-CoV-2 spike proteins",
      description:
        "Structures and distributions of SARS-CoV-2 spike proteins on intact virions",
      link: "https://www.nature.com/articles/s41586-020-2665-2",
      category_id: 1,

      rank_id: 1,
      user_id: 2,
    },
    {
      title: "The Power of Synaptic Pruning",
      description: "How to Build New Habits by Taking Advantage of Old Ones",
      link: "https://www.nature.com/articles/s41586-020-2665-2",
      category_id: 4,

      rank_id: 2,
      user_id: 3,
    },
  ]);
};
