

### 5College FOMO Final Project 05/07/20 

### MARKDOWN SUBMISSION

- Title: bet

- Subtitle: 5College FOMO

- Semester: Spring 2020

- Overview:  **Five College FOMO** created a website to instill community and access to opportunity across the five college consortium. We believed that many students attending Amherst, Mount Holyoke, Smith, Hampshire, and UMass Amherst are not able to fully benefit from the vast five college network of clubs, events, guest lectures, and so forth due to lack of centralized information.

Although the Five Colleges do have a website, the utility is lacking. For example, instead of listing all orgs based off interests it simply redirects you to each individual college's listing thus making Googling more efficent than their site.

OUR Solution? **Five College FOMO** We have information at your fingertips based on your interest and upcoming events - whether that is looking for athletic clubs in the area, CS groups to attend hacks with, or religious celebrations of your denomination upcoming calendar. Plus, you as a user can add/edit/delete events of your own as you please to spread the word about YOUR upcoming event. 

# Team Members: Sathvik Birudavolu @BSathvik, Emma Wolff @wolff23e, Rahul Alluri @ralluri-sudo  

# User Interface 
- addevent.html: Allows user to add event to event database

- index.html: displays recent events, and allows users to search through all events

- myevent.html: Allows user to see all events they have posted, so they can edit/delete, or just view!

- registration.html: Allows users to create a account with 5CFOMO

- groups.html: Allows users to see "Interests" tags on events such as; UMass, Bars, Hiking, et cetera

- log in: Allows users to log into their accounts!



# APIs
- <a href="https://documenter.getpostman.com/view/3593173/Szf52oX6?version=latest"> API Postman Documentation Link</a> 


# Database
- Utilized MongoDB Atlas to host all events as json objects, Utilized MongoDB Atlas to host all users with accounts on 5College Fomo, as well as corresponding account data 


# URL Routes/Mappings
- A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

- to serve static pages : this.server.use('/', express.static('./public')); 

- Parse requests as JSON :  this.server.use(express.json()

- endpoint for API : this.server.use('/api', this.router);

- user registration :       this.router.post('/user/register', this.registerHandler.bind(this));

- user log-in :       this.router.post('/user/login', this.loginHandler.bind(this));

- recent events posted :       this.router.post('/event/recent', this.getRecentEventsHandler.bind(this));

- view tags :       this.router.post('/event/tags', this.getTagsHandler.bind(this));

- view interests by tags :       this.router.post('/event/getbytags', this.getEventByTagHandler.bind(this));

- view specific user posted events  (user authenticatoin as well) :       this.router.post('/event/mylist', [this.authHandler.bind(this), this.getUserPostedEventsHandler.bind(this)]);

- user create new event  (user authenticatoin as well) :       this.router.post('/event/create', [this.authHandler.bind(this), this.createEventHandler.bind(this)]);

- user update event (user authenticatoin as well) :       this.router.post('/event/update', [this.authHandler.bind(this), this.updateEventHandler.bind(this)]);

- user delete event  (user authenticatoin as well) :   this.router.post('/event/delete', [this.authHandler.bind(this), this.deleteEventByIDHandle.bind(this)]);



# Authentication/Authorization
- Users are authenticated by creating an account which is stored in our Atlas MongoDB database. All users carry the same permissions, which are greater than non-users. Non-users may view Main events page as well as Interests (groups.html & index.html), but cannot do what users can, which is: post events, edit events, and delete events. Once User is signed in our navbar rids them of register/log in, and gives them option to log off.


# Division of Labor
- Sathvik Birudavolu, @BSathvik, Backend & Frontend: Made events main feed page, Back end skeleton, API point client side for registering, login, tags and create event. Deployment, API documentation, HTML organising and formatting, login, registration, jwt authentication (for all requests requiring auth), create event, delete event. 

- Emma Wolff, @wolff23e, Backend & Frontend: Drew wireframe, initial CSS/html implementation, markdown1.md, View all tags and events, Interests page will load tags, unified overall layout, modify events, getEventsByTag, tagInterestDisplay, Atlas event edits, final UI, finalmd

- Rahul Alluri. @ralluri-sudo, Backend & Frontend: Made clubs & orgs page, made create events, made log-in, API point client side for login(public/js/user.js). Minor CSS and HTML editing, milestone2, GeteventbyID, updateEvent, getUserevents, Edit events, Update events, show event list


# Conclusion
- A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.

- As team bet we are grateful and pleased to have this project completed. We learned a lot about ensuring our UI is inclusive and accessible to all users. Originally, we had a much different UI layout but we quickly realized this design was not easy to read error messages within, making it inaccessible to anyone with bad sight. Further, the utilization of MongoDB proved to be quite the learning experience for our group. Though we wished we had realized this sooner, it was a great realization that you can directly edit the event object on the Atlas site. This saved us a lot of time when working with tags/transitioning from static placeholders to dynamically pulling data from our database. We struggled at one point with differing communication preferences, but after all voicing our concerns/opinions, we were able to overcome this hurdle and finish strong regardless. One of the technical hurdles for each of us, in differing ways, was approaching software/languages we weren't the most confident with. Thankfully we visited endless stackoverflow forums, and sometimes other members of the team knew the answer or gave a good prompt to finding the solution. Overall, we all learned a lot about team management, communication styles, routing, the PostMan API, mongoDB, UI design and implementation, GitHub, and much more. 

