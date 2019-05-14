const {
  articleData,
  commentData,
  topicsData,
  usersData
} = require('../db/data/index');
const {
  createRef,
  changeTimestamp,
  renameKey,
  changeValues
} = require('../utils/utils.js');
const { expect } = require('chai');

describe('changeTimestamp', () => {
  it('returns a empty array when given an empty array', () => {
    expect(changeTimestamp([])).to.eql([]);
  });
  it('returns the correct timestamp when given an array of a single object containing a timestamp', () => {
    const input = [
      {
        created_at: 1471522072389
      }
    ];

    let output = new Date(1471522072389).toUTCString();

    expect(changeTimestamp(input)).to.eql([{ created_at: output }]);
  });
  it('returns the correct timestamp when given an array of a several objects containing a timestamp', () => {
    const input = [
      {
        created_at: 1471522072389
      },
      {
        created_at: 1500584273256
      },
      {
        created_at: 1500659650346
      }
    ];

    let output = [
      {
        created_at: new Date(1471522072389).toUTCString()
      },
      {
        created_at: new Date(1500584273256).toUTCString()
      },
      {
        created_at: new Date(1500659650346).toUTCString()
      }
    ];

    expect(changeTimestamp(input)).to.eql(output);
  });
  it('returns the correct timestamp when given an array of a several objects containing a timestamp', () => {
    const input = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1500584273256
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: 1500659650346
      },
      {
        title: 'Making sense of Redux',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).',
        created_at: 1514093931240
      }
    ];

    let output = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: new Date(1500584273256).toUTCString()
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: new Date(1500659650346).toUTCString()
      },
      {
        title: 'Making sense of Redux',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).',
        created_at: new Date(1514093931240).toUTCString()
      }
    ];

    expect(changeTimestamp(input)).to.eql(output);
  });
});

describe('createRef', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(createRef([], '', '')).to.eql({});
  });
  it('returns a key value pair of the articleTitle and article_id of one object', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
        article_id: 1
      }
    ];
    const output = {
      'Running a Node App': 1
    };
    expect(createRef(input, 'title', 'article_id')).to.eql(output);
  });
  it('returns the correct refObj when passed several objects in an array', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
        article_id: 1
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1500584273256,
        article_id: 2
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: 1500659650346,
        article_id: 3
      }
    ];
    const output = {
      'Running a Node App': 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      '22 Amazing open source React projects': 3
    };
    expect(createRef(input, 'title', 'article_id')).to.eql(output);
  });
});

describe('renameKey', () => {
  it('returns an empty array if passed an empty array', () => {
    expect(renameKey([])).to.eql([]);
  });
  it('returns an array with an object of a key value pair, where a key has been replaced by a new key', () => {
    const input = [
      {
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup'
      }
    ];
    const output = [
      {
        article_id:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup'
      }
    ];
    expect(renameKey(input, 'belongs_to', 'article_id')).to.eql(output);
  });
  it('returns an array containing multiple objects, where a key have been replaced by a new key', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup', //article title should turn to article id;
        created_by: 'tickle122', // to be author;
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const output = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        article_id:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        article_id: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        article_id: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      }
    ];
    expect(renameKey(input, 'belongs_to', 'article_id')).to.eql(output);
  });
});

describe('changeValues', () => {
  it('should return the correct value in the key give when passed a ref obj', () => {
    const input = [{ article_id: '22 Amazing open source React projects' }];

    const ref = { '22 Amazing open source React projects': 1 };

    expect(changeValues(input, ref, 'article_id')).to.eql([{ article_id: 1 }]);
  });

  it('should return the correct value in the key give when passed a ref obj and data with several objects within', () => {
    const input = [
      {
        article_id: '22 Amazing open source React projects'
      },
      {
        article_id:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup'
      },
      {
        article_id: 'Which current Premier League manager was the best player?'
      }
    ];

    const ref = {
      '22 Amazing open source React projects': 1,
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 2,
      'Which current Premier League manager was the best player?': 3
    };

    const output = [
      {
        article_id: 1
      },
      {
        article_id: 2
      },
      {
        article_id: 3
      }
    ];
    expect(changeValues(input, ref, 'article_id')).to.eql(output);
  });

  it('returns an array with all the objects with the keys changed when several other keys ar ein each obj', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        article_id: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        article_id: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      },
      {
        body:
          'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
        article_id:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'happyamy2016',
        votes: 4,
        created_at: 1467709215383
      }
    ];

    const ref = {
      'Making sense of Redux': 1,
      '22 Amazing open source React projects': 2,
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 3
    };

    const output = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        article_id: 1,
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        article_id: 2,
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      },
      {
        body:
          'Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.',
        article_id: 3,
        created_by: 'happyamy2016',
        votes: 4,
        created_at: 1467709215383
      }
    ];

    expect(changeValues(input, ref, 'article_id')).to.eql(output);
  });
});
