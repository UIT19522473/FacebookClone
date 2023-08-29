

ListComment[
    {
        _id: 1,
        text: "hello",
        user: {
            _id: "1",
            name: "phuc",
            img: "linkURL"
        },
        reply: null,
        idParent: null,
        comments: [
            {
                _id: 2,
                text: "Hi",
                user: {
                    _id: 4,
                    name: "tuan",
                    img: "linkURL"
                },
                reply: {
                    name: "phuc",
                    id: "1"
                },
                idParent: 1,
                comments: [],
            },
            {
                _id: 3,
                text: "Hi there",
                user: {
                    name: "phuc",
                    img: "linkURL"
                },
                reply: {
                    name: "phuc",
                    id: "1"
                },
                idParent: 1,
                comments: [],
            }
        ]
    }

]
