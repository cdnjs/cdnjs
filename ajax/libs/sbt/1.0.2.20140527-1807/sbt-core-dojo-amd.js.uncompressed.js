require({cache:{
'sbt/connections/BlogService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Blogs API allows application programs to retrieve blog information, subscribe to blog updates, and create or modify blogs.
 * 
 * @module sbt.connections.BlogService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./BlogConstants", "./ConnectionsService",
         "../base/AtomEntity", "../base/XmlDataHandler",  "./Tag", "./BlogPost"], 
    function(declare,config,lang,stringUtil,Promise,consts,ConnectionsService,AtomEntity,XmlDataHandler, Tag, BlogPost) {
	
	var BlogTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:app=\"http://www.w3.org/2007/app\"  xmlns:thr=\"http://purl.org/syndication/thread/1.0\" xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\"><title type=\"text\">${getTitle}</title><snx:timezone>${getTimezone}</snx:timezone><snx:handle>${getHandle}</snx:handle><summary type=\"html\">${getSummary}</summary>${getTags}</entry>";
	var BlogPostTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:app=\"http://www.w3.org/2007/app\"  xmlns:thr=\"http://purl.org/syndication/thread/1.0\" xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\"><title type=\"text\">${getTitle}</title><content type=\"html\">${getContent}</content>${getTags}</entry>";
	var BlogCommentTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:app=\"http://www.w3.org/2007/app\"  xmlns:thr=\"http://purl.org/syndication/thread/1.0\" xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\"><content type=\"html\">${getContent}</content></entry>";
	CategoryTmpl = "<category term=\"${tag}\"></category>";
	var CategoryBlog = "<category term=\"blog\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var CategoryPerson = "<category term=\"person\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";

	/**
     * Blog class represents an entry for a Blogs feed returned by the
     * Connections REST API.
     * 
     * @class Blog
     * @namespace sbt.connections
     */
    var Blog = declare(AtomEntity, {

    	xpath : consts.BlogXPath,
    	namespaces : consts.BlogNamespaces,
    	categoryScheme : CategoryBlog,
    
        /**
         * Construct a Blog entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return the value of IBM Connections blog handle from blog ATOM
         * entry document.
         * 
         * @method getHandle
         * @return {String} handle of the blog
         */
        getHandle : function() {
            return this.getAsString("handle");
        },

        /**
         * Sets Handle of IBM Connections blog.
         * 
         * @method setHandle
         * @param {String} setHandle of the blog
         */
        setHandle : function(handle) {
            return this.setAsString("handle", handle);
        },

        /**
         * Return the value of IBM Connections blog ID from blog ATOM
         * entry document.
         * 
         * @method getBlogUuid
         * @return {String} ID of the blog
         */
        getBlogUuid : function() {
        	var blogUuidPrefix = "urn:lsid:ibm.com:blogs:blog-";
        	var blogUuid = this.getAsString("blogUuid");
        	if(blogUuid && blogUuid.indexOf(blogUuidPrefix) != -1){
        		blogUuid = blogUuid.substring(blogUuidPrefix.length, blogUuid.length);
        	}
            return blogUuid;
        },

        /**
         * Sets id of IBM Connections blog.
         * 
         * @method setBlogUuid
         * @param {String} blogUuid of the blog
         */
        setBlogUuid : function(blogUuid) {
            return this.setAsString("blogUuid", blogUuid);
        },

        /**
         * Return the value of IBM Connections blog URL from blog ATOM
         * entry document.
         * 
         * @method getBlogUrl
         * @return {String} Blog URL of the blog
         */
        getBlogUrl : function() {
            return this.getAsString("alternateUrl");
        },

        /**
         * Return tags of IBM Connections blog
         * document.
         * 
         * @method getTags
         * @return {Object} Array of tags of the blog
         */
        getTags : function() {
            return this.getAsArray("tags");
        },

        /**
         * Set new tags to be associated with this IBM Connections blog.
         * 
         * @method setTags
         * @param {Object} Array of tags to be added to the blog
         */

        setTags : function(tags) {
            return this.setAsArray("tags", tags);
        },

        /**
         * Return the value of IBM Connections blog's community id from blog ATOM
         * entry document. Only valid for Ideation Blog and community blog
         * 
         * @method getCommunityUuid
         * @return {String} Blog Container URL of the blog
         */
        getCommunityUuid : function() {
            return this.getAsString("communityUuid");
        },

        /**
         * Return the value of IBM Connections blog's container url from blog ATOM
         * entry document. Only valid for Ideation Blog
         * 
         * @method getContainerUrl
         * @return {String} Blog Container URL of the blog
         */
        getContainerUrl : function() {
            return this.getAsString("containerUrl");
        },

        /**
         * Return the value of IBM Connections blog's container type from blog ATOM
         * entry document. Only valid for Ideation Blog
         * 
         * @method getContainerType
         * @return {String} Blog Container type of the blog
         */
        getContainerType : function() {
            return this.getAsString("containerType");
        },

        /**
         * Return all flags of IBM Connections blog ATOM entry document. Only valid
         * for Ideation Blog
         * 
         * @method getCategoryFlags
         * @return {Object} Array of all flags of the blog
         */
        getCategoryFlags : function() {
            return this.getAsArray("categoryFlags");
        },

        /**
         * Loads the blog object with the atom entry associated with the
         * blog. By default, a network call is made to load the atom entry
         * document in the blog object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var blogUuid = this.getBlogUuid();
            var promise = this.service._validateBlogUuid(blogUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setDataHandler(new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogXPath
                    }));
                    return self;
                }
            };
            var requestArgs = lang.mixin({}, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            var url = null;
            
            url = this.service._constructBlogsUrl(consts.AtomBlogInstance, {
            	blogUuid : blogUuid
			});
            return this.service.getEntity(url, options, blogUuid, callbacks);
        },

        /**
         * Remove this blog
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteBlog(this.getBlogUuid(), args);
        },

        /**
         * Update this blog
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateBlog(this, args);
        },
        
        /**
         * Save this blog
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getBlogUuid()) {
                return this.service.updateBlog(this, args);
            } else {
                return this.service.createBlog(this, args);
            }
        }

    });
    
    /**
     * Comment class represents a comment on a Blogs post returned by the
     * Connections REST API.
     * 
     * @class Comment
     * @namespace sbt.connections
     */
    var Comment = declare(AtomEntity, {
    	
    	xpath : consts.CommentXPath,
    	namespaces : consts.BlogNamespaces,

        /**
         * Construct a Blog Post Comment.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return the value of IBM Connections blog post comment id
         * entry document.
         * 
         * @method getCommentUuid
         * @return {String} id of the blog post comment
         */
        getCommentUuid : function() {
        	var commentUuidPrefix = "urn:lsid:ibm.com:blogs:comment-";
        	var commentUuid = this.getAsString("commentUuid");
        	if(commentUuid && commentUuid.indexOf(commentUuidPrefix) != -1){
        		commentUuid = commentUuid.substring(commentUuidPrefix.length, commentUuid.length);
        	}
            return commentUuid;
        },

        /**
         * Sets id of IBM Connections blog post comment.
         * 
         * @method setCommentUuid
         * @param {String} CommentUuid of the blog post
         */
        setCommentUuid : function(CommentUuid) {
            return this.setAsString("CommentUuid", CommentUuid);
        },
        
        /**
         * Return the last updated dateRecommendations URL of the IBM Connections blog post comment from
         * blog ATOM entry document.
         * 
         * @method getRecommendationsURL
         * @return {String} Recommendations URL of the Blog Post comment
         */
        getRecommendationsURL : function() {
            return this.getAsString("recommendationsUrl");
        },
        
        /**
         * Return the Recommendations count of the IBM Connections blog post comment from
         * blog ATOM entry document.
         * 
         * @method getRecommendationsCount
         * @return {String} Number of recommendations for the Blog post comment
         */
        getRecommendationsCount : function() {
            return this.getAsString("rankRecommendations");
        },
        
        /**
         * Return the get-reply-to of the IBM Connections blog post comment from
         * blog ATOM entry document.
         * 
         * @method getReplyTo
         * @return {String} Entity Id of the entity in reply to which comment was created
         */
        getReplyTo : function() {
            return this.getAsString("replyTo");
        },
        
        /**
         * Return the postUuid of the blog post on which comment was created.
         * 
         * @method getPostUuid
         * @return {String} Blog post Id of the entity in reply to which comment was created
         */
        getPostUuid : function() {
        	var postUuid = this.getAsString("blogPostUuid");
        	if(postUuid){
        		return postUuid;
        	}
        	var postUuidPrefix = "urn:lsid:ibm.com:blogs:entry-";
        	postUuid = this.getAsString("replyTo");
        	if(postUuid && postUuid.indexOf(postUuidPrefix) != -1){
        		postUuid = postUuid.substring(postUuidPrefix.length, postUuid.length);
        	}
            return postUuid;
        },

        /**
         * Sets blog post id of IBM Connections blog post comment.
         * 
         * @method setPostUuid
         * @param {String} blogPostUuid of the comment's blog post
         */
        setPostUuid : function(blogPostUuid) {
            return this.setAsString("blogPostUuid", blogPostUuid);
        },
        
        /**
         * Return the bloghandle of the blog post on which comment was created.
         * 
         * @method getBlogHandle
         * @return {String} Blog handle of the entity in reply to which comment was created
         */
        getBlogHandle : function() {
        	var blogHandle = this.getAsString("blogHandle");
        	if(blogHandle){
        		return blogHandle;
        	}
        	var commentUrlAlternate = this.getAsString("alternateUrl");
        	var blogHandle = this.service._extractBlogHandle(commentUrlAlternate);
            return blogHandle;
        },

        /**
         * Sets blog handle of IBM Connections blog post comment.
         * 
         * @method setBlogHandle
         * @param {String} blogHandle of the comments's blog
         */
        setBlogHandle : function(blogHandle) {
        	this.setAsString("blogHandle", blogHandle);
            return this.setAsString("blogHandle", blogHandle);
        },
        
        /**
         * Return the Trackback Title of the IBM Connections blog post comment from
         * blog ATOM entry document.
         * 
         * @method getTrackbackTitle
         * @return {String} TrackbackTitle of the Blog post comment
         */
        getTrackbackTitle : function() {
            return this.getAsDate("trackbacktitle");
        },

        /**
         * Gets an source of IBM Connections Blog post.
         * 
         * @method getSource
         * @return {Object} Source of the blog post
         */
        getSource : function() {
            return this.getAsObject([ "sourceId", "sourceTitle", "sourceLink", "sourceLinkAlternate" ]);
        },

        /**
         * Loads the blog comment object associated with the
         * blog. By default, a network call is made to load the atom entry
         * document in the comment object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(blogHandle, commentUuid, args) {
            var promise = this.service._validateUuid(commentUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setDataHandler(new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.CommentXPath
                    }));
                    return self;
                }
            };

            var requestArgs = lang.mixin({}, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            var url = null;
			url = this.service.constructUrl(consts.AtomBlogCommentEditRemove, null, {
				blogHandle : blogHandle,
				commentUuid : commentUuid
			});
            return this.service.getEntity(url, options, commentUuid, callbacks);
        },

        /**
         * Remove this blog post comment
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteComment(this.getCommentUuid(), args);
        },
        
        /**
         * Save this blog post comment
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            return this.service.createPost(this, args);
        }

    });
    
    /**
     * Recommender class represents a recommender of a Blogs post returned by the
     * Connections REST API.
     * 
     * @class Recommender
     * @namespace sbt.connections
     */
    var Recommender = declare(AtomEntity, {

    	xpath : consts.RecommendersXPath,
    	categoryScheme : CategoryPerson,
    	namespaces : consts.BlogNamespaces,
    	
        /**
         * Construct a Blog Post Recommender.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return the value of IBM Connections blog post recommender id
         * 
         * @method getRecommenderUuid
         * @return {String} id of the blog post recommender
         */
        getRecommenderUuid : function() {
        	var recommenderUuidPrefix = "urn:lsid:ibm.com:blogs:person-";
        	var recommenderUuid = this.getAsString("recommenderUuid");
        	if(recommenderUuid && recommenderUuid.indexOf(recommenderUuidPrefix) != -1){
        		recommenderUuid = recommenderUuid.substring(recommenderUuidPrefix.length, recommenderUuid.length);
        	}
            return recommenderUuid;
        }

    });
    
    /*
     * Callbacks used when reading a feed that contains blog entries.
     */
    var ConnectionsBlogFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.BlogFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Blog({
                service : service,
                data : data
            });
       }
    };

    /*
     * Callbacks used when reading a feed that contains forum recommendation entries.
     */
    var RecommendBlogPostCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ForumsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new BlogPost({
                service : service,
                data : data
            });
       }
    };
    
    /*
     * Callbacks used when reading a feed that contains blog entries.
     */
    var ConnectionsTagsFeedCallbacks = {
		createEntities : function(service,data,response) {
            return new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.TagsXPath
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.TagsXPath
            });
            return new Tag({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains blog entries.
     */
    var ConnectionsBlogPostsCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.BlogFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new BlogPost({
                service : service,
                data : data
            });
       }
    };
    
    /*
     * Callbacks used when reading a feed that contains blog entries.
     */
    var ConnectionsBlogPostRecommendersCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
//                xpath : consts.RecommendersFeedXpath
                xpath : consts.BlogFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Recommender({
                service : service,
                data : data
            });
       }
    };
    /*
     * Callbacks used when reading a feed that contains blog entries.
     */
    var ConnectionsBlogPostCommentsCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.BlogFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Comment({
                service : service,
                data : data
            });
       }
    };
    /**
     * BlogService class.
     * 
     * @class BlogService
     * @namespace sbt.connections
     */
    var BlogService = declare(ConnectionsService, {
    	
    	contextRootMap: {
        	blogs : "blogs"
        },
        
        serviceName : "blogs",

        /**
         * Default blog homepage handle name if there is not one specified in sbt.properties.
         * @returns {String}
         */
        handle : "homepage",
    	
        /**
         * Constructor for BlogService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
            this.handle = this.endpoint.serviceMappings.blogHomepageHandle?this.endpoint.serviceMappings.blogHomepageHandle:this.handle;
        },
        
        /**
         * Get the All Blogs feed to see a list of all blogs to which the 
         * authenticated user has access.
         * 
         * @method getAllBlogs
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all blogs. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getAllBlogs : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
			url = this._constructBlogsUrl(consts.AtomBlogsAll);
            return this.getEntities(url, options, this.getBlogFeedCallbacks());
        },

        /**
         * Get the My Blogs feed to see a list of the blogs to which the 
         * authenticated user is a member.
         * 
         * @method getMyBlogs
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my blogs. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getMyBlogs : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
			url = this._constructBlogsUrl(consts.AtomBlogsMy);
            return this.getEntities(url, options, this.getBlogFeedCallbacks());
        },

        /**
         * Get the featured posts feed to find the blog posts that have had the most activity across 
         * all of the blogs hosted by the Blogs application within the past two weeks
         * 
         * @method getFeaturedBlogs
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my blogs. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getFeaturedBlogs : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogsFeatured);
            return this.getEntities(url, options, this.getBlogFeedCallbacks());
        },

        /**
         * Get the featured posts feed to find the blog posts that have had the most activity across 
         * all of the blogs hosted by the Blogs application within the past two weeks
         * 
         * @method getFeaturedPosts
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my blogs. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getFeaturedPosts : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogsPostsFeatured);
            return this.getEntities(url, options, this.getBlogPostsCallbacks());
        },

        /**
         * Get a feed that includes all of the recommended blog posts 
         * in all of the blogs hosted by the Blogs application.
         * 
         * @method getRecommendedPosts
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my blogs. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getRecommendedPosts : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogsPostsRecommended);
            return this.getEntities(url, options, this.getBlogPostsCallbacks());
        },
        
        /**
         * Get the blog posts feed to see a list of posts for all blog .
         * 
         * @method getAllBlogPosts
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all blogs posts. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getAllBlogPosts : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomEntriesAll);
            return this.getEntities(url, options, this.getBlogPostsCallbacks());
        },
        
        /**
         * Get the blog posts feed to see a list of posts for a blog .
         * 
         * @method getBlogPosts
         * @param {String} blogHandle Handle of the blog of which posts are to be get.
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of posts of a blog . The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getBlogPosts : function(blogHandle, args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this.constructUrl(consts.AtomBlogEntries, null, {
				blogHandle : blogHandle
			});
            return this.getEntities(url, options, this.getBlogPostsCallbacks());
        },
        
        /**
         * Get the blog posts recommenders feed to see a list of recommenders of a blog post.
         * 
         * @method getBlogPostRecommenders
         * @param {Object} object representing a blog post.
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of posts of a blog . The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getBlogPostRecommenders : function(blogPost, args) {
        	var post = this._toBlogPost(blogPost);
            var promise = this._validateBlogPost(post);
            if (promise) {
                return promise;
            }
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this.constructUrl(consts.AtomRecommendBlogPost, null, {
            	postUuid : post.getBlogPostUuid(),
				blogHandle : post.getBlogHandle()
			});
            return this.getEntities(url, options, this.getBlogPostRecommendersCallbacks());
        },
        
        /**
         * Get the blog comments feed to see a list of comments for all blogs .
         * 
         * @method getAllBlogComments
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of posts of a blog . The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getAllBlogComments : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogCommentsAll);
            return this.getEntities(url, options, this.getBlogPostCommentsCallbacks());
        },
        
        /**
         * Get the blog comments feed to see a list of comments for a blog post .
         * 
         * @method getBlogPostComments
         * @param {blogHandle} Handle of the blog of which Comments are to be get
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of posts of a blog . The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getBlogComments : function(blogHandle, args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this.constructUrl(consts.AtomBlogComments, null, {
				blogHandle : blogHandle
			});
            return this.getEntities(url, options, this.getBlogPostCommentsCallbacks());
        },
        
        /**
         * Retrieve a blog instance.
         * 
         * @method getBlog
         * @param {String } blogUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Blogs REST API) 
         */
        getBlog : function(blogUuid, args) {
            var blog = new Blog({
                service : this,
                _fields : { blogUuid : blogUuid }
            });
            return blog.load(args);
        },

        /**
         * Create a blog by sending an Atom entry document containing the 
         * new blog.
         * 
         * @method createBlog
         * @param {String/Object} blogOrJson Blog object which denotes the blog to be created.
         * @param {Object} [args] Argument object
         */
        createBlog : function(blogOrJson,args) {
            var blog = this._toBlog(blogOrJson);
            var promise = this._validateBlog(blog, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
        		if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogXPath
                    });
                	blog.setDataHandler(dataHandler);
            	}
            	blog.setData(data);
                return blog;
            };

            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : this._constructBlogPostData(blog)
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogCreate);
            return this.updateEntity(url, options, callbacks, args);
        },

        /**
         * Update a blog by sending a replacement blog entry document 
         * to the existing blog's edit web address.
         * All existing blog entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a blog entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateBlog
         * @param {String/Object} blogOrJson Blog object
         * @param {Object} [args] Argument object
         */
        updateBlog : function(blogOrJson,args) {
            var blog = this._toBlog(blogOrJson);
            var promise = this._validateBlog(blog, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	var blogUuid = blog.getBlogUuid();
            	if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogXPath
                    });
            		blog.setDataHandler(dataHandler);
            	}
            	blog.setBlogUuid(blogUuid);
                return blog;
            };

            var requestArgs = lang.mixin({}, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : this._constructBlogPostData(blog)
            };
            var blogUuid = blog.getBlogUuid();
            var url = null;
			url = this._constructBlogsUrl(consts.AtomBlogEditDelete, {
				blogUuid : blogUuid
			});
            return this.updateEntity(url, options, callbacks, args);
        },

        /**
         * Delete a blog, use the HTTP DELETE method.
         * 
         * @method deleteBlog
         * @param {String} blogUuid blog id of the blog or the blog object (of the blog to be deleted)
         * @param {Object} [args] Argument object
         */
        deleteBlog : function(blogUuid,args) {
            var promise = this._validateBlogUuid(blogUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({}, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            var url = null;
			url = this._constructBlogsUrl(consts.AtomBlogEditDelete, {
				blogUuid : blogUuid
			});
            return this.deleteEntity(url, options, blogUuid);
        },
        
        /**
         * Retrieve a blog post instance.
         * 
         * @method getBlogPost
         * @param {String} blogPostUuid blog post id
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Blogs REST API) 
         */
        getBlogPost : function(blogPostUuid, args) {
            var blogPost = new BlogPost({
                service : this,
                _fields : { postUuid : blogPostUuid }
            });
            return blogPost.load(args);
        },

        /**
         * Retrieve a list of comments for the specified entry in the specified blog.
         * 
         * @method getEntryComments
         * @param {String} blogHandle blog handle
         * @param {String} entryAnchor entry anchor
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Blogs REST API) 
         */
        getEntryComments : function(blogHandle, entryAnchor, args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this.constructUrl(consts.AtomBlogEntryComments, null, {
				blogHandle : blogHandle,
				entryAnchor : entryAnchor
			});
            return this.getEntities(url, options, this.getBlogPostCommentsCallbacks());
        },
        
        /**
         * Get the comments on a blog post. The post must be loaded from Connections for this method to work.
         * If not try BlogService.getEntryComments();
         * @param {Object} blogPost The BlogPost.
         * @param {Object} args The url parameters map.
         */
        getPostComments : function(blogPost, args){
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            var url = blogPost.getRepliesUrl();
            var ep = this.endpoint;
            url = ep.proxy.rewriteUrl(ep.baseUrl, url, ep.proxyPath);
            return this.getEntities(url, options, this.getBlogPostCommentsCallbacks());
        },

        /**
         * Create a blog post by sending an Atom entry document containing the 
         * new blog post.
         * 
         * @method createPost
         * @param {String/Object} postOrJson Blog post object which denotes the blog post to be created.
         * @param {Object} [args] Argument object
         */
        createPost : function(postOrJson, args) {
            var post = this._toBlogPost(postOrJson);
            var promise = this._validateBlog(post, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
        		if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogPostXPath
                    });
            		post.setDataHandler(dataHandler);
            	}
        		post.setData(data);
                return post;
            };

            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : this._constructBlogPostPostData(post)
            };
            var url = null;
            url = this.constructUrl(consts.AtomBlogPostCreate, null, {
				blogHandle : postOrJson.getBlogHandle()
			});
            return this.updateEntity(url, options, callbacks, args);
        },

        /**
         * Update a post by sending a replacement post entry document 
         * to the existing post's edit web address.
         * All existing post entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a post entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateBost
         * @param {String/Object} BlogPost object
         * @param {Object} [args] Argument object
         */
        updatePost : function(postOrJson, args) {
            var post = this._toBlogPost(postOrJson);
            var promise = this._validateBlogPost(post, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	var postUuid = post.getBlogPostUuid();
            	if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogPostXPath
                    });
            		post.setDataHandler(dataHandler);
            	}
            	post.setBlogPostUuid(postUuid);
                return post;
            };

            var requestArgs = lang.mixin({}, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : this._constructBlogPostPostData(post)
            };
            var url = null;
			url = this.constructUrl(consts.AtomBlogPostEditDelete, null, {
				postUuid : post.getBlogPostUuid(),
				blogHandle : post.getBlogHandle()
			});
            return this.updateEntity(url, options, callbacks, args);
        },

        /**
         * Recommend a post
         * 
         * @method recommendPost
         * @param {String/Object} BlogPost object
         * @param {String} blogHandle Id of post
         */
        recommendPost : function(blogPost) {
        	var post = this._toBlogPost(blogPost);
            var promise = this._validateBlogPost(post);
            if (promise) {
                return promise;
            }
            var options = {
                method : "POST",
                headers : consts.AtomXmlHeaders
            };
            var url = null;
			url = this.constructUrl(consts.AtomRecommendBlogPost, null, {
				postUuid : post.getBlogPostUuid(),
				blogHandle : post.getBlogHandle()
			});
			
            return this.updateEntity(url, options, this.getRecommendBlogPostCallbacks());
        },

        /**
         * Unrecommend a post
         * 
         * @method unRecommendPost
         * @param {String/Object} blogPost object
         * @param {String} blogHandle Id of post
         */
        unrecommendPost : function(blogPost) {
        	var post = this._toBlogPost(blogPost);
            var promise = this._validateBlogPost(post);
            if (promise) {
                return promise;
            }
            var options = {
                method : "DELETE",
                headers : consts.AtomXmlHeaders
            };
            var url = null;
			url = this.constructUrl(consts.AtomRecommendBlogPost, null, {
				postUuid : post.getBlogPostUuid(),
				blogHandle : post.getBlogHandle()
			});
            return this.deleteEntity(url, options, blogPost.getBlogPostUuid());
        },

        /**
         * Delete a blog post, use the HTTP DELETE method.
         * 
         * @method deletePost
         * @param {String/Object} blogHandle handle of the blog(of which the post is to be deleted)
         * @param {String/Object} postUuid post id of the blog post(of the blog post to be deleted)
         * @param {Object} [args] Argument object
         */
        deletePost : function(blogHandle, postUuid, args) {
            var promise = this._validateUuid(postUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({}, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            var url = null;
			url = this.constructUrl(consts.AtomBlogPostEditDelete, null, {
				blogHandle : blogHandle,
				postUuid : postUuid
			});
            return this.deleteEntity(url, options, postUuid);
        },

        /**
         * Delete a blog comment, use the HTTP DELETE method.
         * 
         * @method deleteComment
         * @param {String/Object} blogHandle handle of the blog(of which the post is to be deleted)
         * @param {String/Object} comment id of the blog comment(of the blog comment to be deleted)
         * @param {Object} [args] Argument object
         */
        deleteComment : function(blogHandle, commentUuid, args) {
            var promise = this._validateUuid(commentUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({}, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            var url = null;
			url = this.constructUrl(consts.AtomBlogCommentEditRemove, null, {
				blogHandle : blogHandle,
				commentUuid : commentUuid
			});
            return this.deleteEntity(url, options, commentUuid);
        },
        
        /**
         * Create a comment post by sending an Atom entry document containing the 
         * new blog comment.
         * 
         * @method createComment
         * @param {String/Object} commentOrJson Blog comment object.
         * @param {Object} [args] Argument object
         */
        createComment : function(commentOrJson, args) {
            var comment = this._toComment(commentOrJson);
            var promise = this._validateComment(comment);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
        		if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.CommentXPath
                    });
            		comment.setDataHandler(dataHandler);
            	}
        		comment.setData(data);
                return comment;
            };

            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : this._constructCommentBlogPostData(comment)
            };
            var url = null;
			url = this.constructUrl(consts.AtomBlogCommentCreate, null, {
				blogHandle : commentOrJson.getBlogHandle(),
				postUuid : commentOrJson.getPostUuid()
			});
            return this.updateEntity(url, options, callbacks, args);
        },
        
        /**
         * Retrieve a blog comment, use the edit link for the blog entry 
         * which can be found in the my blogs feed.
         * 
         * @method getComment
         * @param {String } blogHandle
         * @param {String } commentUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Blogs REST API) 
         */
        getComment : function(blogHandle, commentUuid, args) {
            var comment = new Comment({
                service : this,
                _fields : { commentUuid : commentUuid }
            });
            return comment.load(blogHandle, commentUuid, args);
        },

        /**
         * Get the tags feed to see a list of the tags for all blogs.
         * 
         * @method getAllBlogTags
         * @param {Object} [args] Object representing various parameters. 
         * The parameters must be exactly as they are supported by IBM
         * Connections.
         */
        getAllBlogTags : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
            url = this._constructBlogsUrl(consts.AtomBlogsTags);
            return this.getEntities(url, options, this.getTagsFeedCallbacks(), args);
        },

        /**
         * Get the tags feed to see a list of the tags for a perticular blog.
         * 
         * @method getBlogTags
         * @param {String} blogHandle handle of the blog
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of blog tags. The
         * parameters must be exactly as they are supported by IBM
         * Connections.
         */
        getBlogTags : function(blogHandle, args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            var url = null;
			url = this.constructUrl(consts.AtomBlogTags, null, {
				blogHandle : blogHandle
			});
            return this.getEntities(url, options, this.getTagsFeedCallbacks(), args);
        },
        
        /**
         * Create a Blog object with the specified data.
         * 
         * @method newBlog
         * @param {Object} args Object containing the fields for the 
         * new blog 
         */
        newBlog : function(args) {
            return this._toBlog(args);
        },
        
        /**
         * Create a Blog Post object with the specified data.
         * 
         * @method newBlogPost
         * @param {Object} args Object containing the fields for the 
         * new post 
         */
        newBlogPost : function(args) {
            return this._toBlogPost(args);
        },
        
        /**
         * Create a Blog Post comment object with the specified data.
         * 
         * @method newComment
         * @param {Object} args Object containing the fields for the 
         * new comment 
         */
        newComment : function(args) {
            return this._toComment(args);
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog entries.
         */
        getBlogFeedCallbacks: function() {
            return ConnectionsBlogFeedCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog entries.
         */
        getTagsFeedCallbacks: function() {
            return ConnectionsTagsFeedCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog entries.
         */
        getRecommendBlogPostCallbacks: function() {
            return RecommendBlogPostCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog entries.
         */
        getBlogPostsCallbacks: function() {
            return ConnectionsBlogPostsCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog entries.
         */
        getBlogPostRecommendersCallbacks: function() {
            return ConnectionsBlogPostRecommendersCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Blog post comments.
         */
        getBlogPostCommentsCallbacks: function() {
            return ConnectionsBlogPostCommentsCallbacks;
        },
        
        /*
         * Return a Blog instance from Blog or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toBlog : function(blogOrJsonOrString) {
            if (blogOrJsonOrString instanceof Blog) {
                return blogOrJsonOrString;
            } else {
                if (lang.isString(blogOrJsonOrString)) {
                    blogOrJsonOrString = {
                        blogUuid : blogOrJsonOrString
                    };
                }
                return new Blog({
                    service : this,
                    _fields : lang.mixin({}, blogOrJsonOrString)
                });
            }
        },
        
        /*
         * Return a BlogPost instance from BlogPost or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toBlogPost : function(postOrJsonOrString) {
            if (postOrJsonOrString instanceof BlogPost) {
                return postOrJsonOrString;
            } else {
                if (lang.isString(postOrJsonOrString)) {
                    postOrJsonOrString = {
                        postUuid : postOrJsonOrString
                    };
                }
                return new BlogPost({
                    service : this,
                    _fields : lang.mixin({}, postOrJsonOrString)
                });
            }
        },
        
        /*
         * Return a Comment instance from Comment or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toComment : function(commentOrJsonOrString) {
            if (commentOrJsonOrString instanceof Comment) {
                return commentOrJsonOrString;
            } else {
                if (lang.isString(commentOrJsonOrString)) {
                	commentOrJsonOrString = {
                        commentUuid : commentOrJsonOrString
                    };
                }
                return new Comment({
                    service : this,
                    _fields : lang.mixin({}, commentOrJsonOrString)
                });
            }
        },

        /*
         * Validate a blog UUID, and return a Promise if invalid.
         */
        _validateBlogUuid : function(blogUuid) {
            if (!blogUuid || blogUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected blogUuid.");
            }
        },
        
        /*
         * Validate a post, and return a Promise if invalid.
         */
        _validateUuid : function(postUuid) {
            if (!postUuid) {
                return this.createBadRequestPromise("Invalid argument, blog post id must be specified.");
            }
        },
        
        /*
         * Validate a post, and return a Promise if invalid.
         */
        _validateBlogPost : function(post) {
            if (!post || !post.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, blog post with title must be specified.");
            }
        },
        
        /*
         * Validate a comment, and return a Promise if invalid.
         */
        _validateComment : function(comment,checkUuid) {
            if (!comment || !comment.getContent()) {
                return this.createBadRequestPromise("Invalid argument, blog comment with content must be specified.");
            }
        },

        /*
         * Validate a blog, and return a Promise if invalid.
         */
        _validateBlog : function(blog,checkUuid) {
            if (!blog || !blog.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, blog with title must be specified.");
            }
            if (checkUuid && !blog.getBlogUuid()) {
                return this.createBadRequestPromise("Invalid argument, blog with UUID must be specified.");
            }
        },
        
        /*
         * Construct a post data for a Blog
         */
        _constructBlogPostData : function(blog) {
            var transformer = function(value,key) {
                if (key == "getTags") {
                    var tags = value;
                    value = "";
                    for (var tag in tags) {
                        value += stringUtil.transform(CategoryTmpl, {
                            "tag" : tags[tag]
                        });
                    }
                }
                return value;
            };
            
            var postData = stringUtil.transform(BlogTmpl, blog, transformer, blog);
            return stringUtil.trim(postData);
        },
        
        /*
         * Construct a post data for a Blog Post
         */
        _constructBlogPostPostData : function(post) {
            var transformer = function(value,key) {
                if (key == "getTags") {
                    var tags = value;
                    value = "";
                    for (var tag in tags) {
                        value += stringUtil.transform(CategoryTmpl, {
                            "tag" : tags[tag]
                        });
                    }
                }
                return value;
            };
            
            var postData = stringUtil.transform(BlogPostTmpl, post, transformer, post);
            return stringUtil.trim(postData);
        },
        
        /*
         * Construct a post data for a Blog Post
         */
        _constructCommentBlogPostData : function(comment) {
            var transformer = function(value,key) {
                return value;
            };
            
            var postData = stringUtil.transform(BlogCommentTmpl, comment, transformer, comment);
            return stringUtil.trim(postData);
        },
        
        /*
         * Extract Blog handle from comment source url
         */
        _extractBlogHandle : function(source) {
        	var urlSuffix = "/entry/";
        	source = source.substring(0,source.indexOf(urlSuffix));
        	var bloghandle = source.substring(source.lastIndexOf("/")+1,source.length);
        	return bloghandle;
        	
        },
        
        /*
         * Extract Blog handle from comment source url
         */
        _constructBlogsUrl : function(url, urlParams) {
        	urlParams = lang.mixin({blogHomepageHandle : this.handle}, urlParams || {});
        	return this.constructUrl(url, null, urlParams);
        }
        
    });
    return BlogService;
});

},
'sbt/json':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Implements some JSON helpers.  Will uses the browser version
 * if available else it will delegate to the Javascript library being used.
 * 
 * @module sbt.json
 */
define(['./_bridge/json', './_bridge/lang', './log', './stringUtil'], function(jsonLib, lang, log, stringUtil) {
	
	/**
	 * @static
	 */
    return {
        /**
         * Parses a String of JSON and returns a JSON Object.
         * @param {String} jsonString A String of JSON.
         * @returns {Object} A JSON Object.
         * @static
         * @method parse
         */
        parse : function(jsonString) {
            var jsonImpl = JSON || jsonLib;
            return jsonImpl.parse(jsonString);
        },
        
        /**
         * Returns the JSON object represented as a String.
         * @param {Object} jsonObj A JSON Object.
         * @returns {String} The JSON Object represented as a String.
         * @method stringify
         */
        stringify : function(jsonObj) {
            var jsonImpl = JSON || jsonLib;
            return jsonImpl.stringify(jsonObj);
        },
        
        /**
         * @method jsonBeanStringify
         * @param theObj
         * @returns
         */
        jsonBeanStringify: function(theObj) {
            if (lang.isArray(theObj)) {
                var jsonObjs = "[";
                for (var i=0; i<theObj.length; i++) {
                    jsonObjs += this._jsonBeanStringify(theObj[i]);
                    if ((i+1)<theObj.length) {
                        jsonObjs += ",\n";
                    }
                }
                jsonObjs += "]";
                return jsonObjs;
            } else {
                return this._jsonBeanStringify(theObj);
            }
        },
        
        /**
         * @method jsonBean
         * @param theObj
         * @returns
         */
        jsonBean: function(theObj) {
            if (lang.isArray(theObj)) {
                var jsonObjs = [];
                for (var i=0; i<theObj.length; i++) {
                    jsonObjs.push(this._jsonBean(theObj[i]));
                }
                return jsonObjs;
            } else {
                return this._jsonBean(theObj);
            }
        },
        
        // Internals
        
        _jsonBeanStringify: function(theObj) {
            var jsonObj = this.jsonBean(theObj);
            return this._stringifyCyclicCheck(jsonObj, 4);
        },
        
        _stringifyCyclicCheck: function(jsonObj, indent) {
            var jsonImpl = JSON || jsonLib;
            var seen = [];
            var self = this;
            return jsonImpl.stringify(jsonObj, function(key, val) {
                if(self._isDomNode(val)){
                    return {};
                }
                if (lang.isObject(val)) {
                    if (seen.indexOf(val) >= 0 && !self._isBuiltin(val))
                        return undefined;
                    seen.push(val);
                } else if(lang.isFunction(val)){
                    return undefined;
                }
                return val;
            }, indent);
        },
        
        _jsonBean: function(theObj, seen) {
            // first check for cyclic references
            if (!seen) {
                seen = [];
            }
            if (seen.indexOf(theObj) >= 0) {
                return undefined;
            }
            seen.push(theObj);
            
            var jsonObj = {};
            for (var property in theObj) {
                var value = this._getObjectValue(theObj, property, seen);
                if (value || !isNaN(value)) {
                    jsonObj[property] = value;
                }
            }
            return jsonObj;
        },
        
        _notReserved: function(property) {
        	return property!=='isInstanceOf' && property!=='getInherited';
        },
        
        _getObjectValue: function(theObj, property, seen) {
        	var self = this;
            if (lang.isFunction(theObj[property])) {
                if ((stringUtil.startsWith(property, "get") || stringUtil.startsWith(property, "is")) && self._notReserved(property)) {
                    try {
                        var value = theObj[property].apply(theObj);
                        if (value && !this._isBuiltin(value) && lang.isObject(value)) {
                            return this._jsonBean(value, seen);
                        }
                        return value;
                    } catch(error) {
                        //log.error("Error {0}.{1} caused {2}", theObj, property, error);
                    }
                }
            } else {
                if (!stringUtil.startsWith(property, "_") && !stringUtil.startsWith(property, "-")) {
                    return theObj[property];
                }
            }
            return undefined;
        },
        
        _isBuiltin: function(value) {
            return ((value instanceof Date) || 
                    (value instanceof Number) || 
                    (value instanceof Boolean) || 
                    lang.isArray(value));
        },
        
        _isDomNode : function(value) {
            return (value && value.nodeName && value.nodeType && typeof value.nodeType === "number" && typeof value.nodeName === "string");
        }
    };
});

},
'sbt/connections/FileConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for FileService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({    	
               
        /**
         * XPath expressions used when parsing a Connections Files ATOM feed
         */
        FileFeedXPath : conn.ConnectionsFeedXPath,
        
        /**
         * XPath expressions used when parsing a Connections Comments ATOM feed
         */
        CommentFeedXPath : conn.ConnectionsFeedXPath,

        /**
         * XPath expressions to be used when reading a File Entry
         */
        FileXPath : {        	
            // used by getEntityData
            entry : "/a:entry",
            id : "a:id",
            // used by getEntityId
            uid : "td:uuid",            
            label : "td:label",
            selfUrl : "a:link[@rel='self']/@href",
            alternateUrl : "a:link[@rel='alternate']/@href",
            downloadUrl : "a:link[@rel='enclosure']/@href",
            type : "a:link[@rel='enclosure']/@type",
            length : "a:link[@rel='enclosure']/@length",
			editLink : "a:link[@rel='edit']/@href",
			editMediaLink : "a:link[@rel='edit-media']/@href",
			thumbnailUrl : "a:link[@rel='thumbnail']/@href",
			commentsUrl : "a:link[@rel='replies']/@href",
			fileSize : "td:totalMediaSize",
			content : "a:content[@type='html']",
			shareCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/share']",
									
			authorName : "a:author/a:name",			
			authorUserId : "a:author/snx:userid",
			authorEmail : "a:author/a:email",
			authorUserState : "a:author/snx:userState",
			
			title: "a:title",
			published : "a:published",
			updated : "a:updated",
			created: "td:created",
			modified: "td:modified",
			lastAccessed : "td:lastAccessed",
			
			modifierName : "td:modifier/td:name",			
			modifierUserId : "td:modifier/snx:userid",
			modifierEmail : "td:modifier/td:email",
			modifierUserState : "td:modifier/snx:userState",
			
			visibility : "td:visibility",
			libraryId : "td:libraryId",
			libraryType : "td:libraryType",
			versionUuid : "td:versionUuid",
			versionLabel : "td:versionLabel",
			propagation : "td:propagation",
			recommendationsCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']",
			commentsCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment']",
			sharesCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/share']",
			foldersCount :  "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/collections']",
			attachmentsCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/attachments']",
			versionsCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/versions']",
			referencesCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/references']",
			totalMediaSize : "td:totalMediaSize",
			summary : "a:summary",
			contentUrl : "a:content/@src",
			contentType : "a:content/@type",
			objectTypeId : "td:objectTypeId",
			lock : "td:lock/@type",
			acls : "td:permissions",
			hitCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/hit']",
			anonymousHitCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/anonymous_hit']",
			tags : "a:category[not(@scheme)]/@term",
			category : "a:category/@label"
        },
        
        /**
         * XPath expression for parsing folder informartion from the File ATOM Feed.
         */
        FolderXPath : {
    		id : "id",
    		uid : "td:uuid",
    		title : "a:title",
    		label : "td:label",
    		folderUrl : "a:link[@rel='alternate']/@href",
    		logoUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/logo']/@href",
    		tags : "a:category/@term",
    		summary : "a:summary[@type='text']",
    		content : "a:content[@type='html']",
    		visibility : "td:visibility",
    		notification : "td:notification",
    		versionUuid : "td:versionUuid",
    		versionLabel : "td:versionLabel",
    		documentVersionUuid : "td:documentVersionUuid",
    		documentVersionLabel : "td:documentVersionLabel",
    		itemCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/item']",
    		shareCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/user']",
    		groupShareCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/group']",
    		modified : "td:modified",
    		created : "td:created",
    		updated : "a:updated",
    		authorName : "a:author/a:name",
    		authorUserId : "a:author/snx:userid",
    		authorEmail : "a:author/a:email",
    		content : "a:content[@type='text']",
    		modifierName : "a:modifier/a:name",
    		modifierId : "a:modifier/snx:userid",
    		modifierEmail : "a:modifier/a:email"
        },
        
        /**
         * XPath expressions to be used when reading a Comment
         */
		CommentXPath : {
			entry : "a:entry",
			id : "a:id",
			uid : "td:uuid",
			title : "a:title",
			content : "a:content[@type='text']",
			created : "td:created",
			modified : "td:modified",
			versionLabel : "td:versionLabel",
			updated : "a:updated",
			published : "a:published",
			modifierName : "td:modifier/td:name",			
			modifierUserId : "td:modifier/snx:userid",
			modifierEmail : "td:modifier/td:email",
			modifierUserState : "td:modifier/snx:userState",		
			authorName : "a:author/a:name",			
			authorUserId : "a:author/snx:userid",
			authorEmail : "a:author/a:email",
			authorUserState : "a:author/snx:userState",
			language : "td:language",			
			deleteWithRecord : "td:deleteWithRecord"		
		},   
		
		/**
		 * XPath expressions used for parsing information on shared files and folders.
		 */
		SharesXPath : {
			id : "id",
			uuid : "td:uuid",
			title : "a:title",
			summary : "a:summary[@type='text']",
			sharedResourceType : "td:sharedResourceType", // always set to document, but will add the attribute anyway
			sharePermission : "td:sharePermission",
			sharedWhat : "td:sharedWhat",
			sharedWithName : "a:sharedWith/a:name",
			sharedWithId : "a:sharedWith/snx:userid",
			sharedWithEmail : "a:sharedWith/a:email",
			documentOwner : "td:documentOwner",
			updated : "a:updated",
			published : "a:published",
			authorName : "a:author/a:name",
			authorUid : "a:author/snx:userid",
			authorEmail : "a:author/a:email"
		},
		
		/**
		 * XPath expressions used for parsing information on user library.
		 */
		LibraryXPath : {
			entry : "a:feed",
			id : "a:id",
			uuid : "td:uuid",
			librarySize : "td:librarySize",
			totalRemovedSize : "td:totalRemovedSize",
			libraryQuota : "td:libraryQuota",
			totalResults : "opensearch:totalResults"
		},
		
		/**
		 * Get a Feed for a File 
		 */
		AtomFileInstance : "${files}/basic/api/myuserlibrary/document/{documentId}/entry",
		
		/**
		 * 
		 */
		AtomFileInstancePublic : "${files}/basic/anonymous/api/library/{libraryId}/document/{documentId}/entry",

        /**
         * A feed of files of which the authenticated user owns.
         * 
         * Get the My Files feed to see a list of the files which the authenticated owns. 
         * Supports: acls , includePath , includeQuota , includeTags , page , ps , shared , sI , since , sortBy , sortOrder , tag , visibility
         */
        AtomFilesMy : "/${files}/basic/api/myuserlibrary/feed",
        
        /**
         * A feed of files with are shared by or with the authenticated user.
         * 
         * Get the My Files feed to see a list of the files which the authenticated owns. 
         * Supports: direction (default inbound : with me, outbound : by me),  acls , includePath , includeQuota , includeTags , page , ps , shared , sI , since , sortBy , sortOrder , tag , visibility
         */
        AtomFilesShared : "/${files}/basic/api/documents/shared/feed",
        
        /**
         * Get a feed that lists all public files.
         *         
         * Supports: acls , includePath , includeQuota , includeTags , page , ps , shared , sI , since , sortBy , sortOrder , tag , visibility
         */
        AtomFilesPublic : "/${files}/basic/anonymous/api/documents/feed?visibility=public",
        
        /**
         * Get feed of recycled files
         */
        AtomFilesRecycled : "/${files}/basic/api/myuserlibrary/view/recyclebin/feed",
        
        /**
         * Get a feed that lists your folders
         *         
         * Supports: access(editor or manager), creator, page, ps, shared, sharedWithMe, sI, sortBy, sortOrder, title, visibility 
         */
        AtomFoldersMy : "/${files}/basic/api/collections/feed",
        
        /**
         * Feed of public folders
         */
        AtomFoldersPublic : "/${files}/basic/anonymous/api/collections/feed",
        
        /**
         * Feed of folders you recently added files to
         */
        AtomFoldersActive : "/${files}/basic/api/collections/addedto/feed",
        
        /**
         * A feed of comments associated with all public files. Do not authenticate this request.
         *         
         * Supports: acls, category  Note: This parameter is required., commentId, identifier, page, ps, sI, sortBy, sortOrder  
         */
        AtomFileCommentsPublic : "/${files}/basic/anonymous/api/userlibrary/{userId}/document/{documentId}/feed?category=comment",
        
        /**
         * A feed of comments associated with files to which you have access. You must authenticate this request. 
         *         
         * Supports: acls, category  Note: This parameter is required., commentId, identifier, page, ps, sI, sortBy, sortOrder  
         */
        AtomFileCommentsMy : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/feed?category=comment",
        
        /**
         * Adds a comment to the specified file.
         * 
         * Supports : identifier - Indicates how the document is identified in the {document-id} variable segment of the web address. By default, look up is performed with the expectation that the URL contains the value from the <td:uuid> element of a File Atom entry. Specify "label" if the URL instead contains the value from the <td:label> element of a File Atom entry. 
         */
        AtomAddCommentToFile : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/feed",
        
        /**
         * Adds a comment to the specified file for logged in user.
         * 
         * Supports : identifier - Indicates how the document is identified in the {document-id} variable segment of the web address. By default, look up is performed with the expectation that the URL contains the value from the <td:uuid> element of a File Atom entry. Specify "label" if the URL instead contains the value from the <td:label> element of a File Atom entry. 
         */
        AtomAddCommentToMyFile : "/${files}/basic/api/myuserlibrary/document/{documentId}/feed",        
        
        /**
         * 	Update the Atom document representation of the metadata for a file from logged in user's library.
         * 
         * supports : 
         * propagate	Indicates if users that are shared with can share this document. The default value is true.
         * sendEmail	Indicates if an email notification is sent when sharing with the specified user. The default value is true.
         */
        AtomUpdateFileMetadata : "/${files}/basic/api/myuserlibrary/document/{documentId}/entry",
        
        /**
         * Get pinned files from my my favorites feed.
         * 
         */
        AtomFilesMyPinned : "/${files}/basic/api/myfavorites/documents/feed",
        
        /**
         * Add a file to my favorites feed of logged in user
         * 
         */
        AtomPinFile : "/${files}/basic/api/myfavorites/documents/feed",
        
        /**
         * Add file of list of files to folder
         */
        AtomAddFilesToFolder : "/${files}/basic/api/collection/{collectionId}/feed",
        
        /**
         * Delete a file and the Atom document representation of its associated metadata from logged in user's collection.
         */
        AtomDeleteFile :  "/${files}/basic/api/myuserlibrary/document/{documentId}/entry",
        
        /**
         * Lock or unlock a file
         */
        AtomLockUnlockFile : "/${files}/basic/api/document/{documentId}/lock",
        
        /**
         * Add the document to collections specified by atom entry or feed.
         */
        AtomAddFileToFolders : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/feed",
        
        /**
        * Add the document of logged in user to collections specified by atom entry or feed.
        */
        AtomAddMyFileToFolders : "/${files}/basic/api/myuserlibrary/document/{documentId}/feed",
        
        /**
         * Create a file folder programmatically.
         */
        AtomCreateFolder : "/${files}/basic/api/collections/feed",
        
        /**
         * Delete all files from recycle bin of specified user
         */
        AtomDeleteAllFilesFromRecyclebBin : "/${files}/basic/api/userlibrary/{userId}/view/recyclebin/feed",
        
        /**
         * Delete all files from recycle bin of logged in user
         */
        AtomDeleteMyFilesFromRecyclebBin : "/${files}/basic/api/myuserlibrary/view/recyclebin/feed",
        
        /**
         * Delete All Versions of a File
         */
        AtomDeleteAllVersionsOfAFile : "/${files}/basic/api/myuserlibrary/document/{documentId}/feed",
        
        /**
         * Delete a Comment for a File
         */
        AtomDeleteComment : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Delete a comment on file for logged in user         
         */
        AtomDeleteMyComment : "/${files}/basic/api/myuserlibrary/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Purge a file from Recycle Bin
         */
        AtomDeleteFileFromRecycleBin : "/${files}/basic/api/userlibrary/{userId}/view/recyclebin/{documentId}/entry",
        
        /**
         * Purge a file from REcycle Bin for Logged in user
         */
        AtomDeleteMyFileFromRecycleBin : "/${files}/basic/api/myuserlibrary/view/recyclebin/{documentId}/entry",
        
        /**
         * Remove a file Share
         */
        AtomDeleteFileShare : "/${files}/basic/api/shares/feed",
        
        /**
         * Delete a Folder
         */
        AtomDeleteFolder : "/${files}/basic/api/collection/{collectionId}/entry",
        
        /**
         * Get Files for a user 
         */
        AtomGetAllUsersFiles : "/${files}/basic/anonymous/api/userlibrary/{userId}/feed",
        
        /**
         * Get a comment for a file
         */
        AtomGetFileComment : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Get a comment for a File for logged in user
         */
        AtomGetMyFileComment : "/${files}/basic/api/myuserlibrary/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Get File from Recycle Bin
         */
        AtomGetFileFromRecycleBin : "/${files}/basic/api/userlibrary/{userId}/view/recyclebin/{documentId}/entry",
        
        /**
         * Get Files Awaiting Approval
         */
        AtomGetFilesAwaitingApproval : "/${files}/basic/api/approval/documents",
        
        /**
         * Get File Shares
         */
        AtomGetFileShares : "/${files}/basic/api/documents/shared/feed",
        
        /**
         * Get All Files in a Folder
         */
        AtomGetFilesInFolder : "/${files}/basic/api/collection/{collectionId}/feed",
        
        /**
         * Get Files in Recycle Bin of logged in user
         */
        AtomGetFilesInMyRecycleBin : "/${files}/basic/api/myuserlibrary/view/recyclebin/feed",
        
        /**
         * Get file with given version
         */
        AtomGetFileWithGivenVersion : "/${files}/basic/api/myuserlibrary/document/{documentId}/version/{versionId}/entry",
        
        /**
         * Get a folder
         */
        AtomGetFolder : "/${files}/basic/api/collection/{collectionId}/entry",
        
        /**
         * Get Folder with Recenty Added Files
         */
        AtomGetFoldersWithRecentlyAddedFiles : "/${files}/basic/api/collections/addedto/feed",
        
        /**
         * Get Pinned Folders
         */
        AtomGetPinnedFolders : "/${files}/basic/api/myfavorites/collections/feed",
        
        /**
         * Get Public Folders
         */
        AtomGetPublicFolders : "/${files}/basic/anonymous/api/collections/feed",
        
        /**
         * Pin/unpin a Folder
         */
        AtomPinFolder : "/${files}/basic/api/myfavorites/collections/feed",
        
        /**
         * Remove File from Folder
         */
        AtomRemoveFileFromFolder : "/${files}/basic/api/collection/{collectionId}/feed",
        
        /**
         * Restore File from Recycle Bin
         */
        AtomRestoreFileFromRecycleBin : "/${files}/basic/api/userlibrary/{userId}/view/recyclebin/{documentId}/entry",
        
        /**
         * Share File with Community or communities
         */
        AtomShareFileWithCommunities : "/${files}/basic/api/myuserlibrary/document/{documentId}/feed",
        
       /**
        * Update a Comment
        */
        AtomUpdateComment : "/${files}/basic/api/userlibrary/{userId}/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Update comment of logged in user
         */
        AtomUpdateMyComment : "/${files}/basic/api/myuserlibrary/document/{documentId}/comment/{commentId}/entry",
        
        /**
         * Add Comment To Community File
         */
        AtomAddCommentToCommunityFile : "/${files}/basic/api/communitylibrary/{communityId}/document/{documentId}/feed",
        
        /**
         * Get All Community Files, Shows only files with with a libraryType of communityFiles
         * TODO This should be renamed
         */
        AtomGetAllFilesInCommunity : "/${files}/basic/api/communitylibrary/{communityId}/feed",
        
        /**
         * Get all files in a community, Shows public, private, communityFiles etc.
         */
        AtomGetAllCommunityFiles : "/${files}/basic/api/communitycollection/{communityId}/feed",
        
        /**
         * Get Community File
         */
        AtomGetCommunityFile : "/${files}/basic/api/communitylibrary/{communityId}/document/{documentId}/entry",
       
        /**
         * Update metadata of community File
         */
        AtomUpdateCommunityFileMetadata : "/${files}/basic/api/library/{libraryId}/document/{documentId}/entry"
    }, conn);
});
},
'sbt/authenticator/templates/login':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
function submitOnClick(contentForm) {
    if (contentForm.username.value == "" || contentForm.password.value == "") {
        document.getElementById("wrongCredsMessage").style.display = "block";
        return;
    }
    var argsMap = getArgsMap();// get map of query string arguments
    var actionURL = decodeURIComponent(argsMap.actionURL);
    var loginUi = decodeURIComponent(argsMap.loginUi);
    if (loginUi.length == 0) {
        loginUi = "mainWindow";
    }
    if (loginUi == "popup") {
        contentForm.action = actionURL + "?loginUi=popup&redirectURLToLogin="
                + encodeURIComponent(document.URL)+"&endpointAlias="+opener.globalEndpointAlias;
    } else if (loginUi == "mainWindow") {
        var redirectURL = argsMap.redirectURL;
        contentForm.action = actionURL
                + "?loginUi=mainWindow&redirectURLToLogin="
                + encodeURIComponent(document.URL) + "&redirectURL="
                + encodeURIComponent(redirectURL);
    }
    contentForm.submit();
}

function cancelOnClick() {
    var argsMap = getArgsMap();// get map of query string arguments
    var redirectURL = decodeURIComponent(argsMap.redirectURL);
    var loginUi = decodeURIComponent(argsMap.loginUi);
    if (loginUi == "popup") {
        if(window.cancel){
            window.cancel();
            delete window.cancel;
        }
        window.close();
    } else {
        window.location.href = redirectURL;
    }
}

function onLoginPageLoad() {
    var argsMap = getArgsMap();// get map of query string arguments
    var showWrongCredsMessage = argsMap.showWrongCredsMessage;
    if (showWrongCredsMessage == "true") {
        document.getElementById("wrongCredsMessage").style.display = "block";
    }
    if(opener && opener.globalLoginFormStrings){
        var loginForm = opener.globalLoginFormStrings;
    	document.getElementById('wrongCredsMessage').appendChild(document.createTextNode(loginForm.wrong_creds_message));
    	document.getElementById('basicLoginFormUsername').appendChild(document.createTextNode(loginForm.username));
    	document.getElementById('basicLoginFormPassword').appendChild(document.createTextNode(loginForm.password));
    	document.getElementById('basicLoginFormOK').value = loginForm.login_ok;
    	document.getElementById('basicLoginFormCancel').value = loginForm.login_cancel;
    }else{
        document.getElementById('wrongCredsMessage').appendChild(document.createTextNode(decodeURIComponent(argsMap.wrong_creds_message)));
        document.getElementById('basicLoginFormUsername').appendChild(document.createTextNode(decodeURIComponent(argsMap.username)));
        document.getElementById('basicLoginFormPassword').appendChild(document.createTextNode(decodeURIComponent(argsMap.password)));
		document.getElementById('basicLoginFormOK').value = decodeURIComponent(argsMap.login_ok);
    	document.getElementById('basicLoginFormCancel').value = decodeURIComponent(argsMap.login_cancel);
	}
}

function getArgsMap() {
    try {
        var qString = location.search.substring(1);// getting query string args
        var qStringParams = qString.split("&");// getting array of all query
                                                // string arg key value pairs
        var argsMap = {};
        var i;
        for (i = 0; i < qStringParams.length; i++) {
            var argArray = qStringParams[i].split("=");
            argsMap[argArray[0]] = argArray[1];
        }
        return argsMap;
    } catch (err) {
        console.log("Error making agrs map in login.js " + err);
    }
}
},
'sbt/pathUtil':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - URL utilities
 */
define(['./stringUtil'],function(stringUtil) {
	return {
		concat: function(path1,path2) {
			if(!path1) {
				return path2;
			}
			if(!path2) {
				return path1;
			}
			if(stringUtil.endsWith(path1,"/")) {
				path1 = path1.substring(0,path1.length-1);
			}
			if(stringUtil.startsWith(path2,"/")) {
				path2 = path2.substring(1);
			}
			return path1 + "/" + path2;
		},
		isAbsolute: function(url) {
			return url.indexOf("://")>=0;
		}
	}
});
},
'sbt/base/BaseService':function(){
/*
 * � Copyright IBM Corp. 2012, 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Javascript Base APIs for IBM Connections
 * 
 * @module sbt.base.BaseService
 * @author Carlos Manias
 */
define(["../config", "../declare", "../lang", "../log", "../stringUtil", "../Cache", "../Promise", "../util" ], 
    function(config, declare,lang,log,stringUtil,Cache,Promise, util) {
	// TODO sbt/config is required here to solve module loading
	// issues with jquery until we remove the global sbt object
	
    var BadRequest = 400;
    
    var requests = {};

    /**
     * BaseService class.
     * 
     * @class BaseService
     * @namespace sbt.base
     */
    var BaseService = declare(null, {
    	
        /**
         * The Endpoint associated with the service.
         */
        endpoint : null,

        /*
         * The Cache associated with the service.
         */
        _cache : null,
        
        /*
         * Regular expression used to remove // from url's
         */
        _regExp : new RegExp("/{2}"),
        
        /**
         * A map of default context roots to custom, if any. This will be implemented in subClasses of BaseService.
         */
        contextRootMap: {},

        /**
         * Constructor for BaseService
         * 
         * An endpoint is required so subclasses must check if one
         * was created here and if not set the default endpoint.
         * 
         * @constructor
         * @param {Object} args Arguments for this service.
         */
        constructor : function(args) {
        	args = args || {};
        	
            // set endpoint if specified in args
            if (args.endpoint) {
            	if (lang.isString(args.endpoint)) {
            		this.endpoint = config.findEndpoint(args.endpoint);
            	} else {
            		this.endpoint = args.endpoint;
            	}
            }

            // optionally create a cache
            if (args.cacheSize) {
                this._cache = new Cache(args.cacheSize);
            }
        },

        /**
         * Construct a url using the specified parameters 
         * 
         * @method constructUrl
         * @param url Base part of the URL to construct
         * @param params Params to be encoded in the URL
         * @param urlParams Params to be encoded in the URL query
         * @returns The constructed URL
         */
        constructUrl : function(url,params,urlParams) {
            if (!url) {
                throw new Error("BaseService.constructUrl: Invalid argument, url is undefined or null.");
            }
            
            if(this.endpoint){
                lang.mixin(this.contextRootMap, this.endpoint.serviceMappings);
                
                url = stringUtil.transform(url, this.contextRootMap, function(value, key){
                    if(!value){
                        return key;
                    }
                    else{
                        return value;
                    }
                }, this);
            }
            
            if (urlParams) {
                url = stringUtil.replace(url, urlParams);
                
                if (url.indexOf("//") != -1) {
                	// handle empty values
                	url = url.replace(this._regExp, "/");
                }
            }
            if (params) {
                for (param in params) {
                    if (url.indexOf("?") == -1) {
                        url += "?";
                    } else if (url.indexOf("&") != (url.length - 1)) {
                        url += "&";
                    }
                    var value = encodeURIComponent(params[param]);
                    if (value) {
                        url += param + "=" + value;
                    }
                }
            }
            return url;
        },
        
        /**
         * Get a collection of entities.
         * 
         * @method getEntities
         * @param url The URL to get the entities.
         * @param options Optional. Options for the request.
         * @param callbacks Callbacks used to parse the response and create the entities.
         * @returns {sbt/Promise}
         */
        getEntities : function(url,options,callbacks) {
            url = this.constructUrl(url);
            var self = this;
            var promise = new Promise();
            this.request(url,options,null,promise).response.then(
                function(response) {
                    promise.response = response;
                    try {
	                    var feedHandler = callbacks.createEntities.apply(self, [ self, response.data, response ]);
	                    var entitiesArray = feedHandler.getEntitiesDataArray();
	                    var entities = [];
	                    for ( var i = 0; i < entitiesArray.length; i++) {
	                        var entity = callbacks.createEntity.apply(self, [ self, entitiesArray[i], response ]);
	                        entities.push(entity);
	                    }
	                    promise.summary = feedHandler.getSummary();
	                    promise.fulfilled(entities);
                    } catch (cause) {
                    	var error = new Error("Error parsing response caused by: "+cause);
                    	error.cause = cause;
                    	promise.rejected(error);
                    }
                },
                function(error) {
                    promise.rejected(error);
                }
            );
            return promise;
        },

        /**
         * Get a single entity.
         * 
         * @method getEntity
         * @param url The URL to get the entity.
         * @param options Options for the request.
         * @param callbacks Callbacks used to parse the response and create the entity.
         * @returns {sbt/Promise}
         */
        getEntity : function(url,options,entityId,callbacks) {
            url = this.constructUrl(url);
            var promise = this._validateEntityId(entityId);
            if (promise) {
                return promise;
            }
            
            // check cache
            var promise = new Promise();
            var data = this.getFromCache(entityId);
            if (data) {
                promise.fulfilled(data);
                return promise;
            }

            var self = this;
            this.request(url,options,entityId,promise).response.then(
                function(response) {
                    promise.response = response;
                    try {
                        var entity = callbacks.createEntity.apply(self, [ self, response.data, response ]);
                        if (self._cache && entityId) {
                            self.fullFillOrRejectPromises.apply(self, [ entityId, entity, response ]);
                        } else {
                            promise.fulfilled(entity);
                        }
                    } catch (cause) {
                    	var error = new Error("Invalid response");
                    	error.cause = cause;
                        if (self._cache && entityId) {
                            self.fullFillOrRejectPromises.apply(self, [ entityId, error ]);
                        } else {
                            promise.rejected(error);
                        }
                    }
                },
                function(error) {
                    if (self._cache && entityId) {
                        self.fullFillOrRejectPromises.apply(self, [ entityId, error ]);
                    } else {
                        promise.rejected(error);
                    }
                }
            );
            return promise;
        },
        
        /**
         * Update the specified entity.
         * 
         * @method updateEntity
         * @param url The URL to update the entity.
         * @param options Options for the request.
         * @param callbacks Callbacks used to parse the response.
         * @param sbt/Promise
         */
        updateEntity : function(url, options, callbacks) {
            url = this.constructUrl(url);
            var self = this;
            var promise = new Promise();
            this.endpoint.request(url,options,null,promise).response.then(
                function(response) {
                    promise.response = response;
                    var entity = callbacks.createEntity.apply(self, [ self, response.data, response ]);
                    // callback can return a promise if an additional
                    // request is required to load the associated entity
                    if (entity instanceof Promise) {
                        entity.then(
                            function(response) {                                
                            	// it is the responsibility of the createEntity callback to clear the cache in this case.
                                promise.fulfilled(response);
                            },
                            function(error) {
                                promise.rejected(error);
                            }
                        );
                    } else {
                    	if(entity.id){
                    		self.removeFromCache(entity.id);
                    	}
                    	if(entity.id && entity.data){
                    		self.addToCache(entity.id, entity);
                    	}
                        promise.fulfilled(entity);
                    }
                },
                function(error) {
                    promise.rejected(error);
                }
            );
            return promise;
        },

        /**
         * Delete the specified entity.
         * 
         * @method deleteEntity
         * @param url The URL to delete the entity.
         * @param options Options for the request.
         * @param entityId Id of the entity to delete.
         * @param sbt/Promise
         */
        deleteEntity : function(url,options,entityId) {
            url = this.constructUrl(url);
            var promise = this._validateEntityId(entityId);
            if (promise) {
                return promise;
            }

            var self = this;
            var promise = new Promise();
            this.endpoint.request(url,options,entityId,promise).response.then(
                function(response) {
                    promise.response = response;
                    promise.fulfilled(entityId);
                    self.removeFromCache(entityId);
                },
                function(error) {
                    promise.rejected(error);
                }
            );
            return promise;
        },
        
        /**
         * Perform an XML HTTP Request with cache support.
         * 
         * @method request
         * @param url URL to request
         * @param options Options for the request.
         * @param entityId Id of the rntity associated with the request.
         * @param promise Promise being returned
         * @param sbt/Promise
         */
        request : function(url,options,entityId,promise) {
            url = this.constructUrl(url);
            if (this._cache && entityId) {
                this.pushPromise(entityId, promise);
            }
            return this.endpoint.request(url,options);
        },

        /**
         * Push set of promise onto stack for specified request id.
         * 
         * @method pushPromise
         * @param id Id of the request.
         * @param promise Promise to push.
         */
        pushPromise : function(id,promise) {
            log.debug("pushPromise, id : {0}, promise : {1}", id, promise);
            if (!requests[id]) {
                requests[id] = [];
            }
            requests[id].push(promise);
        },

        /**
         * Notify set of promises and pop from stack for specified request id.
         * 
         * @method fullFillOrRejectPromises
         * @param id
         * @param data
         * @param response
         */
        fullFillOrRejectPromises : function(id,data,response) {
            log.debug("fullFillOrRejectPromises, id : {0}, data : {1}, response : {2}", id, data, response);
            this.addToCache(id, data);
            var r = requests[id];
            if (r) {
                delete requests[id];
                for ( var i = 0; i < r.length; i++) {
                    var promise = r[i];
                    this.fullFillOrReject.apply(this, [ promise, data, response ]);
                }
            }
        },

        /**
         * Fullfill or reject specified promise.
         * 
         * @method fullFillOrReject
         * @param promise
         * @param data
         * @param response
         */
        fullFillOrReject : function(promise,data,response) {
            if (promise) {
                try {
                    promise.response = response;
                    if (data instanceof Error) {
                        promise.rejected(data);
                    } else {
                        promise.fulfilled(data);
                    }
                } catch (error) {
                    log.debug("fullFillOrReject: " + error.message);
                }
            }
        },

        /**
         * Add the specified data into the cache.
         * 
         * @method addToCache
         * @param id
         * @param data
         */
        addToCache : function(id, data) {
            if (this._cache && !(data instanceof Error)) {
                this._cache.put(id, data);
            }
        },
        
        /**
         * Remove the cached data for the specified id.
         * 
         * @method removeFromCache
         * @param id
         */
        removeFromCache : function(id) {
            if (this._cache) {
                this._cache.remove(id);
            }
        },
                
        /**
         * Get the cached data for the specified id.
         * 
         * @method getFromCache
         * @param id
         */
        getFromCache : function(id) {
            if (this._cache) {
                return this._cache.get(id);
            }
        },
                
        /**
         * Create a bad request Error.
         * 
         * @method createBadRequestError
         * @param message
         * @returns {Error}
         */
        createBadRequestError : function(message) {
            var error = new Error();
            error.code = BadRequest;
            error.message = message;
            return error;
        },
        
        /**
         * Create a bad request Promise.
         * 
         * @method createBadRequestPromise
         * @param message
         * @returns {sbt/Promise}
         */
        createBadRequestPromise : function(message) {
            return new Promise(this.createBadRequestError(message));
        },
        
        /**
         * Return true if the specified id is an email.
         * 
         * @method isEmail
         * @param id
         * @returns {Boolean}
         */
        isEmail : function(id) {
            return id && id.indexOf('@') >= 0;
        },
        
        /**
         * Extract the Location parameter from a URL.
         * 
         * @method getLocationParameter
         * @param ioArgs
         * @param name
         * @returns {String}
         */
        getLocationParameter: function (response, name) {
            var location = response.getHeader("Location") || undefined;
            if (location) {
                return this.getUrlParameter(location, name);
            }
        },
        
        /**
         * Extract the specified parameter from a URL.
         * 
         * @mehtod getUrlParameter
         * @param url
         * @param name
         * @returns {Boolean}
         */
        getUrlParameter : function (url, name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null;
        },
        
        /**
         * Validate a string field, and return a Promise if invalid.
         * 
         * @param fieldName
         * @param fieldValue
         */
        validateField : function(fieldName, fieldValue) {
            if (!fieldValue) {
                var message = "Invalid value {0} for field {1}, the field must not be empty or undefined.";
                message = stringUtil.substitute(message, [ fieldValue || "'undefined'", fieldName ]);
                return this.createBadRequestPromise(message);
            }
        },
        
        /**
         * Validate a map of fields, and return a Promise for first invalid field found.
         * 
         * @param fieldMap
         */
        validateFields : function(fieldMap) {
            for(var name in fieldMap){
                var value = fieldMap[name];
                var promise = this.validateField(name, value);
                if (promise) {
                    return promise;
                }
            }
        },
        
        /**
         * Validate HTML5 File API Support for browser and JS Library	
         */
        validateHTML5FileSupport : function() {
        	if (!window.File || !window.FormData) {
				var message = "HTML 5 File API is not supported by the Browser.";
				return this.createBadRequestPromise(message);
			}
        	// Dojo 1.4.3 does not support HTML5 FormData
			if(util.getJavaScriptLibrary().indexOf("Dojo 1.4") != -1) {
				return this.createBadRequestPromise("Dojo 1.4.* is not supported for Update Profile Photo");
			}
        },
        
        /*
         * Validate the entityId and if invalid notify callbacks
         */
        _validateEntityId : function(entityId) {
            if (!entityId || !lang.isString(entityId)) {
                var message = "Invalid argument {0}, expected valid entity identifier.";
                message = stringUtil.substitute(message, [ entityId || "'undefined'" ]);
                return this.createBadRequestPromise(message);
            }
        },
        
        /**
         * Returns HTML5 File Control object 
         * @param {Object} fileControlOrId FileControl or ID of File Control
         * @returns {Object} FileControl
         */
        getFileControl : function(fileControlOrId) {
            var fileControl = null;
            if (typeof fileControlOrId == "string") {
                fileControl = document.getElementById(fileControlOrId);             
            } else if (typeof fileControlOrId == "object") {
                fileControl = fileControlOrId;
            }
            return fileControl;
        }

    });
    return BaseService;
});

},
'sbt/base/VCardDataHandler':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * JavaScript API for IBM Connections Profile Service.
 * 
 * @module sbt.connections.ProfileService
 */
define([ "../declare", "../lang", "../config", "../stringUtil", "./XmlDataHandler" ], 
    function(declare,lang,config,stringUtil,XmlDataHandler) {

    /**
     * VCardDataHandler class.
     * 
     * @class ProfileDataHandler
     * @namespace sbt.connections
     */
    var VCardDataHandler = declare(XmlDataHandler, {
        
        lineDelim : "\n",
        itemDelim : ":",
        
        _vcard : null,
        
        /**
         * @constructor
         * @param {Object}
         *            args Arguments for this data handler.
         */
        constructor : function(args) {
            this.parseVCard();
        },
        
        /**
         * Parse the vcard data from the specified element.
         * 
         * @method parseVCard 
         */
        parseVCard : function() {
            var content = stringUtil.trim(this.getAsString("vcard"));
            var lines = content.split(this.lineDelim);
            this._vcard = {};
            for (var i=1; i<lines.length-1; i++) {
                var line = stringUtil.trim(lines[i]);
                var index = line.indexOf(this.itemDelim);
                var key = line.substring(0, index);
                var value = line.substring(index+1);
                this._vcard[key] = value;
            }
        },
        
        /*
         * Override this method to handle VCard properties.
         */
        _selectText : function(property) {
            var xpath = this._getXPath(property);
            if (this._vcard && this._vcard.hasOwnProperty(xpath)) {
                return this._vcard[xpath];
            } else {
                try {
                    return this.inherited(arguments, [ property ]);
                } catch (error) {
                    // vcard expressions may cause an error
                    // if they are treated as xpath expressions
                    return null;
                }
            }
        }
        
    });
    return VCardDataHandler;
});
},
'sbt/_bridge/declare':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 * 
 * declare() function.
 */
define(['dojo/_base/declare'],function(declare) {
	return declare;
});

},
'sbt/smartcloud/SmartcloudConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for IBM Connections.
 * 
 * @module sbt.connections.ConnectionsConstants
 */
define([ "../lang", "../base/BaseConstants" ], function(lang, base) {

    return lang.mixin(base, {

        /**
		 * XPath expressions used when parsing a Connections ATOM feed
		 */
        SmartcloudFeedXPath : {
            // used by getEntitiesDataArray
            entries : "/a:feed/a:entry",
            // used by getSummary
            totalResults : "/a:feed/opensearch:totalResults",
            startIndex : "/a:feed/opensearch:startIndex",
            itemsPerPage : "/a:feed/opensearch:itemsPerPage"
        }

    });
});
},
'sbt/i18n':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 * @module sbt.i18n
 */
define(['./_bridge/i18n'],function(i18n) {
    var nls = {
        todayAt : "Today at ",
        on : "on "
    };
    
    i18n.getUpdatedLabel = function(dateStr) {
        var date = new Date(dateStr);
        var dateClone = new Date(date.getTime());
        var now = new Date();
        if (dateClone.setHours(0,0,0,0) == now.setHours(0,0,0,0)) {
            return nls.todayAt + this.getLocalizedTime(date);
        } else {
            return nls.on + this.getLocalizedDate(date);
        }
    };
        
    i18n.getSearchUpdatedLabel = function(dateStr) {
        var date = new Date(dateStr);
        var dateClone = new Date(date.getTime());
        var now = new Date();
        if (dateClone.setHours(0,0,0,0) == now.setHours(0,0,0,0)) {
            return nls.todayAt + this.getLocalizedTime(date);
        } else {
            return this.getLocalizedDate(date);
        }
    };
    return i18n;
});



},
'sbt/DebugTransport':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * 
 * Implementation of a transport which writes the response to the DOM.
 */
define([ "./declare", "./lang", "./dom", "./json", "./stringUtil", "sbt/_bridge/Transport" ], function(declare, lang, dom, json, stringUtil, Transport) {
    return declare(Transport, {
        
    	responseMap : {},
    	index : 0,
    	
        /*
         * Create a response object
         */
    	createResponse: function(url, options, response, ioargs) {
            var retval = this.inherited(arguments, [ url, options, response, ioargs ]);

            var mockNode = dom.byId("mockData");
        	if (mockNode) {
        		if (options.handleAs == "json") {
        			response = json.jsonBeanStringify(response);
        		}
        		
        		var pre = document.createElement("pre");
        		mockNode.appendChild(pre);
        		var status = retval.status || 0;
        		var handleAs = options.handleAs || "text";
        		var method = options.method || "GET";
        		var data = options.data || "";
        		var location = retval.getHeader("Location") || "";
        		var isError = (response instanceof Error);
        		if (isError) {
        			response = retval.data.responseText || retval.data.response.text || response;
        		}
        		var id = url;
        		var hash = stringUtil.hashCode(id);
        		if (this.responseMap[hash]) {
        			this.responseMap[hash] = this.responseMap[hash] + 1;
            		id += "#" + this.responseMap[hash];
        		} else {
        			this.responseMap[hash] = 1;
        		}
        		
        		var text = "<script type='text/template' status='"+status+
        					"' id='"+id+
        					"' index='"+this.index+
        		            "' handleAs='"+handleAs+
        		            "' method='"+method+
        		            "' location='"+location+
        		            "' error='"+isError+
        		            "'>\n"+response+"\n</script>";
        		pre.appendChild(dom.createTextNode(text));
        		
        		this.index++;
        	}
        	
        	return retval;
        }
        
    });
});
},
'sbt/connections/ProfileConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for CommunityService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({
        
        /**
         * Default size for the profile cache
         */
        DefaultCacheSize : 10,
        
        /**
         * Fields used to populate the Address object
         */
        AddressFields : [ "streetAddress", "extendedAddress", "locality", "region", "postalCode", "countryName" ],

        /**
         * XPath expressions used when parsing a Connections Profiles ATOM feed
         */
        ProfileFeedXPath : conn.ConnectionsFeedXPath,
        /**
         * Namespace expressions used when parsing a Connections Profiles ATOM feed
         */
        ProfileNamespaces : conn.Namespaces,

        /**
         * Connection type colleague
         */
        TypeColleague : "colleague",
        
        /**
         * Status flag
         */
        StatusPending : "pending",
        
        /**
         * XPath expressions to be used when reading a Profile Entry
         */
        ProfileXPath : lang.mixin({},conn.AtomEntryXPath,{   
        	uid : "a:contributor/snx:userid",// overwriting this for ProfileService
            entry : "/a:feed/a:entry",// overwriting this for ProfileService 
            userid : "a:contributor/snx:userid",
            name : "a:contributor/a:name",
            email : "a:contributor/a:email",            
            altEmail : "a:content/h:div/h:span/h:div[@class='x-groupwareMail']", // TODO do we need this? it's a dupe of groupwareMail
            photoUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/image']/@href", 
            fnUrl : "a:content/h:div/h:span/h:div/h:a[@class='fn url']/@href",
            soundUrl : "a:content/h:div/h:span/h:div/h:a[@class='sound url']/@href",
            jobTitle : "a:content/h:div/h:span/h:div[@class='title']",
            organizationUnit : "a:content/h:div/h:span/h:div[@class='org']/h:span[@class='organization-unit']",
            telephoneNumber : "a:content/h:div/h:span/h:div[@class='tel']/h:span[@class='value']",
            building : "a:content/h:div/h:span/h:div/h:span[@class='x-building']",
            floor : "a:content/h:div/h:span/h:div/h:span[@class='x-floor']",
            officeNumber : "a:content/h:div/h:span/h:div/h:span[@class='x-office-number']",
            streetAddress : "a:content/h:div/h:span/h:div/h:div[@class='street-address']",
            extendedAddress : "a:content/h:div/h:span/h:div/h:div[@class='extended-address x-streetAddress2']",
            locality : "a:content/h:div/h:span/h:div/h:span[@class='locality']",
            postalCode : "a:content/h:div/h:span/h:div/h:span[@class='postal-code']",
            region : "a:content/h:div/h:span/h:div/h:span[@class='region']",
            countryName : "a:content/h:div/h:span/h:div/h:div[@class='country-name']",
            groupwareMail : "a:content/h:div/h:span/h:div[@class='x-groupwareMail']",
            blogUrl : "a:content/h:div/h:span/h:div/h:a[@class='x-blog-url url']/@href",
            role : "a:content/h:div/h:span/h:div[@class='role']",
            managerUid : "a:content/h:div/h:span/h:div[@class='x-manager-uid']",
            isManager : "a:content/h:div/h:span/h:div[@class='x-is-manager']"
    	}),	
        
        /**
         * XPath expressions to be used when reading a ColleagueConnection Entry
         */
        ColleagueConnectionXPath : lang.mixin({}, conn.AtomEntryXPath, {
        	entry : "/a:feed/a:entry"          
        }),
        
        /**
         * XPath expressions to be used when reading a Community Entry with VCard content
         */
        ProfileVCardXPath : lang.mixin({}, conn.AtomEntryXPath, {
            // used by getEntityData
            entry : "/a:feed/a:entry",
            // used by getEntityId
            uid : "a:contributor/snx:userid",
            // used by parseVCard
            vcard : "a:content",           
            userid : "a:contributor/snx:userid",
            name : "a:contributor/a:name",
            email : "a:contributor/a:email",           
            altEmail : "EMAIL;X_GROUPWARE_MAIL", // TODO do we need this? it's a dupe of groupwareMail
            photoUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/image']/@href",
            fnUrl : "URL",
            soundUrl : "SOUND;VALUE=URL",
            jobTitle : "TITLE",
            organizationUnit : "a:content/h:div/h:span/h:div[@class='org']/h:span[@class='organization-unit']",
            telephoneNumber : "TEL;WORK",
            building : "X_BUILDING",
            floor : "X_FLOOR",
            officeNumber : "X_OFFICE_NUMBER",
            workLocation : "ADR;WORK",
            streetAddress : "a:content/h:div/h:span/h:div/h:div[@class='street-address']",
            extendedAddress : "a:content/h:div/h:span/h:div/h:div[@class='extended-address x-streetAddress2']",
            locality : "a:content/h:div/h:span/h:div/h:span[@class='locality']",
            postalCode : "a:content/h:div/h:span/h:div/h:span[@class='postal-code']",
            region : "a:content/h:div/h:span/h:div/h:span[@class='region']",
            countryName : "a:content/h:div/h:span/h:div/h:div[@class='country-name']",
            groupwareMail : "EMAIL;X_GROUPWARE_MAIL"
        }),
        
        /**
         * XPath expressions to be used when reading a Profile Tag feed
         */
        ProfileTagsXPath : {
        	// used by getEntitiesDataArray
        	entries : "/app:categories/a:category",
        	// used to access data from the feed
        	targetEmail : "app:categories/snx:targetEmail",
        	numberOfContributors : "@snx:numberOfContributors",
            // used by getEntityData
            entry : "/app:categories/a:category",
            // used by getEntityId
            uid : "@term",
            // used by getters
            id : "@term",
            term : "@term",
            frequency : "@snx:frequency",
            intensity : "@snx:intensityBin", 
            visibility : "@snx:visibilityBin",
            contributorName : "a:name",
            contributorUserid : "a:userid",
            contributorEmail : "a:email"
        },
        
        /**
         * XPath expressions to be used when reading an invite entry
         */
        InviteXPath : lang.mixin({}, conn.AtomEntryXPath, {
            connectionType: "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/connection/type']/@term",
            status: "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/status']/@term"
        }),
        
        /**
         * XML elements to be used when creating a Profile Entry
         *                    
         **/        
        profileCreateAttributes : {
			guid : "com.ibm.snx_profiles.base.guid",
			email : "com.ibm.snx_profiles.base.email",
			uid : "com.ibm.snx_profiles.base.uid",
			distinguishedName : "com.ibm.snx_profiles.base.distinguishedName",
			displayName : "com.ibm.snx_profiles.base.displayName",
			givenNames : "com.ibm.snx_profiles.base.givenNames",
			surname : "com.ibm.snx_profiles.base.surname",
			userState :"com.ibm.snx_profiles.base.userState"
		},
        
		/**
         * Retrieve a profile entry.
         */
        AtomProfileDo : "/${profiles}{authType}/atom/profile.do",
        
        /**
         * Update a profile entry.
         */
        AtomProfileEntryDo : "/${profiles}{authType}/atom/profileEntry.do",
        
        /**
         * Retrieve a feed that lists the contacts that a person has designated as colleagues.
         */
        AtomConnectionsDo : "/${profiles}{authType}/atom/connections.do",
        
        /**
         * Retrieve the profiles of the people who comprise a specific user's report-to chain.
         */
        AtomReportingChainDo : "/${profiles}{authType}/atom/reportingChain.do",
        
        /**
         * Retrieve the people managed by a specified person.
         */
        AtomPeopleManagedDo : "/${profiles}{authType}/atom/peopleManaged.do",
        
        /**
         * Retrieve status updates for a specified person.
         */
        AtomConnectionsInCommonDo : "/${profiles}{authType}/atom/connectionsInCommon.do",
        
        /**
         * Search for a set of profiles that match a specific criteria and return them in a feed.
         */
        AtomSearchDo : "/${profiles}{authType}/atom/search.do",
        
        /**
         * Retrieve the profiles of the people who report to a specific user. 
         */
        AtomPeopleManagedDo : "/${profiles}{authType}/atom/peopleManaged.do",
        
        /**
         * Retrieve the tags assigned to a profile from the Profiles tag collection.
         */
        AtomTagsDo : "/${profiles}{authType}/atom/profileTags.do",
        
        /**
         * Admin API - create a new profile.
         */
        AdminAtomProfileDo : "/${profiles}/admin/atom/profiles.do",
        
        /**
         * Admin API - delete a  profile.
         */
        AdminAtomProfileEntryDo : "/${profiles}/admin/atom/profileEntry.do"
        
    },conn);
});
},
'sbt/base/AtomEntity':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * AtomEntity class represents an entry from an IBM Connections ATOM feed.
 * 
 * @module sbt.base.AtomEntity
 */
define([ "../declare", "../lang", "../stringUtil", "./BaseConstants", "./BaseEntity", "./XmlDataHandler" ], 
    function(declare,lang,stringUtil,BaseConstants,BaseEntity,XmlDataHandler) {

    var EntryTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
    				"<entry xmlns=\"http://www.w3.org/2005/Atom\" ${createNamespaces}>" +
    					"${categoryScheme}${createTitle}${createContent}${createSummary}${createContributor}${createTags}${createEntryData}" + 
    				"</entry>";
	var TitleTmpl = "<title type=\"text\">${title}</title>";
	var ContentTmpl = "<content type=\"${contentType}\">${content}</content>";
	var SummaryTmpl = "<summary type=\"text\">${summary}</summary>";
	var ContributorTmpl = "<contributor>${contributor}</contributor>";
    var EmailTmpl = "<email>${email}</email>";
    var UseridTmpl = "<snx:userid xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\">${userid}</snx:userid>";
    var CategoryTmpl = "<category term=\"${tag}\"></category>";
    
    /**
     * AtomEntity class represents an entry from an IBM Connections ATOM feed.
     * 
     * @class AtomEntity
     * @namespace sbt.base
     */
    var AtomEntity = declare(BaseEntity, {
    	
    	contentType : "html",
    	categoryScheme : null,

        /**
         * Construct an AtomEntity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        	if (args.data) {
	        	// create XML data handler
	        	this.dataHandler = this.createDataHandler(
	        		args.service, args.data || null, args.response || null,
	        		args.namespaces || this.namespaces || BaseConstants.Namespaces,
	                args.xpath || this.xpath || BaseConstants.AtomEntryXPath
	            );
        	} else {
        		this.service = args.service || this.service;
        		this.namespaces = args.namespaces || this.namespaces || BaseConstants.Namespaces;
        		this.xpath = args.xpath || this.xpath || BaseConstants.AtomEntryXPath;
        	}
        },
        
        /**
         * Create the DataHandler for this entity.
         * 
         * @method createDataHandler
         */
        createDataHandler : function(service, data, response, namespaces, xpath) {
        	return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : namespaces,
                xpath : xpath
            });
        },
        
        /**
         * Called to set the entity data after the entity
         * was loaded. This will cause the existing fields to be cleared.
         * 
         * @param data
         */
        setData : function(data, response) {
        	// create XML data handler
    		this.dataHandler = this.createDataHandler(
    			this.service, 
    			data, response || null,
        		this.namespaces || BaseConstants.Namespaces,
                this.xpath || BaseConstants.AtomEntryXPath
            );
        	
        	this.inherited(arguments);
        },
                
        /**
         * Return the value of id from ATOM entry document.
         * 
         * @method getId
         * @return {String} ID of the ATOM entry
         */
        getId : function() {
            return this.getAsString("id");
        },

        /**
         * Return the value of title from ATOM entry document.
         * 
         * @method getTitle
         * @return {String} ATOM entry title
         */
        getTitle : function() {
            return this.getAsString("title");
        },

        /**
         * Sets title of ATOM entry.
         * 
         * @method setTitle
         * @param {String} title ATOM entry title
         */
        setTitle : function(title) {
            return this.setAsString("title", title);
        },
        
        /**
         * Return the value of summary from ATOM entry document.
         * 
         * @method getSummary
         * @return {String} ATOM entry summary
         */
        getSummary : function() {
            return this.getAsString("summary");
        },

        /**
         * Sets summary of ATOM entry.
         * 
         * @method setSummary
         * @param {String} title ATOM entry summary
         */
        setSummary : function(summary) {
            return this.setAsString("summary", summary);
        },
        
        /**
         * Return the content from ATOM entry document.
         * 
         * @method getContent
         * @return {Object} Content
         */
        getContent : function() {
            return this.getAsString("content");
        },

        /**
         * Sets content of ATOM entry.
         * 
         * @method setContent
         * @param {String} content
         */
        setContent : function(content) {
            return this.setAsString("content", content);
        },

        /**
         * Return array of category terms from ATOM entry document.
         * 
         * @method getCategoryTerms
         * @return {Object} Array of categories of the ATOM entry
         */
        getCategoryTerms : function() {
            return this.getAsArray("categoryTerm");
        },

        /**
         * Set new category terms to be associated with this ATOM entry document.
         * 
         * @method setCategories
         * @param {Object} Array of categories to be added to the ATOM entry
         */

        setCategoryTerms : function(categoryTerms) {
            return this.setAsArray("categoryTerm", categoryTerms);
        },

        /**
         * Gets an author of the ATOM entry
         * 
         * @method getAuthor
         * @return {Object} author Author of the ATOM entry
         */
        getAuthor : function() {
            return this.getAsObject(
            		[ "authorUserid", "authorName", "authorEmail", "authorUserState" ],
            		[ "userid", "name", "email", "userState" ]);
        },

        /**
         * Gets a contributor of the ATOM entry
         * 
         * @method getContributor
         * @return {Object} contributor Contributor of the ATOM entry
         */
        getContributor : function() {
            return this.getAsObject(
            		[ "contributorUserid", "contributorName", "contributorEmail", "contributorUserState" ],
            		[ "userid", "name", "email", "userState" ]);
        },
        
        /**
         * Sets the contributor of the ATOM entry
         * 
         * @method setContributor
         * @return {Object} contributor Contributor of the ATOM entry
         */
        setContributor : function(contributor) {
            return this.setAsObject(contributor);
        },
        
        /**
         * Return the published date of the ATOM entry document.
         * 
         * @method getPublished
         * @return {Date} Published date of the entry
         */
        getPublished : function() {
            return this.getAsDate("published");
        },

        /**
         * Return the last updated date of the ATOM entry document.
         * 
         * @method getUpdated
         * @return {Date} Last updated date of the entry
         */
        getUpdated : function() {
            return this.getAsDate("updated");
        },
        
        /**
         * Return the alternate url of the ATOM entry document.
         * 
         * @method getAlternateUrl
         * @return {String} Alternate url
         */
        getAlternateUrl : function() {
            return this.getAsString("alternateUrl");
        },
                
        /**
         * Return the self url of the ATOM entry document.
         * 
         * @method getSelfUrl
         * @return {String} Self url
         */
        getSelfUrl : function() {
            return this.getAsString("selfUrl");
        },
        
        /**
         * Return the edit url of the ATOM entry document.
         * 
         * @method getEditUrl
         * @return {String} Edit url
         */
        getEditUrl : function() {
            return this.getAsString("editUrl");
        },

        /**
         * Create ATOM entry XML
         * 
         * @method createPostData
         * @returns
         */
        createPostData : function() {
            var postData = stringUtil.transform(EntryTmpl, this, function(v,k) { return v; }, this);
            return stringUtil.trim(postData);
        },
        
        /**
         * Return title element to be included in post data for this ATOM entry.
         * 
         * @method createTitle
         * @returns {String}
         */
        createTitle : function() {
        	var title = this.getTitle();
        	if (title) {
        		return stringUtil.transform(TitleTmpl, { "title" : title });
        	}
        	return "";
        },
        
        /**
         * Return content element to be included in post data for this ATOM entry.
         * 
         * @method createContent
         * @returns {String}
         */
        createContent : function() {
        	var content = this.getContent();
        	if (content) {
        		if (this.contentType == "html") {
        			content = (content && lang.isString(content)) ? content.replace(/</g,"&lt;").replace(/>/g,"&gt;") : content; 
            	}
        		return stringUtil.transform(ContentTmpl, { "contentType" : this.contentType, "content" : content });
        	}
        	return "";
        },
        
        /**
         * Return summary element to be included in post data for this ATOM entry.
         * 
         * @method createSummary
         * @returns {String}
         */
        createSummary : function() {
        	var summary = this.getSummary();
        	if (summary) {
        		return stringUtil.transform(SummaryTmpl, { "summary" : summary });
        	}
        	return "";
        },
        
        /**
         * Return contributor element to be included in post data for this ATOM entry.
         * 
         * @method createContributor
         * @returns {String}
         */
        createContributor : function() {
        	var contributor = this.getContributor();
        	if (contributor) {
        		var value = "";
        		var email = contributor.email || ((this.getEmail) ? this.getEmail() : null);
        		if (email) {
                    value += stringUtil.transform(EmailTmpl, { "email" : email });
            	}
        		var userid = contributor.userid || ((this.getUserid) ? this.getUserid() : null);
            	if (userid) {
                    value += stringUtil.transform(UseridTmpl, { "userid" : userid });
            	}
            	if (value.length > 0) {
            		value = stringUtil.transform(ContributorTmpl, { "contributor" : value });
            	}
            	return value;
        	}
        	return "";
        },
        
        /**
         * Return tags elements to be included in post data for this ATOM entry.
         * 
         * @method createTags
         * @returns {String}
         */
        createTags : function() {
        	if (this.getTags && this.getTags()) {
                var value = "";
        		var tags = this.getTags();
                for (var tag in tags) {
                    value += stringUtil.transform(CategoryTmpl, { "tag" : tags[tag] });
                }
                return value;
            }
        	return "";
        },
        
        /**
         * Return extra entry data to be included in post data for this ATOM entry.
         * 
         * @method createEntryData
         * @returns {String}
         */
        createEntryData : function() {
        	return "";
        },
        
        /**
         * return namespaces for this ATOM entry.
         * 
         * @method createNamespaces
         */
        createNamespaces : function() {
        	var namespaceData = "";
        	var namespaces = this.dataHandler ? this.dataHandler.namespaces : this.namespaces;
        	for (prefix in namespaces) {
        		if (prefix != "a") { // ATOM automatically included
        			namespaceData += (namespaceData.length > 0) ? " " : "";
        			namespaceData += "xmlns:"+prefix+"=\"" + namespaces[prefix] + "\"";
        		}
        	}
        	return namespaceData;
        }

    });
    
    return AtomEntity;
});

},
'sbt/connections/FollowConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * Definition of constants for FollowService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin(conn, {
    	
    	/**
         * Activities Source
         * 
         * @property ActivitiesSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ActivitiesSource : "activities",
        
        /**
         * Activity Resource Type
         * 
         * @property ActivityResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ActivityResourceType : "activity",
        
        /**
         * Blogs Source
         * 
         * @property BlogsSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        BlogsSource : "blogs",
        
        /**
         * Blog Resource Type
         * 
         * @property BlogResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        BlogResourceType : "blog",
        
        /**
         * Communities Source
         * 
         * @property CommunitiesSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        CommunitiesSource : "communities",

        /**
         * Community Resource Type
         * 
         * @property CommunitiesResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        CommunitiesResourceType : "community",
        
        /**
         * Files Source
         * 
         * @property FilesSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        FilesSource : "files",

        /**
         * File Resource Type
         * 
         * @property FileResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        FileResourceType : "file",
        
        /**
         * FileFolder Resource Type
         * 
         * @property FileFolderResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        FileFolderResourceType : "file_folder",
        
        /**
         * Forums Source
         * 
         * @property ForumsSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ForumsSource : "forums",

        /**
         * Forum Resource Type
         * 
         * @property ForumResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ForumResourceType : "forum",
        
        /**
         * ForumTopic Resource Type
         * 
         * @property ForumTopicResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ForumTopicResourceType : "forum_topic",
        
        /**
         * Profile Source
         * 
         * @property ProfilesSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        ProfilesSource : "profiles",

        /**
         * Profile Resource Type
         * 
         * @property ProfilesResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        
        ProfilesResourceType : "profile",
        
        /**
         * Wikis Source
         * 
         * @property WikisSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        WikisSource : "wikis",

        /**
         * Wiki Resource Type
         * 
         * @property WikiResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        WikiResourceType : "wiki",
        
        /**
         * WikiPage Resource Type
         * 
         * @property WikiPageResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        WikiPageResourceType : "wiki_page",
        
        /**
         * Tags Source
         * 
         * @property TagsSource
         * @type String
         * @for sbt.connections.FollowedResource
         */
        TagsSource : "tags",

        /**
         * Tag Resource Type
         * 
         * @property TagResourceType
         * @type String
         * @for sbt.connections.FollowedResource
         */
        TagResourceType : "tag",
        
        
        /**
		 * Get the followed resources feed
		 * 
		 * @method getFollowedResources
		 * @param {String} source String specifying the resource. Options are:
		 *
		 *	activities
		 *	blogs
		 *	communities
		 *	files
		 *	forums
		 *	profiles
		 *	wikis
		 *	tags
		 *
		 * @param {String} resourceType String representing the resource type. Options are:
		 * 
		 * If source=activities
		 * 	   activity
		 * 
		 * If source=blogs
		 *     blog
		 *     
		 * If source=communities
		 *     community
		 *     
		 * If source=files
		 *     file
		 *     file_folder
		 *      
		 * 
		 * If source=forums
		 *     forum
		 *     forum_topic
		 *      
		 * 
		 * If source=profiles
		 *     profile
		 *     
		 * If source=wikis
		 *     wiki
		 *     wiki_page
		 *      
		 * 
		 * If source=tags
		 *     tag
		 * 
		 * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
		 */
    	FollowedResourceFeedXPath : conn.ConnectionsFeedXPath,
    	
        /**
         * XPath expressions to be used when reading a followed resource entry
         */
    	FollowedResourceXPath : lang.mixin({}, conn.AtomEntryXPath, {
            followedResourceUuid : "a:id",
            categoryType : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
            source : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/source']/@term",
            resourceType : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/resource-type']/@term",
            resourceId : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/resource-id']/@term",
            relatedUrl : "a:link[@rel='related']/@href"
        }),
        
        /**
         * XPath expressions to be used when reading a followed resource entry
         */
    	OneFollowedResourceXPath : lang.mixin({}, conn.AtomEntryXPath, {
    		entry : "/a:feed/a:entry",
            followedResourceUuid : "a:id",
            categoryType : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
            source : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/source']/@term",
            resourceType : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/resource-type']/@term",
            resourceId : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/resource-id']/@term",
            relatedUrl : "a:link[@rel='related']/@href"
        }),
        
        /**
         * Get, follow or stop following a resource. 
         */
        AtomFollowAPI : "/{service}/follow/atom/resources",
        
        /**
         * Get, follow or stop following a resource. 
         */
        AtomStopFollowAPI : "/{service}/follow/atom/resources/{resourceId}"
    });
});
},
'sbt/defer':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Defer plugin.
 * @author Carlos Manias
 */
define([], function(text) {
    return {
    	load: function (id, require, load) {
            require([id], function (value) {
                load(value);
            });
        }
    };
});

},
'sbt/nls/Endpoint':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  cannot_find_endpoint:"Unable to find endpoint named {0}, creating it now with an error transport."
  })
  
});
},
'sbt/nls/ErrorTransport':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  endpoint_not_available:"Required endpoint is not available: {0}"	 
  })
  
});
},
'sbt/connections/ForumConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * Definition of constants for ForumService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin(conn, {
    	
    	/**
    	 * Term value with a forum recommendation 
    	 */
    	FlagAnswer : "recommendation",
    	
    	/**
    	 * Term value when a forum reply is an accepted answer 
    	 */
    	FlagAnswer : "answer",
    	
    	/**
    	 * Term value when a forum topic is pinned 
    	 */
    	FlagPinned : "pinned",
    	
    	/**
    	 * Term value when a forum topic is locked 
    	 */
    	FlagLocked : "locked",
    	
    	/**
    	 * Term value when a forum topic is a question 
    	 */
    	FlagQuestion : "question",
    	
    	/**
    	 * Term value when a forum topic is an answered question 
    	 */
    	FlagAnswered : "answered",
    	
    	/**
    	 * Category term and scheme to lock a topic
    	 */
    	setLocked: "locked scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\"",
    	
    	/**
    	 * Category term and scheme to pin a topic
    	 */
    	setPinned: "pinned scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\"",
    	
    	/**
    	 * Category term and scheme to mark a topic as a question
    	 */
    	markAsQuestion: "question scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\"",
    	    	
        /**
         * XPath expressions used when parsing a Connections Forums ATOM feed
         */
    	ForumsFeedXPath : conn.ConnectionsFeedXPath,

        /**
         * XPath expressions to be used when reading an forum entry
         */
    	ForumXPath : lang.mixin({
            forumUuid : "a:id",
            content : "a:content[@type='text']",
            tags : "a:category[not(@scheme)]/@term",
            moderation : "snx:moderation/@status",
            threadCount: "a:link[@rel='replies']/@thr:count",	
            forumUrl : "a:link[@rel='alternate']/@href",
            communityUuid : "snx:communityUuid"
        }, conn.AtomEntryXPath),
        
        /**
         * XPath expressions to be used when reading an forum topic entry
         */
        ForumTopicXPath : lang.mixin({
            topicUuid : "a:id",
            topicTitle: "a:title",
            forumUuid : "thr:in-reply-to/@ref",	
        	tags : "a:category[not(@scheme)]/@term",
        	permissions : "snx:permissions",
            communityUuid : "snx:communityUuid",
            threadCount: "a:link[@rel='replies']/@thr:count",
            locked: "a:category[@term='locked' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            pinned: "a:category[@term='pinned' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            question: "a:category[@term='question' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            answered: "a:category[@term='answered' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            notRecommendedByCurrentUser: "a:category[@term='NotRecommendedByCurrentUser']",
            threadRecommendationCount: "a:category[@term='ThreadRecommendationCount']/@label",
            recommendationsUrl : "a:link[@rel='recommendations']/@href"
        }, conn.AtomEntryXPath),
        
        /**
         * XPath expressions to be used when reading an forum reply entry
         */
        ForumReplyXPath : lang.mixin({
            replyUuid : "a:id",
        	topicUuid : "thr:in-reply-to/@ref",
            permissions : "snx:permissions",
            communityUuid : "snx:communityUuid",
            answer: "a:category[@term='answer' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            replyTo: "thr:in-reply-to/@ref",
            notRecommendedByCurrentUser: "a:category[@term='NotRecommendedByCurrentUser']",
            recommendationsUrl : "a:link[@rel='recommendations']/@href"
        }, conn.AtomEntryXPath),
        
        /**
         * XPath expressions to be used when reading an forum recommendation entry
         */
        ForumRecommendationXPath : lang.mixin({
            postUuid : "a:link[@rel='self']/@href"
        }, conn.AtomEntryXPath),
        
        /**
		 * Edit link for a forum entry.  
         */
        AtomForum : "${forums}/atom/forum",
        
        /**
		 * Edit link for a forum topic entry.  
         */
        AtomTopic : "/${forums}/atom/topic",
        
		/**
		 * Edit link for a forum reply entry.  
         */
        AtomReply : "/${forums}/atom/reply",
        
		/**
		 * Get a feed that includes all stand-alone and community forums created in the enterprise. 
         */
        AtomForums : "/${forums}/atom/forums",
        
		/**
		 * Get a feed that includes all of the forums hosted by the Forums application. 
         */
        AtomForumsPublic : "/${forums}/atom/forums/public",
        
		/**
		 * Get a feed that includes forums created by the authenticated user or associated with communities to which the user belongs.  
         */
        AtomForumsMy : "/${forums}/atom/forums/my",
        
		/**
		 * Get a feed that includes the topics in a specific stand-alone forum.  
         */
        
        AtomTopics : "/${forums}/atom/topics",
        
        /**
         * Get a feed that includes the topics that the authenticated user created in stand-alone forums and in forums associated 
         * with communities to which the user belongs. 
         */
        AtomTopicsMy : "/${forums}/atom/topics/my",
        
        /**
         * Get a feed that includes all of the replies for a specific forum topic. 
         */
        AtomReplies : "/${forums}/atom/replies",
        
        /**
         * Get a category document that lists the tags that have been assigned to forums. 
         */
        AtomTagsForum : "/atom/tags/forums",
        
        /**
         * Get a category document that lists the tags that have been assigned to forum topics. 
         */
        AtomTagsTopics : "/atom/tags/topics",
        
        /**
         * Get a feed that includes all of the recommendations for a specific forum post.
         */
        AtomRecommendationEntries : "/${forums}/atom/recommendation/entries"

    });
});
},
'sbt/stringUtil':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Defination of some string Utilities
 * 
 * @module sbt.stringUtil
 */
define(['./xml'], function(xml) {

	var _regex = new RegExp("{-?[0-9]+}", "g");

	return {
		/**
		 * Substitutes the String with pattern {<<number>>} with argument array provided. {-1} is for printing '{' and {-2} is for printing '}' in the text
		 * 
		 * @param {String} [str] String to be formatted
		 * @param {Array} [args] arguments Array
		 * @param {Boolean} [useBlankForUndefined = false] optional flag to indicate to user blank String in case index is not found in args. 
		 * @static
		 * @method substitute
		 */
		substitute : function(str, args, useBlankForUndefined) {
			if (str && args) {
				return str.replace(_regex, function(item) {
					var intVal = parseInt(item.substring(1, item.length - 1));
					var replace;
					if (intVal >= 0) {
						replace = args[intVal] ? args[intVal] : useBlankForUndefined ? "" : "undefined";
					} else if (intVal == -1) {
						replace = "{";
					} else if (intVal == -2) {
						replace = "}";
					} else {
						replace = "";
					}
					return replace;
				});
			}
			return str;
		},
		
		/**
		 * Replaces the String with pattern {<<string>>} with argument map provided. Replaces blank if key to be replaces is not found in argsMap.
		 * 
		 * @param {String} [str] String to be formatted
		 * @param {Array} [argsMap] arguments Map		 
		 * @static
		 * @method replace
		 */
		replace : function(str, argsMap) {
			if (str && argsMap) {
				return str.replace(/{(\w*)}/g, function(m, key) {					
					var replace;
					replace = argsMap.hasOwnProperty(key) ? xml.encodeXmlEntry(argsMap[key]) : "";
					return replace;
				});
			}
			return str;
		},
		
		trim: function x_trim(s) {
			return s ? s.replace(/^\s+|\s+$/g,"") : s;
		},
		
		startsWith: function x_sw(s,prefix) {
			return s.length>=prefix.length && s.substring(0,prefix.length)==prefix;
		},
		
		endsWith: function x_ew(s,suffix) {
			return s.length>=suffix.length && s.substring(s.length-suffix.length)==suffix;
		},
		
		transform: function(template, map, transformer, thisObject) {
		    return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
		        function(match, key, format){
		            var value = map[key] || "";
                    if (typeof value == 'function') {
                        // invoke function to return the value
                        try {
                            value = value.apply(thisObject, [ map ]);
                        } catch (ex) {
                            value = "ERROR:" + key + " " + ex;
                        }
                    }
                    if (transformer) {
		                value = transformer.call(thisObject, value, key);
		            } 
	                if (typeof value == "undefined" || value == null) {
	                    return "";
	                }
		            return value.toString();
		        }
		    );
		},
		
        hashCode: function(str) {
            if (str.length == 0) {
            	return 0;
            }
            var hash = 0, i, charStr;
            for (i = 0, l = str.length; i < l; i++) {
            	charStr = str.charCodeAt(i);
                hash = ((hash<<5)-hash)+charStr;
                hash |= 0;
            }
            return hash;
        }

	};
});

},
'sbt/base/XmlDataHandler':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Helpers for the base capabilities of data
 * handlers.
 * 
 * @module sbt.base.DataHandler
 */
define([ "../declare", "../lang", "../stringUtil", "../xml", "../xpath", "./DataHandler" ], 
	function(declare,lang,stringUtil,xml,xpath,DataHandler) {

    /**
     * XmlDataHandler class
     * 
     * @class XmlDataHandler
     * @namespace sbt.base
     */
    var XmlDataHandler = declare(DataHandler, {

        /**
         * Data type for this DataHandler is 'xml'
         */
        dataType : "xml",

        /**
         * Set of XPath expressions used by this handler. Required for entity:
         * uid, entry Required for summary: totalResults, startIndex,
         * itemsPerPage
         */
        xpath : null,

        /**
         * Set of namespaces used by this handler.
         */
        namespaces : null,

        /**
         * Set of values that have already been read.
         */
        _values : null,

        /**
         * Summary of a feed.
         */
        _summary : null,

        /**
         * @constructor
         * @param {Object}
         *            args Arguments for this data handler.
         */
        constructor : function(args) {
            lang.mixin(this, args);

            this._values = {}; // TODO option to disable cache
            this.data = this._fromNodeOrString(args.data);
        },

        /**
         * Called to set the handler data.
         * 
         * @param data
         */
        setData : function(data) {
            this._values = {}; // TODO option to disable cache
            this.data = this._fromNodeOrString(data);
        },        
        
        /**
         * @method getAsString
         * @param property
         * @returns
         */
        getAsString : function(property) {
            this._validateProperty(property, "getAsString");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectText(property);
                }
                return this._values[property];
            } else {
                return _selectText(property);
            }
        },

        /**
         * @method getAsNumber
         * @param property
         * @returns
         */
        getAsNumber : function(property) {
            this._validateProperty(property, "getAsNumber");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectNumber(property);
                }
                return this._values[property];    
            } else {
                return this._selectNumber(property);
            }
        },

        /**
         * @method getAsDate
         * @param property
         * @returns
         */
        getAsDate : function(property) {
            this._validateProperty(property, "getAsDate");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectDate(property);
                }
                return this._values[property];    
            } else {
                return this._selectDate(property);
            }
        },

        /**
         * @method getAsBoolean
         * @param property
         * @returns
         */
        getAsBoolean : function(property) {
            this._validateProperty(property, "getAsBoolean");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectBoolean(property);
                }
                return this._values[property];    
            } else {
                return this._selectBoolean(property);
            }
        },

        /**
         * @method getAsArray
         * @param property
         * @returns
         */
        getAsArray : function(property) {
            this._validateProperty(property, "getAsArray");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectArray(property);
                }
                return this._values[property];    
            } else {
                return this._selectArray(property);
            }
        },
        
        /**
         * @method getNodesArray
         * @param property
         * @returns
         */
        getAsNodesArray : function(property) {
            this._validateProperty(property, "getNodesArray");
            
            if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._selectNodesArray(property);
                }
                return this._values[property];    
            } else {
                return this._selectNodesArray(property);
            }
        },

        /**
         * @method getEntityId
         * @returns
         */
        getEntityId : function() {
            return stringUtil.trim(this.getAsString("uid"));
        },

        /**
         * getEntityData
         * 
         * @returns
         */
        getEntityData : function(document) {
            var entry = this.xpath["entry"];
            if (!entry) {
                return document;
            }
            if (!this._values["entry"]) {
                var nodes = xpath.selectNodes(document, entry, this.namespaces);
                this._values["entry"] = nodes[0] || null;
            }
            return this._values["entry"];
        },

        /**
         * @method getSummary
         * @returns
         */
        getSummary : function() {
            if (!this._summary && this._getXPath("totalResults")) {
                this._summary = {
                    totalResults : xpath.selectNumber(this.data, this._getXPath("totalResults"), this.namespaces),
                    startIndex : xpath.selectNumber(this.data, this._getXPath("startIndex"), this.namespaces),
                    itemsPerPage : xpath.selectNumber(this.data, this._getXPath("itemsPerPage"), this.namespaces)
                };
            }
            return this._summary;
        },

        /**
         * @method getEntitiesDataArray
         * @returns {Array}
         */
        getEntitiesDataArray : function() {
            var entries = this.xpath["entries"];
            if (!entries) {
                return this.data;
            }
            if (!this._values["entries"]) {
                this._values["entries"] = xpath.selectNodes(this.data, entries, this.namespaces);
            }
            return this._values["entries"];
        },
        
        /**
         * @method toJson
         * @returns {Object}
         */
        toJson : function() {
        	var jsonObj = {};
        	
        	for (var name in this.xpath) {
                if (this.xpath.hasOwnProperty(name)) {
                    jsonObj[name] = this.getAsString(name);
                }
            }
        	
        	return jsonObj;
        },        

        /*
         * Convert the input to a node by parsing as string and using
         * getEntityData, if not already one
         */
        _fromNodeOrString : function(nodeOrString) {
            if (lang.isString(nodeOrString)) {
                nodeOrString = stringUtil.trim(nodeOrString);
                var document = xml.parse(nodeOrString);
                return this.getEntityData(document);
            }
            return nodeOrString;
        },

        /*
         * Return xpath expression from the set or the property itself (assume
         * it's already xpath)
         */
        _getXPath : function(property) {
            return this.xpath[property] || property;
        },
        
        /*
         * Validate that the property is valid
         */
        _validateProperty : function(property, method) {
            if (!property) {
                var msg = stringUtil.substitute("Invalid argument for XmlDataHandler.{1} {0}", [ property, method ]);
                throw new Error(msg);
            }
        },
        
        /*
         * Select xpath as string
         */
        _selectText : function(property) {
        	if (!this.data) {
        		return null;
        	}
            return stringUtil.trim(xpath.selectText(this.data, this._getXPath(property), this.namespaces));
        },
        
        /*
         * Select xpath as number
         */
        _selectNumber : function(property) {
        	if (!this.data) {
        		return null;
        	}
            return xpath.selectNumber(this.data, this._getXPath(property), this.namespaces);
        },
        
        /*
         * Select xpath as date
         */
        _selectDate : function(property) {
        	if (!this.data) {
        		return null;
        	}
            var text = this._selectText(property);
            return text ? new Date(Date.parse(text)) : null;
        },
        
        /*
         * Select xpath as boolean
         */
        _selectBoolean : function(property) {
        	if (!this.data) {
        		return false;
        	}
            var nodes = xpath.selectNodes(this.data, this._getXPath(property), this.namespaces);
            var ret = false;
            if (nodes) {
           		if (nodes.length == 1) {
           			// handle case were node has text value equal true/false
           			var text = stringUtil.trim(nodes[0].text || nodes[0].textContent);
           			if (text) {
           				text = text.toLowerCase();
           				if ("false" == text) {
           					return false;
           				}
           				if ("true" == text) {
           					return true;
           				}
           			}
           		}
            	ret = (nodes.length > 0);
            }
            return ret;
        },
        
        /*
         * Select xpath as array
         */
        _selectArray : function(property) {
        	if (!this.data) {
        		return null;
        	}
            var nodes = xpath.selectNodes(this.data, this._getXPath(property), this.namespaces);
            var ret = null;
            if (nodes) {
                ret = [];
                for ( var i = 0; i < nodes.length; i++) {
                    ret.push(stringUtil.trim(nodes[i].text || nodes[i].textContent));
                }
            }
            return ret;
        },
        
        /*
         * Select xpath as nodes array
         */
        _selectNodesArray : function(property) {
        	if (!this.data) {
        		return null;
        	}
            return xpath.selectNodes(this.data, this._getXPath(property), this.namespaces);            
        }
       

    });
    return XmlDataHandler;
});
},
'sbt/base/BaseEntity':function(){
/*
 * � Copyright IBM Corp. 2012, 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Javascript Base APIs for IBM Connections
 * 
 * @module sbt.base.BaseEntity
 */
define([ "../declare", "../lang", "../log", "../stringUtil" ], 
    function(declare,lang,log,stringUtil) {

    var BadRequest = 400;
    
    var requests = {};

    /**
     * BaseEntity class
     * 
     * @class BaseEntity
     * @namespace sbt.base
     */
    var BaseEntity = declare(null, {

        /**
         * The identifier for this entity.
         */
        id : null,

        /**
         * The service associated with the entity.
         */
        service : null,

        /**
         * The DataHandler associated with this entity.
         */
        dataHandler : null,

        /**
         * The fields which have been updated in this entity.
         * 
         * @private
         */
        _fields : null,

        /**
         * Constructor for BaseEntity
         * 
         * @constructor
         * @param {Object} args Arguments for this entity.
         */
        constructor : function(args) {
            lang.mixin(this, args);
            
            if (!this._fields) {
                this._fields = {};
            }
            
            if (!this.service) {
                var msg = "Invalid BaseEntity, an associated service must be specified.";
                throw new Error(msg);
            }
        },
        
        /**
         * Called to set the entity DataHandler after the entity
         * was loaded. This will cause the existing fields to be cleared.
         * 
         * @param datahandler
         */
        setDataHandler : function(dataHandler) {
        	this._fields = {};
        	this.dataHandler = dataHandler;
        },
        
        /**
         * Called to set the entity data after the entity
         * was loaded. This will cause the existing fields to be cleared.
         * 
         * @param data
         */
        setData : function(data, response) {
        	this._fields = {};
        	this.dataHandler.setData(data);
        },
        
        /**
         * Return true if this entity has been loaded.
         *  
         * @returns true if this entity has been loaded
         */
        isLoaded : function() {
        	if (this.dataHandler) {
        		return this.dataHandler.getData() ? true : false;
        	}
            return false;
        },
        
        /**
         * Get the string value of the specified field.
         * 
         * @method getAsString
         * @param fieldName
         * @returns
         */
        getAsString : function(fieldName) {
            this._validateFieldName(fieldName, "getAsString");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsString(fieldName);
            } else {
                return null;
            }
        },

        /**
         * Get the number value of the specified field.
         * 
         * @method getAsNumber
         * @param fieldName
         * @returns
         */
        getAsNumber : function(fieldName) {
            this._validateFieldName(fieldName, "getAsNumber");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsNumber(fieldName);
            } else {
                return null;
            }
        },

        /**
         * Get the date value of the specified field.
         * 
         * @method getAsDate
         * @param fieldName
         * @returns
         */
        getAsDate : function(fieldName) {
            this._validateFieldName(fieldName, "getAsDate");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsDate(fieldName);
            } else {
                return null;
            }
        },

        /**
         * Get the boolean value of the specified field.
         * 
         * @method getAsBoolean
         * @param fieldName
         * @returns
         */
        getAsBoolean : function(fieldName) {
            this._validateFieldName(fieldName, "getAsBoolean");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsBoolean(fieldName);
            } else {
                return false;
            }
        },

        /**
         * Get the array value of the specified field.
         * 
         * @method getAsArray
         * @param fieldName
         * @returns
         */
        getAsArray : function(fieldName) {
            this._validateFieldName(fieldName, "getAsArray");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsArray(fieldName);
            } else {
                return null;
            }
        },

		 /**
         * Get the nodes array value of the specified field.
         * 
         * @method getAsNodesArray
         * @param fieldName
         * @returns
         */
        getAsNodesArray : function(fieldName) {
            this._validateFieldName(fieldName, "getAsNodesArray");

            if (this._fields.hasOwnProperty(fieldName)) {
                return this._fields[fieldName];
            } else if (this.dataHandler) {
                return this.dataHandler.getAsNodesArray(fieldName);
            } else {
                return null;
            }
        },
        /**
         * Get an object containing the values of the specified fields.
         * 
         * @method getAsObject
         * @param fieldNames
         * @returns
         */
        getAsObject : function(fieldNames, objectNames) {
            var obj = {};
            for (var i=0; i<fieldNames.length; i++) {
                this._validateFieldName(fieldNames[i], "getAsObject");
                var fieldValue = this.getAsString(fieldNames[i]);
                if (fieldValue) {
                    if (objectNames) {
                    	obj[objectNames[i]] = fieldValue;
                    } else {
                    	obj[fieldNames[i]] = fieldValue;
                    }
                }
            }
            return obj;
        },

        /**
         * @method setAsString
         * @param data
         * @returns
         */
        setAsString : function(fieldName,string) {
            this._validateFieldName(fieldName, "setAsString", string);

            if (string === null || string === undefined) {
                delete this._fields[fieldName];
            } else {
                this._fields[fieldName] = string.toString();
            }
            return this;
        },

        /**
         * @method setAsNumber
         * @returns
         */
        setAsNumber : function(fieldName,numberOrString) {
            this._validateFieldName(fieldName, "setAsNumber", numberOrString);

            if (numberOrString instanceof Number) {
                this._fields[fieldName] = numberOrString;
            } else {
                if (numberOrString) {
                    var n = new Number(numberOrString);
                    if (isNaN(n)) {
                        var msg = stringUtil.substitute("Invalid argument for BaseService.setAsNumber {0},{1}", [ fieldName, numberOrString ]);
                        throw new Error(msg);
                    } else {
                        this._fields[fieldName] = n;
                    }
                } else {
                    delete this._fields[fieldName];
                }
            }
            return this;
        },

        /**
         * @method setAsDate
         * @returns
         */
        setAsDate : function(fieldName,dateOrString) {
            this._validateFieldName(fieldName, "setAsDate", dateOrString);

            if (dateOrString instanceof Date) {
                this._fields[fieldName] = dateOrString;
            } else {
                if (dateOrString) {
                    var d = new Date(dateOrString);
                    if (isNaN(d.getDate())) {
                        var msg = stringUtil.substitute("Invalid argument for BaseService.setAsDate {0},{1}", [ fieldName, dateOrString ]);
                        throw new Error(msg);
                    } else {
                        this._fields[fieldName] = d;
                    }
                } else {
                    delete this._fields[fieldName];
                }
            }
            return this;
        },

        /**
         * @method setAsBoolean
         * @returns
         */
        setAsBoolean : function(fieldName,booleanOrString) {
            this._validateFieldName(fieldName, "setAsBoolean", booleanOrString);

            if (booleanOrString != null) {
                this._fields[fieldName] = booleanOrString ? true : false;
            } else {
                delete this._fields[fieldName];
            }
            return this;
        },

        /**
         * @method setAsArray
         * @returns
         */
        setAsArray : function(fieldName,arrayOrString) {
            this._validateFieldName(fieldName, "setAsArray", arrayOrString);

            if (lang.isArray(arrayOrString)) {
                this._fields[fieldName] = arrayOrString.slice(0);
            } else if (lang.isString(arrayOrString)) {
                if (arrayOrString.length > 0) {
                    this._fields[fieldName] = arrayOrString.split(/[ ,]+/);
                } else {
                    this._fields[fieldName] = [];
                }
            } else {
                if (arrayOrString) {
                    this._fields[fieldName] = [ arrayOrString ];
                } else {
                    delete this._fields[fieldName];
                }
            }

            return this;
        },

        /**
         * Set an object containing the values of the specified fields.
         * 
         * @method setAsObject
         * @param theObject
         * @returns
         */
        setAsObject : function(theObject) {
            for (var property in theObject) {
                if (theObject.hasOwnProperty(property)) {
                    var value = theObject[property];
                    if (value) {
                        this._fields[property] = value;
                    } else {
                        delete this._fields[property];
                    }
                }
            }
        },

        /**
         * Remove the value of the specified field.
         * 
         * @method remove
         * @param fieldName
         */
        remove : function(fieldName) {
            delete this._fields[fieldName];
        },
        
        /**
         * Return the json representation of the entity
         * 
         * @method toJson
         * @returns {Object}
         */
        toJson : function() {
        	return (this.dataHandler) ? this.dataHandler.toJson() : {};
        },

        /*
         * Validate there is a valid field name
         */
        _validateFieldName : function(fieldName, method, value) {
            if (!fieldName) {
                var msg = stringUtil.substitute("Invalid argument for BaseService.{1} {0},{2}", [ fieldName, method, value || "" ]);
                throw new Error(msg);
            }
        }
    });

    return BaseEntity;
});

},
'sbt/smartcloud/ProfileConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for ProfileService.
 */
define([ "../lang" ], function(lang) {

    return lang.mixin( {} , {
        /**
         * Default size for the profile cache
         */
        DefaultCacheSize : 10,
        
		/**
         * Retrieve the profile entry of the logged in user.
         */
        GetProfile : "/lotuslive-shindig-server/social/rest/people/@me/@self",
        
        /**
         * Retrieve the logged in user's profile connections.
         */
        GetMyConnections : "/lotuslive-shindig-server/social/rest/people/@me/@friends",
        
        /**
         * Retrieve a profile's user Identity.
         */
        GetUserIdentity : "/manage/oauth/getUserIdentity",
        
        /**
         * Retrieve a Contact's Profile.
         */
        GetContactByGUID : "/lotuslive-shindig-server/social/rest/people/lotuslive:contact:{idToBeReplaced}/@self",
        
        /**
         * Retrieve a profiles entry using GUID.
         */
        GetProfileByGUID : "/lotuslive-shindig-server/social/rest/people/lotuslive:user:{idToBeReplaced}/@self",
        
        /**
         * Retrieve the logged in user's profile contacts.
         */
        GetMyContacts : "/lotuslive-shindig-server/social/rest/people/@me/@all",
        
        /**
         * JsonPath expressions to be used when reading a Profile Entry
         */
        ProfileJsonPath : { 
        	thumbnailUrl : "$..photo",
        	address : "$..address",
        	department : "$..name",
        	jobTitle : "$..jobtitle",
        	telephone : "$..telephone",
        	about : "$..aboutMe",
        	id : "$..id",
        	objectId : "$..objectId",
        	displayName : "$..displayName",
        	emailAddress : "$..emailAddress",
        	profileUrl : "$..profileUrl",
        	country : "$..country",
        	orgId : "$..orgId",
        	org : "$..org.name",
        	global : "$..",
        	firstElement : "$[0]",
        	totalResults : "totalResults",
        	startIndex : "startIndex",
        	itemsPerPage : "itemsPerPage"
        }
    });
});
},
'sbt/MockTransport':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * 
 * Implementation of a transport which returns mock data.
 */
define([ "./declare", "./lang", "./dom", "./xml", "./json", "./stringUtil", "./Promise" ], 
	function(declare, lang, dom, xml, json, stringUtil, Promise) {
    return declare(null, {
    	
    	requestMap : {},
        
        /**
         * Provides mock data if available in the DOM.
         */
        request : function(url, options) {
            var query = this.createQuery(options.query);
            if(url && query){
                url += (~url.indexOf('?') ? '&' : '?') + query;
            }

            var promise = new Promise();
            promise.response = new Promise();

    		var id = url;
    		var hash = stringUtil.hashCode(id);
    		if (this.requestMap[hash]) {
    			this.requestMap[hash] = this.requestMap[hash] + 1;
        		id += "#" + this.requestMap[hash];
    		} else {
    			this.requestMap[hash] = 1;
    		}
    		
            var domNode = dom.byId(id);
	        if (domNode) {
	        	var response = domNode.text || domNode.textContent;
	        	var handleAs = domNode.getAttribute("handleAs");
	        	if (handleAs == "json") {
        			response = json.parse(response);
        		}
	        	
	        	var status = domNode.getAttribute("status");
	        	
	        	var error = domNode.getAttribute("error");
	        	if (error == "true") {
	        		var error = new Error();
	        		error.code = Number(status || 400);
	        		error.message = this.getErrorText(response);
	        		error.response = this.createResponse(url, options, response, Number(status || 400), {});
	                promise.rejected(error);
	                promise.response.rejected(error);
	        	} else {
		        	var location = domNode.getAttribute("location");
		        	var headers = {
		        		Location : location
		        	};
		        	
	                promise.fulfilled(response);
	                promise.response.fulfilled(this.createResponse(url, options, response, Number(status || 200), headers));
	        	}
	        }
	        else {
	        	var message = "Unable to find mock response for: "+url;
	        	var error = new Error(message);
	        	error.response = { status : 400 , message : message };
                promise.rejected(error);
                promise.response.rejected(error);
	        }

	        return promise;
        },
        
        /*
         * Create a response object
         */
        createResponse: function(url, options, response, status, headers) {
            var handleAs = options.handleAs || "text";
            return { 
                url : url,
                options : options,
                data : response,
                text : (handleAs == "text") ? response : null,
                status : status,
                getHeader : function(headerName) {
                    return headers[headerName];
                }
            };
        },

        /*
         * Create a query string from an object
         */
        createQuery: function(queryMap) {
            if (!queryMap) {
                return null;
            }
            var pairs = [];
            for(var name in queryMap){
                var value = queryMap[name];
                pairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
            }
            return pairs.join("&");
        },
        
        getErrorText: function(text) {    	
            if (text) {
                try {            	
                    var dom = xml.parse(text);
                    var messages = dom.getElementsByTagName("message");
                    if (messages && messages.length != 0) {                	
                        text = messages[0].text || messages[0].textContent;                	
                        text = lang.trim(text);
                    }
                } catch(ex) {}  
                return text.replace(/(\r\n|\n|\r)/g,"");
            } else {
                return text;
            }
        }
        
    });
});
},
'sbt/lang':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Some language utilities.
 */
define(['./_bridge/lang'],function(lang) {
	// The actual implementation is library dependent
	return lang;
});

},
'sbt/Endpoint':function(){
/*
 * (C) Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Definition of the endpoint module
 * @module sbt.Endpoint
 */

/**
 * Endpoint which defines a connection to a back-end server.
 * 
 * @module sbt.Endpoint
 */
define(['./declare','./lang','./ErrorTransport','./Promise','./pathUtil','./compat','./log', './stringUtil', 'sbt/i18n!sbt/nls/Endpoint', './xml'],
function(declare,lang,ErrorTransport,Promise,pathUtil,compat,log,stringUtil,nls,xml) {

/**
 * This class encapsulates an actual endpoint, with its URL, proxy and its authentication mechanism.
 * 
 * @class sbt.Endpoint
 */
var Endpoint = declare(null, {
	
	/**
	 * URL of the server used to connect to the endpoint
	 * @property baseUrl
	 * @type String
	 */
	baseUrl: null,
	
	/**
	 * Proxy to be used
	 * @property proxy
	 * @type String 
	 */
	proxy: null,
	
	/**
	 * Path to be added to the proxy url, if any
	 * @property proxyPath
	 * @type String 
	 */
	proxyPath: null,
	
	/**
	 * Transport to be used
	 * @property transport
	 * @type String
	 */
	transport: null,
	
	/**
	 * Authenticator to be used
	 * @property authenticator
	 * @type String
	 */
	authenticator: null,
	
	/**
	 * Auth Type to be used
	 * @property authType
	 * @type String
	 */
	authType: null,
	
	/**
	 * UI Login mode: mainWindow, dialog or popup
	 * @property loginUi
	 * @type String
	 */
	loginUi: "",
	
	/**
	 * Page for login form for mainWindow and popup
	 * @property loginPage
	 * @type String
	 */
	loginPage: null,
	
	/**
	 * Page for login form for dialog
	 * @property dialogLoginPage
	 * @type String
	 */
	dialogLoginPage: null,
	
	/**
	 * Whether auth dialog should come up automatically or not. In case of not 401 would be propagated to user.
	 * @property autoAuthenticate
	 * @type String
	 */
	autoAuthenticate: null,
	
	/**
	 * Whether user is authenticated to endpoint or not.
	 * @property isAuthenticated
	 * @type String
	 */
	isAuthenticated: false,
	
	/**
	 * The error code that is returned from the endpoint on authentication failure.
	 * @property authenticationErrorCode
	 * @type String
	 */
	authenticationErrorCode: null,
	
	/**
	 * Simple constructor that mixes in its parameters as object properties
	 * @constructor
	 * @param {Array} args
	 */	
	constructor: function(args) {
		lang.mixin(this, args || {});	
	},
	
    /**
     * Provides an asynchronous request using the associated Transport.
     * 
     * @method request
     * @param {String)
     *            url The URL the request should be made to.
     * @param {String)
     *            loginUi The type of UI to use when authenticating,
     *            valid values are: mainWindow, popup, dialog.
     * @param {Boolean)
     *            authAuthenticate if true the Endpoint with authenticate
     *            when a 401 (or associated authenication code) is received.
     * @param {Object}
     *            [options] Optional A hash of any options for the provider.
     * @param {String|Object}
     *            [options.data=null] Data, if any, that should be sent with
     *            the request.
     * @param {String|Object}
     *            [options.query=null] The query string, if any, that should
     *            be sent with the request.
     * @param {Object}
     *            [options.headers=null] The headers, if any, that should
     *            be sent with the request.
     * @param {Boolean}
     *            [options.preventCache=false] If true will send an extra
     *            query parameter to ensure the the server won't supply
     *            cached values.
     * @param {String}
     *            [options.method=GET] The HTTP method that should be used
     *            to send the request.
     * @param {Integer}
     *            [options.timeout=null] The number of milliseconds to wait
     *            for the response. If this time passes the request is
     *            canceled and the promise rejected.
     * @param {String}
     *            [options.handleAs=text] The content handler to process the
     *            response payload with.
     * @return {sbt.Promise}
     */
    request : function(url, options) {
        // rewrite the url if needed
        var qurl = url;
        if (qurl.indexOf("http") != 0) {
            if (this.proxy) {
                qurl = this.proxy.rewriteUrl(this.baseUrl, url, this.proxyPath);
            } else {
                qurl = pathUtil.concat(this.baseUrl, url);
            }
        }
        
        if (!options) {
        	options = { 
        	   	method : "GET", 
        	   	handleAs : "text"
        	};
        }
        options.name = this.name;
        
        var promise = new Promise();
        promise.response = new Promise();       

		var self = this;
		this.transport.request(qurl, options).response.then(function(response) {
			
			// Check for form based authentication
			if(self.authType == "form"){
				var authRequiredFlag = self._isAuthRequiredFormBasedEP(response, options);
					if(authRequiredFlag){
						self._authenticate(url, options, promise);
					}
			}
			
			promise.fulfilled(response.data);
			promise.response.fulfilled(response);
		}, function(error) {
			if (!error.message) {
				error.message = self.getErrorMessage(error.cause);
			}
			var authRequiredPromise = self._isAuthRequired(error, options);
			authRequiredPromise.then(
				function(response) {
					if (response) {
						self._authenticate(url, options, promise);
					} else {
						promise.rejected(error);
						promise.response.rejected(error);
					}
				}, 
				function(error) {
					promise.rejected(error);
					promise.response.rejected(error);
				}
			);
		});
        
        return promise;
    },
	
	/*
	 * Sends a request using XMLHttpRequest with the given URL and options.
	 * 
	 * @method xhr 
	 * @param {String} [method] The HTTP method to use to make the request. Must be uppercase. Default is 'GET'. 
	 * @param {Object} [args]
	 * 		@param {String} [args.url] 
	 * 		@param {Function} [args.handle] 
	 * 		@param {Function} [args.load] 
	 *  	@param {Function} [args.error] 
	 *  	@param {Boolean} [hasBody]
	 */
	xhr: function(method,args,hasBody) {
		var self = this;
		var _args = lang.mixin({},args);
		// We make sure that args has a 'url' member, with or without a proxy 
		if(!_args.url) {
			if(this.proxy) {
				_args.url = this.proxy.rewriteUrl(this.baseUrl,_args.serviceUrl,this.proxyPath);
			} else {
				_args.url = pathUtil.concat(this.baseUrl,_args.serviceUrl);
			}
		}
		// Make sure the initial methods are not called
		// seems that Dojo still call error(), even when handle is set
		delete _args.load; delete _args.error;
		_args.handle = function(data,ioArgs) {
			if(data instanceof Error) {
				var error = data;
				if(!error.message){
					error.message = self.getErrorMessage(error.cause);
				} 
				var isForbiddenErrorButAuthenticated = false;
				// check for if authentication is required
				if(error.code == 403 && self.authenticationErrorCode == 403){ 
					// case where 403 is configured to be treated similar to 401 (unAuthorized)
		        	// checking if we are getting 403 inspite of being already authenticated (eg. Get Public Files/Folders API on Smartcloud
		        	if(self.isAuthenticated){
		        		isForbiddenErrorButAuthenticated = true;
		        	}
		        }
				if ((error.code == 401)|| (!isForbiddenErrorButAuthenticated && error.code == self.authenticationErrorCode)) {
					var autoAuthenticate =  _args.autoAuthenticate || self.autoAuthenticate;
					if(autoAuthenticate == undefined){
						autoAuthenticate = true;
					}
					if(autoAuthenticate){
						if(self.authenticator) {
							options = {
								dialogLoginPage:self.loginDialogPage,
								loginPage:self.loginPage,
								transport:self.transport, 
								proxy: self.proxy,
								proxyPath: self.proxyPath,
								loginUi: _args.loginUi || self.loginUi,
								name: self.name,
								callback: function() {
									self.xhr(method,args,hasBody);
								}
							};
							if(self.authenticator.authenticate(options)) {
								return;
							}
						}
					}
				} 

                // notify handle and error callbacks is available
				self._notifyError(args, error, ioArgs);
			} else {
			    // notify handle and load callbacks is available
			    self._notifyResponse(args, data, ioArgs);
			}
		};	
		this.transport.xhr(method, _args, hasBody);
	},
	
	/*
	 * @method xhrGet
	 * @param args
	 */
	xhrGet: function(args) {
		this.xhr("GET",args);
	},
	
	/*
	 * @method xhrPost
	 * @param args
	 */
	xhrPost: function(args){
		this.xhr("POST", args, true); 
	},
	
	/*
	 * @method xhrPut
	 * @param args
	 */
	xhrPut: function(args){
		this.xhr("PUT", args, true);
	},
	
	/*
	 * @method xhrDelete
	 * @param args
	 */
	xhrDelete: function(args){
		this.xhr("DELETE", args);
	},
	
	/**
	 * authenticate to an endpoint
	 *
	 * @method authenticate
	 * @param {Object} [args]  Argument object
	 *		@param {boolean} [args.forceAuthentication] Whether authentication is to be forced in case user is already authenticated.
	 *		@param {String} [args.loginUi] LoginUi to be used for authentication. possible values are: 'popup', 'dialog' and 'mainWindow'
	 *		@param {String} [args.loginPage] login page to be used for authentication. this property should be used in case default
	 *		login page is to be overridden. This only applies to 'popup' and 'mainWindow' loginUi
	 *		@param {String} [args.dialogLoginPage] dialog login page to be used for authentication. this property should be used in
	 *		case default dialog login page is to be overridden. This only applies to 'dialog' loginUi.
	 */
	authenticate : function(args) {
		var promise = new Promise();
		args = args || {};
		if (args.forceAuthentication || !this.isAuthenticated) {
			var options = {
				dialogLoginPage : this.loginDialogPage,
				loginPage : this.loginPage,
				transport : this.transport,
				proxy : this.proxy,
				proxyPath : this.proxyPath,
				loginUi : args.loginUi || this.loginUi,
				name: this.name,
				callback: function(response) {
					promise.fulfilled(response);
				},
				cancel: function(response) {
					promise.rejected(response);
				}
			};
			this.authenticator.authenticate(options);
		} else {
			promise.fulfilled(true);
		}
		return promise;
	},
	
	/**
	 * Logout from an endpoint
	 *
	 * @method logout
	 * @param {Object} [args]  Argument object
	 */
	logout : function(args) {
		var promise = new Promise();
		args = args || {};
		var self = this;
		var actionURL = "";
		if (!args.actionUrl) {
			var proxy = this.proxy.proxyUrl;
			actionURL = proxy.substring(0, proxy.lastIndexOf("/")) + "/authHandler/" + this.proxyPath + "/logout";
		} else {
			actionURL = args.actionUrl;
		}
		this.transport.xhr('POST',{
			handleAs : "json",
			url : actionURL,
			load : function(response) {
				self.isAuthenticated = false;
				promise.fulfilled(response);
			},
			error : function(response) {
				self.isAuthenticated = false;
				promise.rejected(response);
			}
		}, true);		
		return promise;
	},
	
	/**
	 * Find whether endpoint is authenticated or not.
	 *
	 * @method isAuthenticated
	 * @param {Object} [args]  Argument object
	 */
	isAuthenticated : function(args) {
		var promise = new Promise();
		args = args || {};
		var self = this;
		var actionURL = "";
		if (!args.actionUrl) {
			var proxy = this.proxy.proxyUrl;
			actionURL = proxy.substring(0, proxy.lastIndexOf("/")) + "/authHandler/" + this.proxyPath + "/isAuth";
		} else {
			actionURL = args.actionUrl;
		}
		this.transport.xhr('POST',{
			handleAs : "json",
			url : actionURL,
			load : function(response) {
				self.isAuthenticated = true;
				promise.fulfilled(response);
			},
			error : function(response) {
				promise.rejected(response);
			}
		}, true);		
		return promise;
	},
	
	/**
	 Find whether endpoint authentication is valid or not.
	 
	 @method isAuthenticationValid
	 @param {Object} [args]  Argument object
			@param {Function} [args.load] This is the function which isAuthenticationValid invokes when 
			authentication information is retrieved.
			@param {Function} [args.error] This is the function which isAuthenticationValid invokes if an error occurs.
			result property in response object returns true/false depending on whether authentication is valid or not.
	*/
	isAuthenticationValid : function(args) {
		var promise = new Promise();
		args = args || {};
		var self = this;
		var actionURL = "";
		if (!args.actionUrl) {
			var proxy = this.proxy.proxyUrl;
			actionURL = proxy.substring(0, proxy.lastIndexOf("/")) + "/authHandler/" + this.proxyPath + "/isAuthValid";
		} else {
			actionURL = args.actionUrl;
		}
		this.transport.xhr('POST',{			
			handleAs : "json",
			url : actionURL,
			load : function(response) {				
				self.isAuthenticated = response.result;
				promise.fulfilled(response);
			},
			error : function(response) {
				promise.rejected(response);
			}
		}, true);
		return promise;
	},
	
	/**
	 * Creates a download URL for the given file URL so that the download
	 * request will go through the proxy.
	 * 
	 * @param string url	The actual URL to the file.
	 */
	rewriteUrl : function(url) {
		return this.proxy.rewriteUrl(this.baseUrl, url, this.proxyPath);
	},
	
	// Internal stuff goes here and should not be documented
	
    /*
     * Invoke error function with the error
     */
    _notifyError: function(args, error, ioArgs) {
        if (args.handle) {
            try {
                args.handle(error, ioArgs);
            } catch (ex) {
                // TODO log an error
                var msg = ex.message;
            }
        }
        if (args.error) {
            try {
                args.error(error, ioArgs);
            } catch (ex) {
                // TODO log an error
                var msg = ex.message;
            }
        }
    },
    
    /*
     * Invoke handle and/or load function with the response
     */
    _notifyResponse: function(args, data, ioArgs) {
        if (args.handle) {
            try {
                args.handle(data, ioArgs);
            } catch (ex) {
                // TODO log an error
                var msg = ex.message;
            }
        }
        if (args.load) {
            try {
                args.load(data, ioArgs);
            } catch (ex) {
                // TODO log an error
                var msg = ex.message;
            }
        }
    },

    /*
     * Invoke automatic authentication for the specified request.
     */
    _authenticate: function(url, options, promise) {
        var self = this;
        var authOptions = {
            dialogLoginPage: this.loginDialogPage,
            loginPage: this.loginPage,
            transport: this.transport, 
            proxy: this.proxy,
            proxyPath: this.proxyPath,
            actionUrl: options.actionUrl,
            loginUi: options.loginUi || this.loginUi,
            name: this.name,
            callback: function() {
                self.request(url, options).response.then(
                    function(response) {
                        promise.fulfilled(response.data);
                        promise.response.fulfilled(response);
                    }, function(error) {
                        promise.rejected(error);
                        promise.response.rejected(error);
                    }
                );
            },
            cancel: function() {
                self._authRejected = true;
                var error = new Error();
                error.message = "Authentication is required and has failed or has not yet been provided.";
                error.code = 401;
                promise.rejected(error);
                promise.response.rejected(error);
            }
        };
        
        return this.authenticator.authenticate(authOptions);
    },

    /*
     * Return true if automatic authentication is required. This method returns a promise with the success callback returning
	 * a boolean whether authentication is required. It first checks if the client is already authenticated
	 * and if yes, whether the authentication is valid. Else, it checks for the status code and other
	 * configuration paramters to decide if authentication is required.
     */
 	_isAuthRequired : function(error, options) {		
		var promise = new Promise();
		var status = error.response.status || null;
		var isAuthErr = status == 401 || status == this.authenticationErrorCode;
		if (this.isAuthenticated) {
			if (!isAuthErr) {
				promise.fulfilled(false);
			} else {
				this.isAuthenticationValid().then(
					function(response) {
						promise.fulfilled(!response.result);
					}, 
					function(response) {
						promise.rejected(response);
					}
				);
			}
		} else {
			// User can mention autoAuthenticate as part service wrappers call that is the args json variable or
			// as a property of endpoint in managed-beans.xml. 
			// isAutoAuth variable is true when autoAuthenticate property is true in args json variable or 
			// autoAuthenticate property in endpoint defination in managed-beans.xml is true. It is false otherwise.
			var isAutoAuth = options.autoAuthenticate || this.autoAuthenticate;
			if (isAutoAuth == undefined) {
				isAutoAuth = true;
			}
			// The response is returned as a boolean value as an argument to the success callback of the promise. This 
			// value is true when the error code is 401 or any authentication error code for a particular endpoint
			// (isAuthErr variable) and autoAuthenticate parameter is mentioned true (based on isAutoAuth variable)
			// and authenticator property the endpoint (could be js object of type Basic or OAuth)is defined and the 
			// authentication was not rejected earlier. 
			// It is false otherwise. The true value of this expression triggers the authentication process from the client.
			promise.fulfilled(isAuthErr && isAutoAuth && this.authenticator && !this._authRejected);
		}
		return promise;
	},
	
	/*
	 * Method ensures we trigger authentication for Smartcloud when response code is 200 and content is login page
	 */
	_isAuthRequiredFormBasedEP : function (response, options){
		if(response.status == 200 && response.getHeader("Content-Type") == "text/html"){
			return true;
		}else{
			return false;
		}
	},
	
    getErrorMessage: function(error) {    	
        var text = error.responseText || (error.response&&error.response.text) ;
        if (text) {
            try {            	
                var dom = xml.parse(text);
                var messages = dom.getElementsByTagName("message");
                if (messages && messages.length != 0) {                	
                    text = messages[0].text || messages[0].textContent;                	
                    text = lang.trim(text);
                }
            } catch(ex) {                
            }  
            var trimmedText = text.replace(/(\r\n|\n|\r)/g,"");
            if(!(trimmedText)){            	
            	return error.message;
            }else{
            	return text;
            }
        } else {
            return error;
        }
    },
    
    getProxyUrl: function(){
        return this.proxy.proxyUrl + "/" + this.proxyPath;
    },
    
    /**
     * Takes a url with a context root to replace, and returns a url with the context root replaced.
     * 
     * e.g. url: 'http://example.com/${replaceMe}'
     * If this endpoint has serviceMappings like:
     * {
     *  replaceMe: 'replacement'
     * }
     * 
     * returns 'http://example.com/replacement'
     * 
     * If there is no replacement available, the replacement will be the string inside the braces. e.g. 'http://example.com/replaceMe' will be returned.
     * 
     * @method modifyUrlContextRoot
     * 
     * @param {String} url 
     * @param {Object} [defaultContextRootMap] If specified, this object will be used for replacements in the event there is no equivalent serviceMapping object.
     */
    modifyUrlContextRoot: function(url, defaultContextRootMap){
        var defaultMap = defaultContextRootMap ? {} : lang.mixin({}, defaultContextRootMap);
        var map = lang.mixin(defaultMap, this.serviceMapping);
        
        return stringUtil.transform(url, map, function(value, key){
            if(!value){
                return key;
            }
            else{
                return value;
            }
        }, this);
    }
	
});

return Endpoint;
});

},
'sbt/Portlet':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Portlet specific helpers.
 */
define([],function() {

sbt.getUserPref = function(ns,name) {
	
}

});
},
'sbt/connections/CommunityService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Communities API allows application programs to retrieve community information, subscribe to community updates, and create or modify communities.
 * 
 * @module sbt.connections.CommunityService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./CommunityConstants", "./ConnectionsService",
         "../base/AtomEntity", "../base/XmlDataHandler", "./ForumService", "./BookmarkService", "../pathUtil" ], 
    function(declare,config,lang,stringUtil,Promise,consts,ConnectionsService,AtomEntity,XmlDataHandler,ForumService,BookmarkService,pathUtil) {

	var CategoryCommunity = "<category term=\"community\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var CategoryMember = "<category term=\"person\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var CategoryInvite = "<category term=\"invite\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var CategoryEvent = "<category term=\"event\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
    
	var IsExternalTmpl = "<snx:isExternal>${isExternal}</snx:isExternal>";
    var CommunityTypeTmpl = "<snx:communityType>${getCommunityType}</snx:communityType>";
    var CommunityUuidTmpl = "<snx:communityUuid xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\">${getCommunityUuid}</snx:communityUuid><id>instance?communityUuid=${getCommunityUuid}</id> ";
    var CommunityThemeTmpl = "<snx:communityTheme xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\" snx:uuid=\"default\">${getCommunityTheme}</snx:communityTheme>";
    var RoleTmpl = "<snx:role xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\" component=\"http://www.ibm.com/xmlns/prod/sn/communities\">${getRole}</snx:role>";
    
    /*
     * CommunityDataHandler class.
     */
    var CommunityDataHandler = declare(XmlDataHandler, {
        /**
         * @method getEntityId
         * @returns
         */
        getEntityId : function() {
            var entityId = stringUtil.trim(this.getAsString("uid"));
            return extractCommunityUuid(this.service, entityId);
        }
    });
    
    /**
     * Community class represents an entry for a Community feed returned by the
     * Connections REST API.
     * 
     * @class Community
     * @namespace sbt.connections
     */
    var Community = declare(AtomEntity, {

    	xpath : consts.CommunityXPath,
    	namespaces : consts.CommunityNamespaces,
    	categoryScheme : CategoryCommunity,
    	    	
        /**
         * Construct a Community entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Create the DataHandler for this entity.
         * 
         * @method createDataHandler
         */
        createDataHandler : function(service, data, response, namespaces, xpath) {
        	return new CommunityDataHandler({
                service : service,
                data : data,
                namespaces : namespaces,
                xpath : xpath
            });
        },
        
        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	var postData = "";
            var transformer = function(value,key) {
                return value;
            };
            postData += stringUtil.transform(CommunityTypeTmpl, this, transformer, this);
            postData += stringUtil.transform(IsExternalTmpl, this, transformer, this);
        	if (this.getCommunityUuid()) {
                postData += stringUtil.transform(CommunityUuidTmpl, this, transformer, this);
        	}
        	if (this.getCommunityTheme()) {
                postData += stringUtil.transform(CommunityThemeTmpl, this, transformer, this);
        	}
            return stringUtil.trim(postData);
        },
        
        /**
         * Return the value of IBM Connections community ID from community ATOM
         * entry document.
         * 
         * @method getCommunityUuid
         * @return {String} Community ID of the community
         */
        getCommunityUuid : function() {
            var communityUuid = this.getAsString("communityUuid");
            return extractCommunityUuid(this.service, communityUuid);
        },

        /**
         * Sets id of IBM Connections community.
         * 
         * @method setCommunityUuid
         * @param {String} communityUuid Id of the community
         */
        setCommunityUuid : function(communityUuid) {
            return this.setAsString("communityUuid", communityUuid);
        },

        /**
         * Return the community type of the IBM Connections community from
         * community ATOM entry document.
         * 
         * @method getCommunityType
         * @return {String} Type of the Community
         */
        getCommunityType : function() {
            var type = this.getAsString("communityType");
            if (!type) {
            	type = consts.Restricted;
            }
            return type;
        },

        /**
         * Set the community type of the IBM Connections community.
         * 
         * @method setCommunityType
         * @param {String} Type of the Community
         */
        setCommunityType : function(communityType) {
            return this.setAsString("communityType", communityType);
        },

        /**
         * Return the community theme of the IBM Connections community from
         * community ATOM entry document.
         * 
         * @method getCommunityTheme
         * @return {String} Theme of the Community
         */
        getCommunityTheme : function() {
            return this.getAsString("communityTheme");
        },

        /**
         * Set the community theme of the IBM Connections community.
         * 
         * @method setCommunityTheme
         * @param {String} Theme of the Community
         */
        setCommunityTheme : function(communityTheme) {
            return this.setAsString("communityTheme", communityTheme);
        },

        /**
         * Return the external of the IBM Connections community from
         * community ATOM entry document.
         * 
         * @method isExternal
         * @return {Boolean} External flag of the Community
         */
        isExternal : function() {
            return this.getAsBoolean("isExternal");
        },

        /**
         * Set the external flag of the IBM Connections community.
         * 
         * @method setExternal
         * @param {Boolean} External flag of the Community
         */
        setExternal : function(external) {
            return this.setAsBoolean("isExternal", external);
        },

        /**
         * Return tags of IBM Connections community from community ATOM entry
         * document.
         * 
         * @method getTags
         * @return {Object} Array of tags of the community
         */
        getTags : function() {
            return this.getAsArray("tags");
        },

        /**
         * Set new tags to be associated with this IBM Connections community.
         * 
         * @method setTags
         * @param {Object} Array of tags to be added to the community
         */

        setTags : function(tags) {
            return this.setAsArray("tags", tags);
        },

        /**
         * Return the value of IBM Connections community URL from community ATOM
         * entry document.
         * 
         * @method getCommunityUrl
         * @return {String} Community URL of the community
         * @deprecated Use getAlternateUrl instead
         */
        getCommunityUrl : function() {
            return this.getAlternateUrl();
        },

        /**
         * Return the value of IBM Connections community Logo URL from community
         * ATOM entry document.
         * 
         * @method getLogoUrl
         * @return {String} Community Logo URL of the community
         */
        getLogoUrl : function() {
            return this.getAsString("logoUrl");
        },

        /**
         * Return the member count of the IBM Connections community from
         * community ATOM entry document.
         * 
         * @method getMemberCount
         * @return {Number} Member count for the Community
         */
        getMemberCount : function() {
            return this.getAsNumber("memberCount");
        },

        /**
         * Get a list for forum topics that includes the topics in this community.
         * 
         * @method getForumTopics
         * @param {Object} args
         */
        getForumTopics : function(args) {
        	return this.service.getForumTopics(this.getCommunityUuid(), args);
        },
        
        /**
         * Create a forum topic by sending an Atom entry document containing the 
         * new forum to the forum replies resource.
         * 
         * @method createForumTopic
         * @param {Object} forumTopic Forum topic object which denotes the forum topic to be created.
         * @param {Object} [args] Argument object
         */
        createForumTopic : function(communityUuid, topicOrJson, args) {
            if(!lang.isString(communityUuid)){
                args = topicOrJson;
                topicOrJson = communityUuid;
            }
        	return this.service.createForumTopic(topicOrJson, args);
        },
        
        /**
         * Get sub communities of a community.
         * 
         * @method getSubCommunities
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
         */
        getSubCommunities : function(args) {
            return this.service.getSubCommunities(this.getCommunityUuid(), args);
        },

        /**
         * Get members of this community.
         * 
         * @method getMembers
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
         */
        getMembers : function(args) {
            return this.service.getMembers(this.getCommunityUuid(), args);
        },

        /**
         * Add member to a community
         * 
         * @method addMember
         * @param {Object} [args] Argument object
         * @param {Object} [args.member] Object representing the member to be added
         * @param {String} [args.email] Object representing the email of the memeber to be added
         * @param {String} [args.id] String representing the id of the member to be added
         */
        addMember : function(member,args) {
            return this.service.addMember(this.getCommunityUuid(), member, args);
        },

        /**
         * Remove member of a community
         * 
         * @method removeMember
         * @param {String} Member id of the member 
         * @param {Object} [args] Argument object
         */
        removeMember : function(memberId,args) {
            return this.service.removeMember(this.getCommunityUuid(), memberId, args);
        },
        
        /**
         * Loads a member object with the atom entry associated with the
         * member of the community. By default, a network call is made to load the atom entry
         * document in the member object.
         * 
         * @method getMember
         * @param {String} member id of the member.
         * @param {Object} [args] Argument object
         */
        getMember : function(memberId, args) {
        	return this.service.getMember(this.getCommunityUuid(), memberId, args);
        },
        
        /**
         * Get a list of the outstanding community invitations for the specified community. 
         * The currently authenticated user must be an owner of the community.
         * 
         * @method getAllInvites
         * @param {Object} [args]
         */
        getAllInvites : function(args) {
        	return this.service.getAllInvites(this.getCommunityUuid(), args);
        },

        /**
         * Get the list of community forums.
         * 
         * @method getForums
         * @param {Object} [args] Argument object
         */
        getForums : function(args) {
        	var forumService = this.service.getForumService();
        	var requestArgs = lang.mixin(args || {}, { communityUuid : this.getCommunityUuid() });
        	return forumService.getForums(requestArgs);
        },
        
        /**
         * Loads the community object with the atom entry associated with the
         * community. By default, a network call is made to load the atom entry
         * document in the community object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var communityUuid = this.getCommunityUuid();
            var promise = this.service._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service, data, response) {
                	self.setData(data, response);
                    return self;
                }
            };

            var requestArgs = lang.mixin(
            	{ communityUuid : communityUuid }, 
            	args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            return this.service.getEntity(consts.AtomCommunityInstance, options, communityUuid, callbacks);
        },

        /**
         * Remove this community
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteCommunity(this.getCommunityUuid(), args);
        },

        /**
         * Update this community
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateCommunity(this, args);
        },
        
        /**
         * Save this community
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getCommunityUuid()) {
                return this.service.updateCommunity(this, args);
            } else {
                return this.service.createCommunity(this, args);
            }
        }
        
    });

    /**
     * Member class represents an entry for a Member feed returned by the
     * Connections REST API.
     * 
     * @class Member
     * @namespace sbt.connections
     */
    var Member = declare(AtomEntity, {

    	xpath : consts.MemberXPath,
    	namespaces : consts.CommunityNamespaces,
    	categoryScheme : CategoryMember,
    	    	
        /**
         * The UUID of the community associated with this Member
         */
        communityUuid : null,

        /**
         * Constructor for Member entity
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.getRole()) {
                this.setRole(consts.Member);
            }
        },

        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	var postData = "";
            var transformer = function(value,key) {
                return value;
            };
            postData += stringUtil.transform(RoleTmpl, this, transformer, this);
            return stringUtil.trim(postData);
        },
        
        /**
         * Return the community UUID.
         * 
         * @method getCommunityUuid
         * @return {String} communityUuid
         */
        getCommunityUuid : function() {
            return this.communityUuid;
        },

        /**
         * Return the community member name.
         * 
         * @method getName
         * @return {String} Community member name
         */

        getName : function() {
            return this.getAsString("contributorName");
        },

        /**
         * Set the community member name.
         * 
         * @method setName
         * @param {String} Community member name
         */

        setName : function(name) {
            return this.setAsString("contributorName", name);
        },

        /**
         * Return the community member userId.
         * 
         * @method getUserid
         * @return {String} Community member userId
         */
        getUserid : function() {
            return this.getAsString("contributorUserid");
        },

        /**
         * Set the community member userId.
         * 
         * @method getId
         * @return {String} Community member userId
         */
        setUserid : function(userid) {
            return this.setAsString("contributorUserid", userid);
        },

        /**
         * Return the community member email.
         * 
         * @method getName
         * @return {String} Community member email
         */
        getEmail : function() {
            return this.getAsString("contributorEmail");
        },

        /**
         * Return the community member email.
         * 
         * @method getName
         * @return {String} Community member email
         */

        setEmail : function(email) {
            return this.setAsString("contributorEmail", email);
        },

        /**
         * Return the value of community member role from community member ATOM
         * entry document.
         * 
         * @method getRole
         * @return {String} Community member role
         */
        getRole : function() {
            return this.getAsString("role");
        },

        /**
         * Sets role of a community member
         * 
         * @method setRole
         * @param {String} role Role of the community member.
         */
        setRole : function(role) {
            return this.setAsString("role", role);
        },
        
        /**
         * Loads the member object with the atom entry associated with the
         * member. By default, a network call is made to load the atom entry
         * document in the member object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var communityUuid = this.communityUuid;
            var promise = this.service._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service, data, response) {
                    self.setData(data, response);
                    return self;
                }
            };

            var requestArgs = {
                communityUuid : communityUuid
            };
            var memberId = null;
            if (this.getUserid()) {
                memberId = requestArgs.userid = this.getUserid();
            } else {
                memberId = requestArgs.email = this.getEmail();
            }
            requestArgs = lang.mixin(requestArgs, args || {});
            var options = {
                handleAs : "text", 
                query : requestArgs
            };

            return this.service.getEntity(consts.AtomCommunityMembers, options, memberId, callbacks);
        },
        
        /**
         * Remove this member from the community.
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
        	var memberId = this.getUserid() || this.getEmail();
            return this.service.removeMember(this.getCommunityUuid(), memberId, args);
        }

    });

    /**
     * Invite class represents an entry for a Invite feed returned by the
     * Connections REST API.
     * 
     * @class Invite
     * @namespace sbt.connections
     */
    var Invite = declare(AtomEntity, {

    	xpath : consts.InviteXPath,
    	namespaces : consts.CommunityNamespaces,
    	categoryScheme : CategoryInvite,
    	    	
        /**
         * The UUID of the community associated with this Invite
         */
        communityUuid : null,

        /**
         * The UUID if the invitee associated with this Invite
         */
        inviteeUuid : null,

        /**
         * Constructor for Invite
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            this.inherited(arguments, [ args ]);
        },

        /**
         * Return the value of IBM Connections invite ID from invite ATOM
         * entry document.
         * 
         * @method getInviteUuid
         * @return {String} Invite ID of the invite
         */
        getInviteUuid : function() {
            var inviteUuid = this.getAsString("inviteUuid");
            return extractInviteUuid(inviteUuid);
        },

        /**
         * Sets id of IBM Connections invite.
         * 
         * @method setInviteUuid
         * @param {String} inviteUuid Id of the invite
         */
        setInviteUuid : function(inviteUuid) {
            return this.setAsString("inviteUuid", inviteUuid);
        },

        /**
         * Set the community UUID.
         * 
         * @method setCommunityUuid
         * @return {String} communityUuid
         */
        setCommunityUuid : function(communityUuid) {
			this.communityUuid = communityUuid;
			return this;
        },
        
        /**
         * Return the community UUID.
         * 
         * @method getCommunityUuid
         * @return {String} communityUuid
         */
        getCommunityUuid : function() {
        	if (!this.communityUuid) {
				this.communityUuid = this.service.getUrlParameter(this.getAsString("communityUrl"), "communityUuid");
			} 
			return this.communityUuid;
        },
        
        /**
         * Set the invitee UUID.
         * 
         * @method setInviteeUuid
         * @return {String} inviteeUuid
         */
        setInviteeUuid : function(inviteeUuid) {
			this.inviteeUuid = inviteeUuid;
			return this;
        },
        
        /**
         * Return the value of IBM Connections invitee ID from invite ATOM
         * entry document.
         * 
         * @method getInviteeUuid
         * @return {String} Invitee ID of the invite
         */
        getInviteeUuid : function() {
        	if (!this.inviteeUuid) {
            	var inviteUuid = this.getInviteUuid();
            	this.inviteeUuid = extractInviteeUuid(inviteUuid, this.getCommunityUuid());
        	}
        	return this.inviteeUuid;
        },

        /**
         * Set the user id of the invitee.
         * 
         * @method setUserid
         * @return {String} userid
         */
        setUserid : function(userid) {
        	return this.setAsString("contributorUserid", userid);
        },
        
        /**
         * Return the user id of the invitee.
         * 
         * @method getUserid
         * @return {String} userid
         */
        getUserid : function() {
        	return this.getAsString("contributorUserid");
        },
        
        /**
         * Set the email of the invitee.
         * 
         * @method setEmail
         * @return {String} email
         */
        setEmail : function(email) {
        	return this.setAsString("contributorEmail", email);
        },
        
        /**
         * Return the email of the invitee.
         * 
         * @method getEmail
         * @return {String} email
         */
        getEmail : function() {
        	return this.getAsString("contributorEmail");
        },
        
        /**
         * Loads the invite object with the atom entry associated with the
         * invite. By default, a network call is made to load the atom entry
         * document in the invite object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var communityUuid = this.getCommunityUuid();
            var promise = this.service._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }
            var userid = this.getInviteeUuid();
            promise = this.service._validateUserid(userid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service, data, response) {
                    self.setData(data, response);
                    return self;
                }
            };

            var requestArgs = lang.mixin({
                communityUuid : communityUuid,
                userid : userid
            }, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            return this.service.getEntity(consts.AtomCommunityInvites, options, communityUuid + "-" + userid, callbacks);
        },

        /**
         * Remove this invite
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.removeInvite(this, args);
        },

        /**
         * Update this invite
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateInvite(this, args);
        },
        
        /**
         * Save this invite
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getInviteUuid()) {
                return this.service.updateInvite(this, args);
            } else {
                return this.service.createInvite(this, args);
            }
        }        

    });
    
    
    /**
     * Event class represents an entry from an Events feed returned by the Connections REST API. 
     * 
     * An Event may repeat and have multiple EventInsts (instances of the event). 
     * 
     * e.g. If an event has repeats set so that it happens on 5 different days it has 5 EventInsts, but the Event is still the same.
     * 
     * @class Event
     * @namespace sbt.connections
     */
    var Event = declare(AtomEntity, {

        /**
         * Constructor for Event.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * The Uuid of the event. This is per event rather than per event instance. 
         * 
         * e.g. if an event spans multiple days it will have multiple instances, yet each even will have the same Uuid.
         * @method getEventUuid
         * @return {String} Uuid of the event.
         */
        getEventUuid : function(){
            return this.getAsString("eventUuid");
        },
        
        /**
         * @method getLocation
         * @return {String} The location of the event
         */
        getLocation : function(){
            return this.getAsString("location");
        },
        
        /**
         * @method getAllDay
         * @return {Boolean} True if event lasts entire day, false otherwise.
         */
        getAllDay : function(){
            return this.getAsString("allDay") !== 0;
        },
        
        /**
         * 
         * @method getSelfLink
         * @return {String} Link to the atom representation of this object
         */
        getSelfLink : function(){
            return this.getAsString("selfLink");
        },
        
        /**
         * Gets the source, usually the community it was created in. 
         * Contains id of source, title and a link to the web representation of the source.
         * {id:"", title: "", link:""}
         * 
         * @method getSource
         * @return {Object} 
         */
        getSource : function(){
            return this.getAsObject(
                    [ "id", "title", "link"],
                    [ "id", "title", "link"]);
        },
        
        /**
         * Gets the recurrence information of the event. This information is not available in individual event instances.
         * 
         * Recurrence information object consists of:
         * frequency - 'daily' or 'weekly'
         * interval - Week interval. Value is int between 1 and 5. (e.g. repeats every 2 weeks). null if daily.
         * until - The end date of the repeating event.
         * allDay - 1 if an all day event, 0 otherwise.
         * startDate - Start time of the event
         * endDate - End time of the event
         * byDay - Days of the week this event occurs, possible values are: SU,MO,TU,WE,TH,FR,SA
         * 
         * @method getRecurrence
         * @return {Object} An object containing the above recurrence information of the community event.
         */
        getRecurrence : function() {
            return this.getAsObject(
                    [ "frequency", "interval", "until", "allDay", "startDate", "endDate", "byDay" ],
                    [ "frequency", "interval", "until", "allDay", "startDate", "endDate", "byDay" ]);
        },
        
        /**
         * @method getContainerLink
         * @return {String} Link to the container on the web, i.e. the community
         */
        getCommunityLink : function(){
            this.getAsString("communityLink");
        },
        
        /**
         * Return the community UUID.
         * 
         * @method getCommunityUuid
         * @return {String} communityUuid
         */
        getCommunityUuid : function() {
            return this.getAsString("communityUuid");
        }
    });
    
    /**
     * EventInst class represents an entry for an EventInsts feed returned by the Connections REST API. EventInsts all have a parent Event.
     * 
     * @class EventInst
     * @namespace sbt.connections
     */
    var EventInst = declare(Event, {
        /**
         * Constructor for Event instance.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * The event instance uuid. This is per event instance, rather than per event. 
         * e.g. if an event spans multiple days each day will have its own eventInstUuid.
         * 
         * Can be used with the{{#crossLink "CommunityService/getEvent:method"}}{{/crossLink}} method to retrieve event instances.
         * @method getEventInstUuid
         * @return {String} Uuid of the event instance.
         */
        getEventInstUuid : function(){
            return this.getAsString("eventInstUuid");
        },
        
        /**
         * @method getFollowed
         * @return {Boolean} True if the current authenticated user is following this event Instance
         */
        getFollowed : function(){
            return this.getAsString("followed");
        },
        
        /**
         * @method getAttended
         * @return {Boolean} True if the current authenticated user is attending this event Instance
         */
        getAttended : function(){
            return this.getAsString("attended");
        },
        
        /**
         * @method getParentEventId
         * @return {String} The id of the parent event of this event instance.
         */
        getParentEventId : function(){
            return this.getAsString("parentEventId");
        },
        
        /**
         * @method getParentEventLink
         * @return {String} The link to the parent event's atom representation.
         */
        getParentEventLink : function(){
            return this.getAsString("parentEventLink");
        },
        
        /**
         * @method getStartDate
         * @return The date the event instance starts
         */
        getStartDate : function(){
            return this.getAsString("instStartDate");
        },
        
        /**
         * @method getEndDate
         * @return The date the event instance ends
         */
        getEndDate : function(){
            return this.getAsString("instEndDate");
        }        
    });

    /*
     * Method used to extract the community uuid for an id url.
     */
    var extractCommunityUuid = function(service, uid) {
        if (uid && uid.indexOf("http") == 0) {
            return service.getUrlParameter(uid, "communityUuid");
        } else {
            return uid;
        }
    };
    
    /*
     * Method used to extract the invite uuid for an id url.
     */
    var extractInviteUuid = function(uid) {
    	if (uid && uid.indexOf("urn:lsid:ibm.com:communities:invite-") == 0) {
            return uid.substring("urn:lsid:ibm.com:communities:invite-".length);
        } else {
            return uid;
        }
    };
    
    /*
     * Method used to extract the invitee uuid for an id url.
     */
    var extractInviteeUuid = function(uid, communityUuid) {
    	if (uid && uid.indexOf(communityUuid) == 0) {
            return uid.substring(communityUuid.length + 1);
        } else {
            return uid;
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains Community entries.
     */
    var CommunityFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new CommunityDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Community({
                service : service,
                data : data,
                response: response
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains Member entries.
     */
    var MemberFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains Invite entries.
     */
    var InviteFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Invite({
                service : service,
                data : data,
                response: response
            });
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains Event entries.
     */
    var ConnectionsEventFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.EventXPath
            });
            return new Event({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains EventInst entries.
     */
    var ConnectionsEventInstFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.EventXPath
            });
            return new EventInst({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    var ConnectionsEventInstCallbacks = {
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.EventXPath
            });
            return new EventInst({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
        
    /*
     * Callbacks used when reading an entry that contains a Community.
     */
    var CommunityCallbacks = {
        createEntity : function(service,data,response) {
            return new Community({
                service : service,
                data : data,
                response: response
            });
        }
    };
    
    /*
     * Callbacks used when reading an feed that contains community forum topics.
     */
    var ForumTopicFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.CommunityFeedXPath
            });
        },
        createEntity : function(service, data, response) {
        	var forumService = service.getForumService();
        	var forumTopic = forumService.newForumTopic({});
        	forumTopic.setData(data, response);
            return forumTopic;
        }
    };

    /**
     * CommunityService class.
     * 
     * @class CommunityService
     * @namespace sbt.connections
     */
    var CommunityService = declare(ConnectionsService, {
    	
    	forumService : null,
    	bookmarkService : null,
    	
    	contextRootMap: {
            communities: "communities"
        },
        
        serviceName : "communities",

        /**
         * Constructor for CommunityService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        	if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Return a ForumService instance
         * 
         * @method getForumService
         * @returns {ForumService}
         */
        getForumService : function() {
        	if (!this.forumService) {
        		this.forumService = new ForumService();
        		this.forumService.endpoint = this.endpoint;
        	}
        	return this.forumService;
        },
        
        /**
         * Return a BookmarkService instance
         * 
         * @method getBookmarkService
         * @returns {BookmarkService}
         */
        getBookmarkService : function() {
        	if (!this.bookmarkService) {
        		this.bookmarkService = new BookmarkService();
        		this.bookmarkService.endpoint = this.endpoint;
        	}
        	return this.bookmarkService;
        },
        
        /**
         * Get the All Communities feed to see a list of all public communities to which the 
         * authenticated user has access or pass in parameters to search for communities that 
         * match a specific criteria.
         * 
         * @method getPublicCommunities
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my communities. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getPublicCommunities : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomCommunitiesAll, options, CommunityFeedCallbacks);
        },

        /**
         * Get the My Communities feed to see a list of the communities to which the 
         * authenticated user is a member or pass in parameters to search for a subset 
         * of those communities that match a specific criteria.
         * 
         * @method getMyCommunities
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of my communities. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getMyCommunities : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomCommunitiesMy, options, CommunityFeedCallbacks);
        },

        /**
         * Retrieve the members feed to view a list of the members who belong 
         * to a given community.
         * 
         * @method getMembers
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
         */
        getMembers : function(communityUuid,args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({
                communityUuid : communityUuid
            }, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            var callbacks = lang.mixin({
                createEntity : function(service,data,response) {
                    return new Member({
                        service : service,
                        communityUuid : communityUuid,
                        data : data,
                        response: response
                    });
                }
            }, MemberFeedCallbacks);
            
            return this.getEntities(consts.AtomCommunityMembers, options, callbacks);
        },

        /**
         * Retrieve the member entry to view a member who belongs to a given community.
         * 
         * @method getMember
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
         */
        getMember : function(communityUuid,memberId,args) {
            var member = new Member({
                service : this,
                communityUuid : communityUuid
            });
            
            if (this.isEmail(memberId)) {
                member.setEmail(memberId);
            } else {
                member.setUserid(memberId);
            }
            
            return member.load(args);
        },
        
        /**
         * Given the eventUuid, get the instances of that event.
         * 
         * @param eventUuid The uuid of the Event
         * @return {Object} Promise which resolves with the array of event Instances.
         */
        getEventInsts : function(eventUuid){
            var promise = this._validateEventUuid(eventUuid);
            if (promise) {
                return promise;
            }
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : {
                    eventUuid : eventUuid,
                    mode : "list"
                }
            };
                
            return this.getEntities(consts.AtomCommunityEvents, options, ConnectionsEventInstFeedCallbacks);
        },
        
        /*
         * here since getCommunityEvents and getCommunityEventInsts use the same logic.
         */
        _getCommunityEvents : function(communityUuid, startDate, endDate, args, callbacks){
            var promise = this._validateCommunityUuid(communityUuid) || this._validateDateTimes(startDate, endDate);
            if (promise) {
                return promise;
            }
            var requiredArgs = {
                calendarUuid : communityUuid
            };
            if(startDate){
                lang.mixin(requiredArgs, {
                    startDate : startDate
                });
            } 
            if(endDate){
                lang.mixin(requiredArgs, {
                    endDate : endDate
                });
            }
            
            args = lang.mixin(args, requiredArgs);
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomCommunityEvents, options, callbacks);
        },
        
        /**
         * Get the Event instances for a community. See {{#crossLink "CommunityConstants/AtomCommunityEvents:attribute"}}{{/crossLink}} for a complete listing of parameters.
         * 
         * These results do not include all details of the event instance, such as the full description. A summary is available in that case. UseEventInst.getFullEvent to get the full details.
         * 
         * @param communityId The uuid of the Community.
         * @param startDate Include events that end after this date.
         * @param endDate Include events that end before this date.
         * @param args url parameters.
         * 
         * @return {Object} Promise which resolves with the array of event instances.
         */
        getCommunityEventInsts : function(communityUuid, startDate, endDate, args){
            return this._getCommunityEvents(communityUuid, startDate, endDate, args, ConnectionsEventInstFeedCallbacks);
        },
        
        /**
         * Get the events of a community. Each event can have multiple event instances.
         * 
         * @method getCommunityEvents
         * @return {Object} Promise which resolves with the array of event instances.
         */
        getCommunityEvents : function(communityUuid, startDate, endDate, args){
            return this._getCommunityEvents(communityUuid, startDate, endDate, lang.mixin(args, {type: "event"}), ConnectionsEventFeedCallbacks);
        },
        
        /**
         * Used to get the event Inst with the given eventInstUuid. 
         * 
         * This will include all details of the event, including its content. 
         * 
         * @param eventInstUuid - The id of the event, also used as an identifier when caching the response
         * @returns
         */
        getEventInst : function(eventInstUuid){
            var options = {
                method : "GET",
                handleAs : "text",
                query : {
                    eventInstUuid: eventInstUuid
                }
            };
                
            return this.getEntity(consts.AtomCommunityEvents, options, eventInstUuid, ConnectionsEventInstCallbacks);
        },
        
        /**
         * Get a list of the outstanding community invitations of the currently authenticated 
         * user or provide parameters to search for a subset of those invitations.
         * 
         * @method getMyInvites
         * @param {Object} [args] 
         */
        getMyInvites : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomCommunityInvitesMy, options, InviteFeedCallbacks);
        },      

        /**
         * Get a list of the outstanding community invitations for the specified community. 
         * The currently authenticated user must be an owner of the community.
         * 
         * @method getAllInvites
         * @param communityUuid
         * @param {Object} [args]
         */
        getAllInvites : function(communityUuid, args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin({
                communityUuid : communityUuid
            }, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomCommunityInvites, options, InviteFeedCallbacks);
        },      

        /**
         * Get a list of subcommunities associated with a community.
         * 
         * @method getSubCommunities
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of members of a
         * community. The parameters must be exactly as they are
         * supported by IBM Connections like ps, sortBy etc.
         */
        getSubCommunities : function(communityUuid,args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin({
                communityUuid : communityUuid
            }, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomCommunitySubCommunities, options, CommunityFeedCallbacks);
        },

        /**
         * Get a list for forum topics for the specified community.
         * 
         * @method getForumTopics
         * @param communityUuid
         * @param args
         * @returns
         */
        getForumTopics: function(communityUuid, args) {
            return this.getForumService().getCommunityForumTopics(communityUuid, args);
        },
        
        /**
         * Create a Community object with the specified data.
         * 
         * @method newCommunity
         * @param {Object} args Object containing the fields for the 
         * new Community 
         */
        newCommunity : function(args) {
            return this._toCommunity(args);
        },
        
        /**
         * Create a Member object with the specified data.
         * 
         * @method newMember
         * @param {Object} args Object containing the fields for the 
         * new Member 
         */
        newMember : function(args) {
            return this._toMember(args);
        },
        
        /**
         * Create a Invite object with the specified data.
         * 
         * @method newInvite
         * @param {String} communityUuid
         * @param {Object} args Object containing the fields for the 
         * new Invite 
         */
        newInvite : function(communityUuid,args) {
            return this._toInvite(communityUuid,args);
        },
        
        /**
         * Retrieve a community entry, use the edit link for the community entry 
         * which can be found in the my communities feed.
         * 
         * @method getCommunity
         * @param {String } communityUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Communities REST API) 
         */
        getCommunity : function(communityUuid, args) {
            var community = new Community({
                service : this,
                _fields : { communityUuid : communityUuid }
            });
            return community.load(args);
        },

        /**
         * Create a community by sending an Atom entry document containing the 
         * new community to the My Communities resource.
         * 
         * @method createCommunity
         * @param {Object} community Community object which denotes the community to be created.
         * @param {Object} [args] Argument object
         */
        createCommunity : function(communityOrJson,args) {
            var community = this._toCommunity(communityOrJson);
            var promise = this._validateCommunity(community, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                var communityUuid = this.getLocationParameter(response, "communityUuid");
                community.setCommunityUuid(communityUuid);
                return community;
            };

            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : community.createPostData()
            };
            
            return this.updateEntity(consts.AtomCommunitiesMy, options, callbacks, args);
        },

        /**
         * Update a community by sending a replacement community entry document in Atom format 
         * to the existing community's edit web address.
         * All existing community entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a community entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateCommunity
         * @param {Object} community Community object
         * @param {Object} [args] Argument object
         */
        updateCommunity : function(communityOrJson,args) {
            var community = this._toCommunity(communityOrJson);
            var promise = this._validateCommunity(community, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service, data, response) {
            	// preserve the communityUuid
            	var communityUuid = community.getCommunityUuid();
            	if (data) {
                	community.setData(data, response);
            	}
            	community.setCommunityUuid(communityUuid);
                return community;
            };

            var requestArgs = lang.mixin({
                communityUuid : community.getCommunityUuid()
            }, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : community.createPostData()
            };
            
            return this.updateEntity(consts.AtomCommunityInstance, options, callbacks, args);
        },

        /**
         * Delete a community, use the HTTP DELETE method.
         * Only the owner of a community can delete it. Deleted communities cannot be restored
         * 
         * @method deleteCommunity
         * @param {String/Object} community id of the community or the community object (of the community to be deleted)
         * @param {Object} [args] Argument object
         */
        deleteCommunity : function(communityUuid,args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
                communityUuid : communityUuid
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomCommunityInstance, options, communityUuid);
        },

        /**
         * Add member to a community
         * 
         * @method addMember
         * @param {String/Object} community id of the community or the community object.
         * @param {Object} member member object representing the member of the community to be added
         * @param {Object} [args] Argument object
         */
        addMember : function(communityUuid,memberOrId,args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }
            var member = this._toMember(memberOrId);
            promise = this._validateMember(member);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                var userid = this.getLocationParameter(response, "userid");
                member.setUserid(userid);
                member.communityUuid = communityUuid;
                return member;
            };

            var requestArgs = lang.mixin({
                communityUuid : communityUuid
            }, args || {});
            var options = {
                method : "POST",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : member.createPostData()
            };
            
            return this.updateEntity(consts.AtomCommunityMembers, options, callbacks, args);
        },
        
		/**
		 * Updates a member in the access control list for an application, sends a replacement member entry document in Atom format to the existing ACL
		 * node's edit web address.
		 * @method updateMember
		 * @param {String} activityUuid
		 * @param {Object} memberOrJson
		 */
		updateMember : function(communityUuid, memberOrJson, args) {
			var promise = this.validateField("communityUuid", communityUuid);
			if (promise) {
				return promise;
			}
			var member = this._toMember(memberOrJson);
			promise = this._validateMember(member, true, true);
			if (promise) {
				return promise;
			}

			var requestArgs = {
	                communityUuid : communityUuid
	        };
	        var key = member.getEmail() ? "email" : "userid";
	        var value = member.getEmail() ? member.getEmail() : member.getUserid();
	        requestArgs[key] = value;
	        requestArgs = lang.mixin(requestArgs, args || {});

			var options = {
				method : "PUT",
				headers : consts.AtomXmlHeaders,
				query : requestArgs,
				data : member.createPostData()
			};

			var callbacks = {
				createEntity : function(service, data, response) {
					return response;
				}
			};

			return this.updateEntity(consts.AtomCommunityMembers, options, callbacks);

		},

        /**
         * Remove member of a community
         * 
         * @method
         * @param {String/Object} community id of the community or the community object.
         * @param {String} memberId id of the member
         * @param {Object} [args] Argument object
         */
        removeMember : function(communityUuid,memberId,args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }
            var member = this._toMember(memberId);
            promise = this._validateMember(member);
            if (promise) {
                return promise;
            }

            var requestArgs = {
                communityUuid : communityUuid
            };
            var key = member.getEmail() ? "email" : "userid";
            var value = member.getEmail() ? member.getEmail() : member.getUserid();
            requestArgs[key] = value;
            requestArgs = lang.mixin(requestArgs, args || {});
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomCommunityMembers, options, value);
        },
        
        /**
         * Retrieve a community invite.
         * 
         * @method getInvite
         * @param {String} communityUuid
         * @param (String} userid
         */
        getInvite : function(communityUuid, userid) {
            var invite = new Invite({
                service : this,
                _fields : { communityUuid : communityUuid, userid : userid }
            });
            return invite.load();
        },

        /**
         * Create an invite to be a member of a community.
         * 
         * @method createInvite
         * @param {Object} inviteOrJson
         * @param {Object} [args] Argument object
         */
        createInvite: function(inviteOrJson, args) {
            var invite = this._toInvite(inviteOrJson);
            var promise = this._validateInvite(invite, true);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service, data, response) {
                invite.setData(data, response);
                return invite;
            };

            var requestArgs = lang.mixin({
                communityUuid : invite.getCommunityUuid()
            }, args || {});
            
            var options = {
                method : "POST",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : invite.createPostData()
            };
            
            return this.updateEntity(consts.AtomCommunityInvites, options, callbacks, args);
        },
           
        /**
         * Decline or revoke an invite to be a member of a community
         * 
         * @method removeInvite
         * @param {Object} inviteOrJson
         * @param {Object} [args] Argument object
         */
        removeInvite: function(inviteOrJson, args) {
            var invite = this._toInvite(inviteOrJson);
            var promise = this._validateInvite(invite, true);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin({
                communityUuid : invite.getCommunityUuid(),
                userid : invite.getInviteeUuid()
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            var entityId = invite.getCommunityUuid() + "-" + invite.getInviteeUuid();
            return this.deleteEntity(consts.AtomCommunityInvites, options, entityId);
        },
        
        /**
         * Accept an invite to be a member of a community.
         * 
         * @method acceptInvite
         * @param {Object} inviteOrJson.
         * @param {Object} [args] Argument object
         */
        acceptInvite: function(inviteOrJson, args) {
            var invite = this._toInvite(inviteOrJson);
            var promise = this._validateInvite(invite, true);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin({
                communityUuid : invite.getCommunityUuid()
            }, args || {});
            
            var options = {
            	method : "POST",
        		query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : invite.createPostData()
            };
            
            // return the community id for the community whose invite is accepted in the argument of the success promise.
            var callbacks = {}; 
            callbacks.createEntity = function(service, data, response) { 
            	invite.setData(data, response);
                return invite;
            };
            
            return this.updateEntity(consts.AtomCommunityMembers, options, callbacks, args);
        },
        
        /**
         * Create a forum topc by sending an Atom entry document containing the 
         * new forum to the forum replies resource.
         * 
         * @method createForumTopic
         * @param {String} communityUuid This argument is deprecated and has no effect if provided.
         * @param {Object} forumTopic Forum topic object which denotes the forum topic to be created.
         * @param {Object} [args] Argument object
         */
        createForumTopic : function(communityUuid, topicOrJson, args) {
            if(!lang.isString(communityUuid)){
                args = topicOrJson;
                topicOrJson = communityUuid;
            }
            return this.getForumService().createForumTopic(topicOrJson, args);
        },
                
        /**
		 * Updates the Logo picture of a community
		 * @method updateCommunityLogo
		 * @param {Object} fileControlOrId The Id of html control or the html control
		 * @param {String} communityUuid the Uuid of community
		 */
		updateCommunityLogo : function(fileControlOrId, communityUuid) {
			var promise = this.validateField("File Control Or Id", fileControlOrId);
			if (promise) {
				return promise;
			}
			promise = this.validateHTML5FileSupport();
			if (promise) {
				return promise;
			}
			promise = this.validateField("CommunityUuid", communityUuid);
			if (promise) {
				return promise;
			}

			var files = null;
			var fileControl = this.getFileControl(fileControlOrId);
			if(!fileControl){
				return this.createBadRequestPromise("File Control or ID is required");
			}
			var filePath = fileControl.value;
			var files = fileControl.files;

			if (files.length != 1) {
				return this.createBadRequestPromise("Only one file can be upload as a community logo.");
			}

			var file = files[0];
			var formData = new FormData();
			formData.append("file", file);
			var requestArgs = {
				"communityUuid" : communityUuid
			};
			var url = this.constructUrl(consts.AtomUpdateCommunityLogo, null, {
				endpointName : this.endpoint.proxyPath,
				fileName : encodeURIComponent(file.name)
			});
			if (this.endpoint.proxy) {
                url = config.Properties.serviceUrl + url;
            } else {
            	return this.createBadRequestPromise("File Proxy is required to upload a community logo");
            }
					
			var headers = {
				"Content-Type" : false,
				"Process-Data" : false //processData = false is reaquired by jquery
			};
			var options = {
				method : "PUT",
				headers : headers,
				query : requestArgs,
				data : formData
			};
			var callbacks = {
				createEntity : function(service, data, response) {
					return data; // Since this API does not return any response in case of success, returning empty data
				}
			};

			return this.updateEntity(url, options, callbacks);
		},

        /**
		 * Updates the Logo picture of a community
		 * @method updateCommunityLogo
		 * @param {Object} fileControlOrId The Id of html control or the html control
		 * @param {String} communityUuid the Uuid of community
		 */
		uploadCommunityFile : function(fileControlOrId, communityUuid) {
			var promise = this.validateField("File Control Or Id", fileControlOrId);
			if (promise) {
				return promise;
			}
			promise = this.validateHTML5FileSupport();
			if (promise) {
				return promise;
			}
			promise = this.validateField("CommunityUuid", communityUuid);
			if (promise) {
				return promise;
			}

			var files = null;
			var fileControl = this.getFileControl(fileControlOrId);
			if(!fileControl){
				return this.createBadRequestPromise("File Control or ID is required");
			}
			var filePath = fileControl.value;
			var files = fileControl.files;

			if (files.length != 1) {
				return this.createBadRequestPromise("Only one file can be uploaded to a community at a time");
			}

			var file = files[0];
			var formData = new FormData();
			formData.append("file", file);
			var requestArgs = {
			};
			var url = this.constructUrl(consts.AtomUploadCommunityFile, null, {
				endpointName : this.endpoint.proxyPath,
				communityUuid : communityUuid
			});
			if (this.endpoint.proxy) {
                url = config.Properties.serviceUrl + url;
            } else {
            	return this.createBadRequestPromise("File proxy is required to upload a community file");
            }
					
			var headers = {
				"Content-Type" : false,
				"Process-Data" : false //processData = false is reaquired by jquery
			};
			var options = {
				method : "POST",
				headers : headers,
				query : requestArgs,
				data : formData
			};

			var callbacks = {
				createEntity : function(service, data, response) {
					return data;
				}
			};

			return this.updateEntity(url, options, callbacks);
		},

        /**
         * Create a bookmark by sending an Atom entry document containing the 
         * new bookmark.
         * 
         * @method createBookmark
         * @param {String/Object} bookmarkOrJson Bookmark object which denotes the bookmark to be created.
         * @param {Object} [args] Argument object
         */
        createBookmark : function(communityUuid, bookmarkOrJson, args) {
			args = lang.mixin({ 
				url : consts.AtomCommunityBookmarks, 
				communityUuid : communityUuid 
			}, args || {});
            return this.getBookmarkService().createBookmark(bookmarkOrJson, args);
        },
        
		//
		// Internals
		//
       
        /*
         * Return a Community instance from Community or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toCommunity : function(communityOrJsonOrString) {
            if (communityOrJsonOrString instanceof Community) {
                return communityOrJsonOrString;
            } else {
                if (lang.isString(communityOrJsonOrString)) {
                    communityOrJsonOrString = {
                        communityUuid : communityOrJsonOrString
                    };
                }
                return new Community({
                    service : this,
                    _fields : lang.mixin({}, communityOrJsonOrString)
                });
            }
        },

        /*
         * Return as Invite instance from Invite or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toInvite : function(inviteOrJsonOrString, args){
            if (inviteOrJsonOrString instanceof Invite) {
                return inviteOrJsonOrString;
            } else {
                if (lang.isString(inviteOrJsonOrString)) {
                	inviteOrJsonOrString = {
                        communityUuid : inviteOrJsonOrString
                    };
                }
                return new Invite({
                    service : this,
                    _fields : lang.mixin({}, inviteOrJsonOrString)
                });
            }
        },

        /*
         * Return a Community UUID from Community or communityUuid. Throws an
         * error if the argument was neither or is invalid.
         */
        _toCommunityUuid : function(communityOrUuid) {
            var communityUuid = null;
            if (communityOrUuid) {
                if (lang.isString(communityOrUuid)) {
                    communityUuid = communityOrUuid;
                } else if (communityOrUuid instanceof Community) {
                    communityUuid = communityOrUuid.getCommunityUuid();
                }
            }

            return communityUuid;
        },
        
        /*
         * Return a Community Member from Member or memberId. Throws an error if
         * the argument was neither or is invalid.
         */
        _toMember : function(idOrJson) {
            if (idOrJson) {
                if (idOrJson instanceof Member) {
                    return idOrJson;
                }
                var member = new Member({
                    service : this
                });
                if (lang.isString(idOrJson)) {
                    if (this.isEmail(idOrJson)) {
                        member.setEmail(idOrJson);
                    } else {
                        member.setUserid(idOrJson);
                    }
                } else {
                	if(idOrJson.id && !idOrJson.userid && !idOrJson.email){
                		this.isEmail(idOrJson.id) ? idOrJson.email = idOrJson.id : idOrJson.userid = idOrJson.id;
                		delete idOrJson.id;
                	}
                    member._fields = lang.mixin({}, idOrJson);
                }
                return member;
            }
        },

        /*
         * Validate a community UUID, and return a Promise if invalid.
         */
        _validateCommunityUuid : function(communityUuid) {
            if (!communityUuid || communityUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate a userid, and return a Promise if invalid.
         */
        _validateUserid : function(userid) {
            if (!userid || userid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected userid.");
            }
        },
        
        /*
         * Validate that the date-time is not empty, return a promise if invalid
         */
        _validateDateTimes : function(startDate, endDate){
            if ((!startDate || startDate.length === 0) && (!endDate || endDate.length === 0)) {
                return this.createBadRequestPromise("Invalid date arguments, expected either a startDate, endDate or both as parameters.");
            }
        },

        /*
         * Validate contributor id
         */
        _validateContributorId : function(contributorId) {
        	if (!contributorId || contributorId.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected contributorId.");
            }
        },

        /*
         * Validate a community, and return a Promise if invalid.
         */
        _validateCommunity : function(community,checkUuid) {
            if (!community || !community.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, community with title must be specified.");
            }
            if (checkUuid && !community.getCommunityUuid()) {
                return this.createBadRequestPromise("Invalid argument, community with UUID must be specified.");
            }
        },

        /*
         * Validate an invite, and return a Promise if invalid.
         */
        _validateInvite : function(invite, checkCommunityUuid) {
            if (!invite || (!invite.getEmail() && !invite.getUserid() && !invite.getInviteeUuid())) {
                return this.createBadRequestPromise("Invalid argument, invite with email or userid or invitee must be specified.");
            }
            if (checkCommunityUuid && !invite.getCommunityUuid()) {
                return this.createBadRequestPromise("Invalid argument, invite with community UUID must be specified.");
            }
        },

        /*
         * Validate a member, and return a Promise if invalid.
         */
        _validateMember : function(member) {
            if (!member || (!member.getUserid() && !member.getEmail())) {
                return this.createBadRequestPromise("Invalid argument, member with userid or email must be specified.");
            }
        },
        
        /*
         * Validate an event inst uuid, and return a Promise if invalid.
         */
        _validateEventInstUuid : function(eventInstUuid) {
            if (!eventInstUuid || eventInstUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected event inst uuid.");
            }
        },
        
        /*
         * Validate an event UUID, and return a Promise if invalid.
         */
        _validateEventUuid : function(eventUuid) {
            if (!eventUuid || eventUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected eventUuid.");
            }
        }

    });
    return CommunityService;
});
},
'sbt/smartcloud/Subscriber':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * 
 * @author Vimal Dhupar 
 * Definition of a Subscriber Helper for getting the Subscriber ID for a SmartCloud User.
 */
define([ "../declare", "../Endpoint" ], function(declare, Endpoint) {
	/**
	 * Subscriber Helper Class for getting the Subscriber ID for a SmartCloud User.
	 * @class Subscriber
	 * @namespace sbt.smartcloud
	 */
	var Subscriber = declare(null, {
		
		endpoint : null,
		
		/**
		 * @constructor
		 * @param endpoint
		 * @param callback
		 */
		constructor : function(endpoint, callback) {
			this.endpoint = endpoint;
			if (callback)
				this.load(callback);
		},
		
		/**
		 * Load method is responsible for making the network call to fetch the user identity
		 * @method load
		 * @param callback
		 */
		load : function(callback) {
			var _self = this;
			this.endpoint.xhrGet({
				serviceUrl : "/manage/oauth/getUserIdentity",
				loginUi : this.endpoint.loginUi,
				handleAs : "json",
				load : function(response) {
					callback(_self, response);
				},
				error : function(error) {
					callback(_self, null);
					console.log("Error fetching feed for getUserIdentity");
				}
			});
		},
		
		/**
		 * Method to get the Subscriber Id of the user.
		 * @method getSubscriberId
		 * @param response
		 * @returns
		 */
		getSubscriberId : function(response) {
			if (response && response.subscriberid) {
				return response.subscriberid;
			}
			return null;
		}
	});
	return Subscriber;
});
},
'sbt/connections/WikiConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * Definition of constants for WikiService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    /**
     * XPath expressions to be used when reading a wiki or wiki page entry
     */
    var BaseWikiXPath = lang.mixin({
    	uuid : "td:uuid",
    	label : "td:label",
    	permissions : "td:permissions",
    	tags : "a:category[not(@scheme)]/@term",
        modifierName : "td:modifier/a:name",
        modifierEmail : "td:modifier/a:email",
        modifierUserid : "td:modifier/snx:userid",
        modifierUserState : "td:modifier/snx:userState",
        created : "td:created",
        modified : "td:modified",
        member : "ca:member",
        memberId : "ca:member/@ca:id",
        memberType : "ca:member/@ca:type",
        memberRole : "ca:member/@ca:role"
    }, conn.AtomEntryXPath);
	
    return lang.mixin(conn, {
    	
        /**
         * XPath expressions used when parsing a Connections Wiki ATOM feed
         */
        WikiFeedXPath : conn.ConnectionsFeedXPath,

        /**
         * XPath expressions to be used when reading a wiki entry
         */
        WikiXPath : lang.mixin({
            communityUuid : "snx:communityUuid",
            themeName : "td:themeName",
            librarySize : "td:librarySize",
            libraryQuota : "td:libraryQuota",
            totalRemovedSize : "td:totalRemovedSize"
        }, BaseWikiXPath, conn.AtomEntryXPath),
        
        /**
         * XPath expressions to be used when reading a wiki page entry
         */
        WikiPageXPath : lang.mixin({
            lastAccessed : "td:lastAccessed",
            versionUuid : "td:versionUuid",
            versionLabel : "td:versionLabel",
            propagation : "td:propagation",
            totalMediaSize : "td:totalMediaSize",
            recommendations : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']",
            comment : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment']",
            hit : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/hit']",
            anonymous_hit : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/anonymous_hit']",
            share : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/share']",
            collections : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/collections']",
            attachments : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/attachments']",
            versions : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/versions']"            
        }, BaseWikiXPath, conn.AtomEntryXPath),
        
		/**
         * This returns a feed of wikis to which the authenticated user has access. 
         */
        WikisAll : "/{wikis}/{authType}/api/wikis/feed",
        
		/**
         * This returns a feed of wikis to which everyone who can log into the Wikis application has access. 
         */
        WikisPublic : "/{wikis}/{authType}/api/wikis/public",
        
		/**
         * This returns a feed of wikis of which the authenticated user is a member. 
         */
        WikisMy : "/{wikis}/{authType}/api/mywikis/feed",
        
		/**
         * This returns a feed of wikis to which everyone who can log into the Wikis application has access.
         */
        WikisMostCommented : "/{wikis}/{authType}/anonymous/api/wikis/mostcommented",
        
		/**
         * This returns a feed of wikis to which everyone who can log into the Wikis application has access. 
         */
        WikisMostRecommended : "/{wikis}/{authType}/api/wikis/mostrecommended",
        
		/**
         * This returns a feed of wikis to which everyone who can log into the Wikis application has access. 
         */
        WikisMostVisited : "/{wikis}/{authType}/api/wikis/mostvisited",
        
		/**
         * This returns a feed of the pages in a given wiki. 
         */
        WikiPages : "/{wikis}/{authType}/anonymous/api/wiki/{wikiLabel}/feed",
        
		/**
         * Get a feed that lists all of the pages in a specific wiki that have been added or edited by the authenticated user. 
         */
        WikiMyPages : "/{wikis}/{authType}/api/wiki/{wikiLabel}/mypages",
        
		/**
         * This returns a feed that lists the pages that have been deleted from wikis and are currently stored in the trash.  
         */
        WikiRecycleBin : "/{wikis}/{authType}/anonymous/api/wiki/{wikiLabelOrId}/recyclebin/feed",
        
        /**
         * Retrieve an Atom document of a wiki.
         */
        WikiEntry : "/{wikis}/{authType}/api/wiki/{wikiLabel}/entry",
        
        /**
         * Returns a wiki page after authenticating the request.
         */
        WikiPageEntry : "/{wikis}/{authType}/api/wiki/{wikiLabel}/page/{pageLabel}/entry",
        
        /**
         * Post to this feed to create a wiki page.
         */
        WikiFeed : "/{wikis}/{authType}/api/wiki/{wikiLabel}/feed"
        
    });
});
},
'sbt/_bridge/text':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 */
define([ "dojo/text" ], function(text) {
    var load = function(id,require,load) {
        text.load(id, require, load);
    };
    return {
        load : load
    };
});

},
'sbt/_bridge/Transport':function(){
/*
 * � Copyright IBM Corp. 2014
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * 
 * Implementation of a transport using the Dojo XHR API.
 */
define([ 'dojo/_base/declare', 'dojo/_base/xhr', 'dojo/_base/lang', '../util', '../Promise' ], function(declare, xhr, lang, util, Promise) {
    return declare(null, {
        
        /**
         * Provides an asynchronous request using the associated Transport.
         * 
         * @method request
         * @param {String)
         *            url The URL the request should be made to.
         * @param {Object}
         *            [options] Optional A hash of any options for the provider.
         * @param {String|Object}
         *            [options.data=null] Data, if any, that should be sent with
         *            the request.
         * @param {String|Object}
         *            [options.query=null] The query string, if any, that should
         *            be sent with the request.
         * @param {Object}
         *            [options.headers=null] The headers, if any, that should
         *            be sent with the request.
         * @param {Boolean}
         *            [options.preventCache=false] If true will send an extra
         *            query parameter to ensure the the server won�t supply
         *            cached values.
         * @param {String}
         *            [options.method=GET] The HTTP method that should be used
         *            to send the request.
         * @param {Integer}
         *            [options.timeout=null] The number of milliseconds to wait
         *            for the response. If this time passes the request is
         *            canceled and the promise rejected.
         * @param {String}
         *            [options.handleAs=text] The content handler to process the
         *            response payload with.
         * @return {sbt.Promise}
         */
        request : function(url, options) {
            var method = options.method || "GET";
            method = method.toUpperCase();
            var query = this.createQuery(options.query);
            var qurl = url;
            if(qurl && query){
            	qurl += (~qurl.indexOf('?') ? '&' : '?') + query;
            } 
            var args = {
                url : qurl,
                handleAs : options.handleAs || "text"
            };
            //if (options.query) {
            //    args.content = options.query;
            //}
            if (options.headers) {
                args.headers = options.headers;
            }
            var hasBody = false;
            if (method == "PUT") {
                args.putData = options.data || null;
                hasBody = true;
            } else if (method == "POST") {
                args.postData = options.data || null;
                hasBody = true;
            } else if(method == "GET") { // to ensure each time fresh feed is retrieved with network call
            	args.preventCache = true;
            }
            
            var promise = new Promise();
            promise.response = new Promise();
            var self = this;
            args.handle = function(response, ioargs) {
                if (response instanceof Error) {
                    var error = response;
                    error.response = self.createResponse(url, options, response, ioargs);
                    promise.rejected(error);
                    promise.response.rejected(error);
                } else {
                    promise.fulfilled(response);
                    promise.response.fulfilled(self.createResponse(url, options, response, ioargs));
                }
            };
            
            this.xhr(method, args, hasBody);
            return promise;
        },
        
        /*
         * Create a response object
         */
        createResponse: function(url, options, response, ioargs) {
            var xhr = ioargs._ioargs.xhr;
            var handleAs = options.handleAs || "text";
            return { 
                url : url,
                options : options,
                data : response,
                text : (handleAs == "text") ? response : null,
                status : xhr.status,
                getHeader : function(headerName) {
                    return xhr.getResponseHeader(headerName);
                },
                xhr : xhr,
                _ioargs : ioargs._ioargs
            };
        },

        /*
         * Create a query string from an object
         */
        createQuery: function(queryMap) {
            if (!queryMap) {
                return null;
            }
            var pairs = [];
            for(var name in queryMap){
                var value = queryMap[name];
                if (lang.isArray(value)) {
                	name = encodeURIComponent(name);
                	for (var i=0; i<value.length; i++) {
                		pairs.push(name + "=" + encodeURIComponent(value[i]));
                	}
                } else {
                	pairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
                }
            }
            return pairs.join("&");
        },
        
        xhr: function(method, args, hasBody) {
            var _args = lang.mixin({}, args);
            
            // override the handle callback to normalise the Error
            var self = this;
            _args.handle = function(data, ioArgs) {
                self.handleResponse(data, ioArgs, args);
            };

           // dojo.xhr(method, _args, hasBody);
           xhr(method, _args, hasBody);
        },
        handleResponse: function(data, ioArgs, args) {
            var _data = data;
            
            if (data instanceof Error) {
                _data = this.createError(data, ioArgs);
            }
            
            try {
                var _ioArgs = {
                    'args' : args,
                    'headers' : util.getAllResponseHeaders(ioArgs.xhr),
                    '_ioargs' : ioArgs
                };
                args.handle(_data, _ioArgs); 
            } catch (ex) {
                console.log(ex);
            }
        },
        createError: function(error, ioArgs) {
            var _error = new Error();
            _error.code = error.status || (error.response&&error.response.status) || 400;
            _error.cause = error;
            if (error.response) {
                _error.response = lang.mixin({}, error.response);
            }
            return _error;
        }        
    });
});
},
'sbt/connections/WikiService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Wikis application of IBM� Connections enables teams to create a shared repository of information. 
 * The Wikis API allows application programs to create new wikis, and to read and modify existing wikis.
 * 
 * @module sbt.connections.WikiService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./WikiConstants", "./ConnectionsService",
         "../base/AtomEntity", "../base/XmlDataHandler" ], 
    function(declare,config,lang,stringUtil,Promise,consts,ConnectionsService,AtomEntity,XmlDataHandler) {
	
	var CategoryWiki = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"wiki\" label=\"wiki\"></category>";
	var CategoryWikiPage = "<category term=\"page\" scheme=\"tag:ibm.com,2006:td/type\" label=\"page\"/>";
	
	var LabelTmpl = "<td:label>${getLabel}</td:label>";
	var PermissionsTmpl = "<td:permissions>${getPermissions}</td:permissions>";
	var CategoryTmpl = "<category term=\"${tag}\" label=\"${tag}\"></category>";
	
    /**
     * Wiki class represents an entry for a Wiki or Wiki Page feed returned by the
     * Connections REST API.
     * 
     * @class BaseWikiEntity
     * @namespace sbt.connections
     */
    var BaseWikiEntity = declare(AtomEntity, {
    	
    	/**
    	 * Set to true to include the label in the post data when 
    	 * performing an update or create operation. By default the 
    	 * label is not sent which will keep it in synch with the
    	 * Wiki or WikiPage title. 
    	 */
    	includeLabelInPost : false,
    	
        /**
         * Construct a BaseWikiEntity entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	var postData = "";
            var transformer = function(value,key) {
                return value;
            };
        	if (this.getLabel() && this.includeLabelInPost) {
                postData += stringUtil.transform(LabelTmpl, this, transformer, this);
        	}
        	if (this.getPermissions()) {
                postData += stringUtil.transform(PermissionsTmpl, this, transformer, this);
        	}
            return stringUtil.trim(postData);
        },
        
        /**
         * Return an array containing the tags for this wiki.
         * 
         * @method getTags
         * @return {Array}
         */
        getTags : function() {
        	var tags = this.getAsArray("tags");
        	return this.getAsArray("tags");
        },
        
        /**
         * Return an array containing the tags for this wiki.
         * 
         * @method setTags
         * @param {Array}
         */
        setTags : function(tags) {
        	return this.setAsArray("tags", tags);
        },
            
        /**
         * Return the value of id from Wiki ATOM
         * entry document.
         * 
         * @method getWikiUuid
         * @return {String} Id of the Wiki
         */
        getUuid : function() {
            var uid = this.getAsString("uuid");
            return extractWikiUuid(uid);
        },

        /**
         * Sets id of IBM Connections Wiki ATOM
         * entry document.
         * 
         * @method setWikiUuid
         * @param {String} Id of the Wiki
         */
        setUuid : function(uuid) {
            return this.setAsString("uuid", uuid);
        },

        /**
         * Return short text label used to identify the Wiki Entry in API operation resource addresses.
         * 
         * @method getLabel
         * @return {String} short text label used to identify the Wiki Entry in API operation resource addresses.
         */
        getLabel : function() {
            return this.getAsString("label");
        },

        /**
         * Set the short text label used to identify the Wiki Entry in API operation resource addresses.
         * 
         * @method setLabel
         * @param label short text label used to identify the Wiki Entry in API operation resource addresses.
         */
        setLabel : function(label) {
            return this.setAsString("label", label);
        },

        /**
         * Return the set of permissions available for the Wiki Entry.
         * 
         * @method getPermissions
         * @return {String} Permissions available for the Wiki Entry
         */
        getPermissions : function() {
            return this.getAsString("permissions");
        },
                
        /**
         * Set the permissions available for the Wiki Entry.
         * 
         * @method setPermissions
         * @param permissions Permissions available for the Wiki Entry
         */
        setPermissions : function(permissions) {
            return this.setAsString("permissions", permissions);
        },
        
        /**
         * Return modifier of the Wiki Entry.
         * 
         * @method getModifier
         * @return {Object} Modifier of the Wiki Entry 
         */
        getModifier : function() {
            return this.getAsObject(
            		[ "modifierUserid", "modifierName", "modifierEmail", "modifierUserState" ],
            		[ "userid", "name", "email", "userState" ]);
        },

        /**
         * Return the date the wiki was created.
         * 
         * @method getCreated
         * @return {Date} Date the wiki was created 
         */
        getCreated : function() {
            return this.getAsDate("created");
        },

        /**
         * Return the date the wiki was modified.
         * 
         * @method getModified
         * @return {Date} Date the wiki was modified 
         */
        getModified : function() {
            return this.getAsDate("modified");
        }

    });
    
    /**
     * Wiki class represents an entry for a Wiki feed returned by the
     * Connections REST API.
     * 
     * @class Wiki
     * @namespace sbt.connections
     */
    var Wiki = declare(BaseWikiEntity, {
    	
    	xpath : consts.WikiXPath,
    	contentType : "html",
    	categoryScheme : CategoryWiki,
    	
        /**
         * Construct a Wiki entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the community�s unique ID if this wiki belongs to a community.
         * 
         * @method getCommunityUuid
         * @return {String} Uuid of the Community
         */
        getCommunityUuid : function() {
            return this.getAsString("communityUuid");
        },

        /**
         * Set the community�s unique ID if this wiki belongs to a community.
         * 
         * @method setCommunityUuid
         * @param {String} communityUuid Community Uuid of the forum
         * @return {Wiki}
         */
        setCommunityUuid : function(communityUuid) {
            return this.setAsString("communityUuid", communityUuid);
        },
        
        /**
         * return the wiki theme name.
         * 
         * @method getThemeName
         * @return {String} Wiki theme name
         */
        getThemeName : function() {
            return this.getAsString("themeName");
        },

        /**
         * Return the library size.
         * 
         * @method getLibrarySize
         * @return {Number} the library size
         */
        getLibrarySize : function() {
            return this.getAsNumber("librarySize");
        },

        /**
         * Return the library quota.
         * 
         * @method getLibraryQuota
         * @return {Number} the library quota
         */
        getLibraryQuota : function() {
            return this.getAsNumber("libraryQuota");
        },

        /**
         * Return the total removed size.
         * 
         * @method getTotalRemovedSize
         * @return {Number} the total removed size 
         */
        getTotalRemovedSize : function() {
            return this.getAsNumber("totalRemovedSize");
        },
        
        /**
         * Get a list for wiki pages from this wiki.
         * 
         * @method getPages
         * @param {Object} args
         */
        getPages : function(args) {
        	return this.service.getWikiPages(this.getLabel(), args);
        },

        /**
         * Loads the wiki object with the atom entry associated with the
         * wiki. By default, a network call is made to load the atom entry
         * document in the wiki object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var label = this.getLabel();
            var promise = this.service._validateWikiLabel(label);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setData(data);
                    return self;
                }
            };

            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            var url = this.service.constructUrl(consts.WikiEntry, null, { "wikiLabel" : encodeURIComponent(label) });
                
            return this.service.getEntity(url, options, label, callbacks);
        },

        /**
         * Remove this wiki
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteWiki(this.getLabel(), args);
        },

        /**
         * Update this wiki
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateWiki(this, args);
        },
        
        /**
         * Save this wiki
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getWikiUuid()) {
                return this.service.updateWiki(this, args);
            } else {
                return this.service.createWiki(this, args);
            }
        }        
        
    });
    
    /**
     * WikiPage class represents an entry for a Wiki Page feed returned by the
     * Connections REST API.
     * 
     * @class WikiPage
     * @namespace sbt.connections
     */
    var WikiPage = declare(BaseWikiEntity, {
    	
    	xpath : consts.WikiPageXPath,
    	contentType : "html",
    	categoryScheme : CategoryWikiPage,
    	wikiLabel : null,
    	
        /**
         * Construct a Wiki entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the wiki label associated with this Wiki Page.
         * 
         * @method getWikiLabel
         * @return {String} wiki label
         */
        getWikiLabel : function() {
        	if (this.wikiLabel) {
        		return this.wikiLabel;
        	} else {
        		return this.getAsString("label");
        	}
        },

        /**
         * Set the wiki label associated with this Wiki Page.
         * 
         * @method setWikiLabel
         * @param {String} wiki label
         * @return {WikiPage}
         */
        setWikiLabel : function(wikiLabel) {
        	this.wikiLabel = wikiLabel;
            return this;
        },
        
        /**
         * Return the last accessed date/time.
         * 
         * @method getLastAccessed
         * @return {Date} the last accessed date/time
         */
        getLastAccessed : function() {
            return this.getAsDate("lastAccessed");
        },

        /**
         * Return the version uuid.
         * 
         * @method getVersionUuid
         * @return {String} the version uuid
         */
        getVersionUuid : function() {
            return this.getAsString("versionUuid");
        },

        /**
         * Return the version label.
         * 
         * @method getVersionLabel
         * @return {String} the version label
         */
        getVersionLabel : function() {
            return this.getAsString("versionLabel");
        },

        /**
         * Return the propagation.
         * 
         * @method getPropagation
         * @return {Boolean} the propagation
         */
        getPropagation : function() {
            return this.getAsBoolean("propagation");
        },

        /**
         * Return the total media size.
         * 
         * @method getTotalMediaSize
         * @return {Number} the total media size
         */
        getTotalMediaSize : function() {
            return this.getAsNumber("totalMediaSize");
        },

        /**
         * Return the number of recommendations.
         * 
         * @method getRecommendations
         * @return {Number} the number of recommendations
         */
        getRecommendations : function() {
            return this.getAsNumber("recommendations");
        },

        /**
         * Return the number of comments.
         * 
         * @method getComments
         * @return {Number} the number of comments
         */
        getComments : function() {
            return this.getAsNumber("comment");
        },

        /**
         * Return the number of hits.
         * 
         * @method getHits
         * @return {Number} the number of hits
         */
        getHits : function() {
            return this.getAsNumber("hit");
        },

        /**
         * Return the number of anonymous hits.
         * 
         * @method getAnonymousHits
         * @return {Number} the number of anonymous hits
         */
        getAnonymousHits : function() {
            return this.getAsNumber("anonymous_hit");
        },

        /**
         * Return the number of shares.
         * 
         * @method getShare
         * @return {Number} the number of shares
         */
        getShare : function() {
            return this.getAsNumber("share");
        },

        /**
         * Return the number of collections.
         * 
         * @method getCollections
         * @return {Number} the number of collections
         */
        getCollections : function() {
            return this.getAsNumber("collections");
        },

        /**
         * Return the number of attachments.
         * 
         * @method getAttachments
         * @return {Number} the number of attachments 
         */
        getAttachments : function() {
            return this.getAsNumber("attachments");
        },

        /**
         * Return the number of versions.
         * 
         * @method getVersions
         * @return {Number} the number of versions
         */
        getVersions : function() {
            return this.getAsNumber("versions");
        },

        /**
         * Loads the Wiki Page object with the atom entry associated with the
         * wiki. By default, a network call is made to load the atom entry
         * document in the Wiki Page object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var label = this.getLabel();
            var promise = this.service._validatePageLabel(label);
            if (promise) {
                return promise;
            }
            var wikiLabel = this.getWikiLabel();
            promise = this.service._validateWikiLabel(wikiLabel);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setData(data);
                    return self;
                }
            };

            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            var urlParams =  { "pageLabel" : encodeURIComponent(label), "wikiLabel" : encodeURIComponent(wikiLabel) };
            var url = this.service.constructUrl(consts.WikiPageEntry, null, urlParams);
                
            return this.service.getEntity(url, options, label, callbacks);
        },

        /**
         * Remove this Wiki Page
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteWikiPage(this.getLabel(), args);
        },

        /**
         * Update this Wiki Page
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateWikiPage(this, args);
        },
        
        /**
         * Save this Wiki Page
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getWikiUuid()) {
                return this.service.updateWikiPage(this, args);
            } else {
                return this.service.createWikiPage(this, args);
            }
        }        
        
    });
    
    /*
     * Method used to extract the wiki uuid for an id string.
     */
    var extractWikiUuid = function(uid) {
        if (uid && uid.indexOf("urn:lsid:ibm.com:td:") == 0) {
            return uid.substring("urn:lsid:ibm.com:td:".length);
        } else {
            return uid;
        }
    }; 
        
    /*
     * Callbacks used when reading a feed that contains wiki entries.
     */
    var WikiFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.WikiFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Wiki({
                service : service,
                data : data
            });
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains wiki page entries.
     */
    var WikiPageFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.WikiFeedXPath
            });
        }
    };
    
    /*
     * Callbacks used when reading an entry that contains wiki.
     */
    var WikiCallbacks = {
        createEntity : function(service,data,response) {
            return new Wiki({
                service : service,
                data : data
            });
        }
    };
    
    /**
     * WikisService class.
     * 
     * @class WikisService
     * @namespace sbt.connections
     */
    var WikiService = declare(ConnectionsService, {

        contextRootMap: {
            wikis: "wikis"
        },
        
        serviceName : "wikis",
        
        /**
         * Constructor for WikisService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Create a Wiki object with the specified data.
         * 
         * @method newWiki
         * @param {Object} args Object containing the fields for the new Wiki 
         */
        newWiki : function(args) {
            return this._toWiki(args);
        },
        
        /**
         * Create a Wiki Page object with the specified data.
         * 
         * @method newWikiPage
         * @param {Object} args Object containing the fields for the new Wiki Page
         */
        newWikiPage : function(args) {
            return this._toWikiPage(args);
        },
        
        /**
         * This retrieves a list of wikis to which the authenticated user has access.
         * 
         * @method getAllWikis
         * @param requestArgs
         */
        getAllWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisAll, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list of wikis to which everyone who can log into the Wikis application has access. 
         * 
         * @method getPublicWikis
         * @param requestArgs
         */
        getPublicWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisPublic, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list of wikis of which the authenticated user is a member. 
         * 
         * @method getMyWikis
         * @param requestArgs
         */
        getMyWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisMy, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list all wikis sorted by wikis with the most comments first.
         * This returns a list of wikis to which everyone who can log into the Wikis application has access.  
         * 
         * @method getMostCommentedWikis
         * @param requestArgs
         */
        getMostCommentedWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisMostCommented, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list all wikis sorted by wikis with the most recommendations first.
         * This returns a list of wikis to which everyone who can log into the Wikis application has access.  
         * 
         * @method getMostRecommendedWikis
         * @param requestArgs
         */
        getMostRecommendedWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisMostRecommended, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list all wikis sorted by wikis with the most visits first.
         * This returns a list of wikis to which everyone who can log into the Wikis application has access.  
         * 
         * @method getMostVisitedWikis
         * @param requestArgs
         */
        getMostVisitedWikis: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.WikisMostVisited, options, WikiFeedCallbacks);
        },
                
        /**
         * This retrieves a list all of the pages in a specific wiki.
         * 
         * @method getWikiPages
         * @param wikiLabel Value of the <td:label> element of the wiki.
         * @param requestArgs
         */
        getWikiPages: function(wikiLabel, requestArgs) {
            var promise = this._validateWikiLabel(wikiLabel);
            if (promise) {
                return promise;
            }
        	
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            var callbacks = lang.mixin(WikiPageFeedCallbacks, {
                createEntity : function(service,data,response) {
                    return new WikiPage({
                        service : service,
                        wikiLabel : wikiLabel,
                        data : data
                    });
                }
            });
            
            var url = this.constructUrl(consts.WikiPages, null, { "wikiLabel" : encodeURIComponent(wikiLabel) });
            
            return this.getEntities(url, options, callbacks);
        },
                
        /**
         * This retrieves a list all of the pages in a specific wiki that have been added or edited by the authenticated user.
         * 
         * @method geMyWikiPages
         * @param wikiLabel Value of the <td:label> element of the wiki.
         * @param requestArgs
         */
        getMyWikiPages: function(wikiLabel, requestArgs) {
            var promise = this._validateWikiLabel(wikiLabel);
            if (promise) {
                return promise;
            }
        	
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            var callbacks = lang.mixin(WikiPageFeedCallbacks, {
                createEntity : function(service,data,response) {
                    return new WikiPage({
                        service : service,
                        wikiLabel : wikiLabel,
                        data : data
                    });
                }
            });
                
            var url = this.constructUrl(consts.WikiMyPages, null, { "wikiLabel" : encodeURIComponent(wikiLabel) });
            
            return this.getEntities(url, options, callbacks);
        },
                
        /**
         * This retrieves a list of the pages that have been deleted from wikis and are currently stored in the trash.
         * 
         * @method getRecycledPages
         * @param wikiLabel Value of the <td:label> element or the <id> element of the wiki.
         * @param requestArgs
         */
        getRecycledWikiPages: function(wikiLabelOrId, requestArgs) {
            var promise = this._validateWikiLabel(wikiLabelOrId);
            if (promise) {
                return promise;
            }
        	
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            var callbacks = lang.mixin(WikiPageFeedCallbacks, {
                createEntity : function(service,data,response) {
                    return new WikiPage({
                        service : service,
                        wikiLabelOrId : wikiLabelOrId,
                        data : data
                    });
                }
            });
                    
            var url = this.constructUrl(consts.WikiRecycleBin, null, { "wikiLabelOrId" : encodeURIComponent(wikiLabelOrId) });
            
            return this.getEntities(url, options, callbacks);
        },
        
        /**
         * Retrieve a wiki.
         * 
         * @method getWiki
         * @param wikiLabel Value of the <td:label> element or the <id> element of the wiki.
         * @param requestArgs
         */
        getWiki: function(wikiLabel, requestArgs) {
            var wiki = new Wiki({
                service : this,
                _fields : { label : wikiLabel }
            });
            return wiki.load(requestArgs);
        },
        
        /**
         * Create a wiki.
         * 
         * @method createWiki
         * @param wikiOrJson
         * @param requestArgs
         */
        createWiki: function(wikiOrJson, requestArgs) {
            var wiki = this._toWiki(wikiOrJson);
            var promise = this._validateWiki(wiki, false, requestArgs);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                wiki.setData(data);
                return wiki;
            };

            var options = {
                method : "POST",
                query : requestArgs || {},
                headers : consts.AtomXmlHeaders,
                data : wiki.createPostData()
            };
            
            return this.updateEntity(consts.WikisAll, options, callbacks, requestArgs);
        },
                
        /**
         * Update a wiki.
         * All existing wiki information will be replaced with the new data. To avoid deleting all existing data, 
         * retrieve any data you want to retain first, and send it back with this request. For example, if you want 
         * to add a new tag to a wiki definition entry, retrieve the existing tags, and send them all back with the 
         * new tag in the update request. 
         * 
         * @method updateWiki
         * @param wikiOrJson
         * @param requestArgs
         */
        updateWiki: function(wikiOrJson, requestArgs) {
            var wiki = this._toWiki(wikiOrJson);
            var promise = this._validateWiki(wiki, true, requestArgs);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                wiki.setData(data);
                return wiki;
            };

            var options = {
                method : "PUT",
                query : requestArgs || {},
                headers : consts.AtomXmlHeaders,
                data : wiki.createPostData()
            };
            
            var url = this.constructUrl(consts.WikiEntry, null, { "wikiLabel" : encodeURIComponent(wiki.getLabel()) });
            
            return this.updateEntity(url, options, callbacks, requestArgs);
        },
                
        /**
         * Delete a wiki.
         * 
         * @method deleteWiki
         * @param wikiLabel
         * @param requestArgs
         */
        deleteWiki: function(wikiLabel, requestArgs) {
            var promise = this._validateWikiLabel(wikiLabel);
            if (promise) {
                return promise;
            }            
           
            var options = {
                method : "DELETE",
                query : requestArgs || {},
                handleAs : "text"
            };
            
            var url = this.constructUrl(consts.WikiEntry, null, { "wikiLabel" : encodeURIComponent(wikiLabel) });
            
            return this.deleteEntity(url, options, wikiLabel);
        },
                
        /**
         * Retrieve a wiki page.
         * 
         * @method getWikiPage
         * @param wikiLabel Value of the <td:label> element or the <id> element of the wiki.
         * @param requestArgs
         */
        getWikiPage: function(wikiLabel, pageLabel, requestArgs) {
            var wikiPage = new WikiPage({
                service : this,
                wikiLabel : wikiLabel,
                _fields : { label : pageLabel }
            });
            return wikiPage.load(requestArgs);
        },
        
        /**
         * Create a wiki page.
         * 
         * @method createWikiPage
         * @param pageOrJson
         * @param requestArgs
         */
        createWikiPage: function(pageOrJson, requestArgs) {
            var wikiPage = this._toWikiPage(pageOrJson);
            var promise = this._validateWikiPage(wikiPage, false, requestArgs);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                wiki.setData(data);
                return wiki;
            };

            var options = {
                method : "POST",
                query : requestArgs || {},
                headers : consts.AtomXmlHeaders,
                data : wikiPage.createPostData()
            };
            
            var url = this.constructUrl(consts.WikiFeed, null, { "wikiLabel" : encodeURIComponent(wikiPage.getWikiLabel()) });
            
            return this.updateEntity(url, options, callbacks, requestArgs);
        },
                
        /**
         * Update a wiki page.
         * 
         * @method updateWikiPage
         * @param pageOrJson
         * @param requestArgs
         */
        updateWikiPage: function(pageOrJson, requestArgs) {
            var wikiPage = this._toWikiPage(pageOrJson);
            var promise = this._validateWikiPage(wikiPage, true, requestArgs);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	wikiPage.setData(data);
                return wikiPage;
            };

            var options = {
                method : "PUT",
                query : requestArgs || {},
                headers : consts.AtomXmlHeaders,
                data : wikiPage.createPostData()
            };
            
            var urlParams =  { "pageLabel" : encodeURIComponent(wikiPage.getLabel()), "wikiLabel" : encodeURIComponent(wikiPage.getWikiLabel()) };
            var url = this.constructUrl(consts.WikiPageEntry, null, urlParams);
            
            return this.updateEntity(url, options, callbacks, requestArgs);
        },
                
        /**
         * Delete a wiki page.
         * 
         * @method deleteWikiPage
         * @param wikiLabel
         * @param pageLabel
         * @param requestArgs
         */
        deleteWikiPage: function(wikiLabel, pageLabel, requestArgs) {
            var promise = this._validateWikiLabel(wikiLabel);
            if (promise) {
                return promise;
            }            
            promise = this._validatePageLabel(pageLabel);
            if (promise) {
                return promise;
            }            
           
            var options = {
                method : "DELETE",
                query : requestArgs || {},
                handleAs : "text"
            };
            
            var urlParams =  { "pageLabel" : encodeURIComponent(label), "wikiLabel" : encodeURIComponent(wikiLabel) };
            var url = this.constructUrl(consts.WikiPageEntry, null, urlParams);
            
            return this.deleteEntity(url, options, wikiLabel);
        },
                
        //
        // Internals
        //

        /**
         * Move this to BaseService
         */
        constructUrl : function(url,params,urlParams) {
            if (!url) {
                throw new Error("BaseService.constructUrl: Invalid argument, url is undefined or null.");
            }
            
            var _urlParams = lang.mixin(
            		{ authType: this.endpoint.authType }, 
            		this.contextRootMap, 
            		this.endpoint.serviceMappings,
            		urlParams || {});
            url = stringUtil.replace(url, _urlParams);

            if (params) {
                for (param in params) {
                    if (url.indexOf("?") == -1) {
                        url += "?";
                    } else if (url.indexOf("&") != (url.length - 1)) {
                        url += "&";
                    }
                    var value = encodeURIComponent(params[param]);
                    if (value) {
                        url += param + "=" + value;
                    }
                }
            }
            return url;
        },
        
        /*
         * Validate a Wiki and return a Promise if invalid.
         */
        _validateWiki : function(wiki,checkLabel) {
            if (!wiki || !wiki.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, wiki with title must be specified.");
            }
            if (checkLabel && !wiki.getLabel()) {
                return this.createBadRequestPromise("Invalid argument, wiki with label must be specified.");
            }
        },
        
        /*
         * Validate a WikiPage and return a Promise if invalid.
         */
        _validateWikiPage : function(wikiPage,checkLabels) {
            if (!wikiPage || !wikiPage.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, wiki page with title must be specified.");
            }
            if (checkLabels && !wikiPage.getLabel()) {
                return this.createBadRequestPromise("Invalid argument, wiki page with label must be specified.");
            }
            if (checkLabels && !wikiPage.getWikiLabel()) {
                return this.createBadRequestPromise("Invalid argument, wiki page with wiki label must be specified.");
            }
        },
        
        /*
         * Validate a wiki label, and return a Promise if invalid.
         */
        _validateWikiLabel : function(wikiLabel) {
            if (!wikiLabel || wikiLabel.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected wiki label.");
            }
        },
        
        /*
         * Validate a wiki page label, and return a Promise if invalid.
         */
        _validatePageLabel : function(pageLabel) {
            if (!pageLabel || pageLabel.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected wiki page label.");
            }
        },
        
        /*
         * Validate a wiki UUID, and return a Promise if invalid.
         */
        _validateWikiUuid : function(wikiUuid) {
            if (!wikiUuid || wikiUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected wikiUuid.");
            }
        },
        
        /*
         * Return a Wiki instance from Wiki or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toWiki : function(wikiOrJsonOrString) {
            if (wikiOrJsonOrString instanceof Wiki) {
                return wikiOrJsonOrString;
            } else {
                if (lang.isString(wikiOrJsonOrString)) {
                    wikiOrJsonOrString = {
                        handle : wikiOrJsonOrString
                    };
                }
                return new Wiki({
                    service : this,
                    _fields : lang.mixin({}, wikiOrJsonOrString)
                });
            }
        },
        
        /*
         * Return a WikiPage instance from WikiPage or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toWikiPage : function(pageOrJsonOrString) {
            if (pageOrJsonOrString instanceof WikiPage) {
                return pageOrJsonOrString;
            } else {
                if (lang.isString(pageOrJsonOrString)) {
                	pageOrJsonOrString = {
                        handle : pageOrJsonOrString
                    };
                }
                return new WikiPage({
                    service : this,
                    _fields : lang.mixin({}, pageOrJsonOrString)
                });
            }
        }
        
    });
    return WikiService;
});

},
'sbt/Jsonpath':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK 
 * JSONPath 0.8.0 - XPath for JSON
 * Would be replaced with JsonPath version of Github
 */
define(['./declare'],function(declare){
		return function(obj, expr, arg)
		{
			 var P = {
					 resultType: arg && arg.resultType || "VALUE",
				      result: [],
				      normalize: function(expr) {
				         var subx = [];
				         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
				                    .replace(/'?\.'?|\['?/g, ";")
				                    .replace(/;;;|;;/g, ";..;")
				                    .replace(/;$|'?\]|'$/g, "")
				                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
				      },
				      asPath: function(path) {
				         var x = path.split(";"), p = "$";
				         for (var i=1,n=x.length; i<n; i++)
				            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
				         return p;
				      },
				      store: function(p, v) {
				         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
				         return !!p;
				      },
				      trace: function(expr, val, path) {
				         if (expr) {
				            var x = expr.split(";"), loc = x.shift();
				            x = x.join(";");
				            if (val && val.hasOwnProperty(loc))
				               P.trace(x, val[loc], path + ";" + loc);
				            else if (loc === "*")
				               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
				            else if (loc === "..") {
				               P.trace(x, val, path);
				               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
				            }
				            else if (/,/.test(loc)) { // [name1,name2,...]
				               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
				                  P.trace(s[i]+";"+x, val, path);
				            }
				            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
				               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
				            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
				               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
				            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
				               P.slice(loc, x, val, path);
				         }
				         else
				            P.store(path, val);
				      },
				      walk: function(loc, expr, val, path, f) {
				         if (val instanceof Array) {
				            for (var i=0,n=val.length; i<n; i++)
				               if (i in val)
				                  f(i,loc,expr,val,path);
				         }
				         else if (typeof val === "object") {
				            for (var m in val)
				               if (val.hasOwnProperty(m))
				                  f(m,loc,expr,val,path);
				         }
				      },
				      slice: function(loc, expr, val, path) {
				         if (val instanceof Array) {
				            var len=val.length, start=0, end=len, step=1;
				            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
				            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
				            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
				            for (var i=start; i<end; i+=step)
				               P.trace(i+";"+expr, val, path);
				         }
				      },
				      eval: function(x, _v, _vname) {
				         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
				         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
				      }
			 };
			 var $ = obj;
			   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
			      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
			      return P.result.length ? P.result : false;
			   }
		};	
});
},
'sbt/Gadget':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - OpenSocial specific helpers.
 */
define(function() {

//sbt.getUserPref = function(ns,name) {
//	
//};

});
},
'sbt/IWidget':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - iWidget specific helpers.
 */
define([],function() {

sbt.getUserPref = function(ns,name) {
	
};

});
},
'sbt/connections/ProfileService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * JavaScript API for IBM Connections Profile Service.
 * 
 * @module sbt.connections.ProfileService
 */
define([ "../declare", "../lang", "../config", "../stringUtil", "./ProfileConstants", "./ConnectionsService", "../base/BaseEntity", "../base/AtomEntity", "../base/XmlDataHandler", "../base/VCardDataHandler", "../Cache", "../util"  ], function(
        declare,lang,config,stringUtil,consts,ConnectionsService,BaseEntity,AtomEntity,XmlDataHandler, VCardDataHandler, Cache, util) {
	
	var CategoryProfile = "<category term=\"profile\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var updateProfileXmlTemplate = "\nBEGIN:VCARD\nVERSION:2.1\n${jobTitle}${address}${telephoneNumber}${building}${floor}END:VCARD\n";
	var updateProfileAttributeTemplate = "${attributeName}:${attributeValue}\n";
    var updateProfileAddressTemplate = "ADR;WORK:;;${streetAddress},${extendedAddress};${locality};${region};${postalCode};${countryName}\n";
    var ContentTmpl = "<content type=\"${contentType}\">${content}</content>";   
    var createProfileTemplate = "<person xmlns=\"http://ns.opensocial.org/2008/opensocial\"><com.ibm.snx_profiles.attrib>${guid}${email}${uid}${distinguishedName}${displayName}${givenNames}${surname}${userState}</com.ibm.snx_profiles.attrib></person>";
    var createProfileAttributeTemplate = "<entry><key>${attributeName}</key><value><type>text</type><data>${attributeValue}</data></value></entry>";
    var createProfileTagsTemplate = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><app:categories xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\" xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:app=\"http://www.w3.org/2007/app\">${createTags}</app:categories>"
    var	CategoryTmpl = "<atom:category term=\"${tag}\"></atom:category>";
    	
    var CategoryConnection = "<category term=\"connection\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" />";
    var CategoryConnectionType = "<category term=\"${getConnectionType}\" scheme=\"http://www.ibm.com/xmlns/prod/sn/connection/type\" />";
    var CategoryStatus = "<category term=\"${getStatus}\" scheme=\"http://www.ibm.com/xmlns/prod/sn/status\" />";
   
    var OAuthString = "/oauth";
    var basicAuthString = "";
    var defaultAuthString = "";
    
    /**
     * Profile class.
     * 
     * @class Profile
     * @namespace sbt.connections
     */
    
    /*
     * ProfileDataHandler class.
     */
   
    
    
    var Profile = declare(AtomEntity, {

    	xpath : consts.ProfileXPath,
    	namespaces : consts.ProfileNamespaces,    	
    	categoryScheme : CategoryProfile,
    	_update : false,
    	
    	/**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {            
        },
        
        /**
         * Data handler for profile object based on the query paramter - "output", used to get the profile.
         * If the value of output paramter is "vcard", the VCardDataHandler is associated with
         * the profile object else, by default, XmlDataHandler is associated with the object.
         *  
         *  @param {Object} service  ProfileService instance associated with the profile object
         *  @param {Object} data Profile document associated with the profile object
         *  @response {Object} response Response object returned after the operation for get/create/update 
         *  of the profile
         *  @namespaces {Object} namespace NameSpace object associated with the profile 
         *  @xpath {Object} xpath XPath object associated with the profile 
         */
        
        
        createDataHandler : function(service, data, response, namespaces, xpath) {            	
    	  if (response.options && response.options.query && response.options.query.output == "vcard") {
              return new VCardDataHandler({
            	  service: service,
                  data : data,
                  namespaces : namespaces,
                  xpath : consts.ProfileVCardXPath
              });
          } else {
              return new XmlDataHandler({
            	  service: service,
                  data : data,
                  namespaces : namespaces,
                  xpath : xpath
              });
          }
        },
        
        /**
         * Get id of the profile
         * 
         * @method getUserid
         * @return {String} id of the profile
         * 
         */
        getUserid : function() {
            return this.getAsString("userid");
        },

        /**
         * Get name of the profile
         * 
         * @method getName
         * @return {String} name of the profile
         * 
         */
        getName : function() {
            return this.getAsString("name");
        },

        /**
         * Get email of the profile
         * 
         * @method getEmail
         * @return {String} email of the profile
         */
        getEmail : function() {
            return this.getAsString("email");
        },

        /**
         * Get groupware mail of the profile
         * 
         * @method getGroupwareMail
         * @return {String} groupware mail of the profile
         */
        getGroupwareMail : function() {
            return this.getAsString("groupwareMail");
        },

        /**
         * Get thumbnail URL of the profile
         * 
         * @method getThumbnailUrl
         * @return {String} thumbnail URL of the profile
         */
        getThumbnailUrl : function() {
            return this.getAsString("photoUrl");
        },

        /**
         * Get job title of the profile
         * 
         * @method getJobTitle
         * @return {String} job title of the profile
         */
        getJobTitle : function() {
            return this.getAsString("jobTitle");
        },

        /**
         * Get department of the profile
         * 
         * @method getDepartment
         * @return {String} department of the profile
         */
        getDepartment : function() {
            return this.getAsString("organizationUnit");
        },

        /**
         * Get address of the profile
         * 
         * @method getAddress
         * @return {Object} Address object of the profile
         */
        getAddress : function() {
            return this.getAsObject(consts.AddressFields);
        },
        /**
         * Get telephone number of the profile
         * 
         * @method getTelephoneNumber
         * @return {String} Phone number of the profile
         */
        getTelephoneNumber : function() {
            return this.getAsString("telephoneNumber");
        },

        /**
         * Get profile URL of the profile
         * 
         * @method getProfileUrl
         * @return {String} profile URL of the profile
         */
        getProfileUrl : function() {
            return this.getAsString("fnUrl");
        },
        /**
         * Get building name of the profile
         * 
         * @method getBuilding
         * @return {String} building name of the profile
         */
        getBuilding : function() {
            return this.getAsString("building");
        },
        /**
         * Get floor address of the profile
         * 
         * @method getFloor
         * @return {String} floor address of the profile
         */
        getFloor : function() {
            return this.getAsString("floor");
        },

        /**
         * Get Pronunciation URL of the profile
         * 
         * @method getPronunciationUrl
         * @return {String} Pronunciation URL of the profile
         */
        getPronunciationUrl : function() {
            return this.getAsString("soundUrl");
        },

        /**
         * Get summary of the profile
         * 
         * @method getSummary
         * @return {String} description of the profile
         */
        getSummary : function() {
            return this.getAsString("summary");
        },

        /**
         * Set work phone number of the profile in the field object
         * 
         * @method setTelephoneNumber
         * @param {String} telephoneNumber work phone number of the profile
         */
        setTelephoneNumber : function(telephoneNumber) {
            this.setAsString("telephoneNumber", telephoneNumber);
        },
        
        /**
         * Set building of the profile in the field object
         * 
         * @method setBuilding
         * @param {String} building building name of the profile
         */
        setBuilding : function(building) {
            this.setAsString("building", building);
        },
        
        /**
         * Set floor number of the profile in the field object
         * 
         * @method setFloor
         * @param {String} floor floor number of the profile
         */
        setFloor : function(floor) {
            this.setAsString("floor", floor);
        },

        /**
         * Set job title of the profile in the field object
         * 
         * @method setJobTitle
         * @param {String} title job title of the profile
         */
        setJobTitle : function(title) {
            this.setAsString("jobTitle", title);
        },

        /**
         * Set the location of the file input element in the markup for editing
         * profile photo in the field object
         * 
         * @method setPhotoLocation
         * @param {String} imgLoc location of the file input element
         */
        setPhotoLocation : function(imgLoc) {
            this.setAsString("imageLocation", imgLoc);
        },

        /**
         * Set the address of the profile in the field object
         * 
         * @method setAddress
         * @param {Object} address Address object of the profile.
         */
        setAddress : function(address) {
            this.setAsObject(address);
        },

        /**
         * Loads the profile object with the profile entry document associated
         * with the profile. By default, a network call is made to load the
         * profile entry document in the profile object.
         * 
         * @method load
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         * 
         */
        load : function(args) {        	
            var profileId = this.getUserid() || this.getEmail();
            var promise = this.service._validateProfileId(profileId);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
            	  self.setData(data, response);
                  return self;
                }
            };
            var requestArgs = {};
            if (this.service.isEmail(profileId)) {
            	requestArgs.email = profileId;
            } else {
            	requestArgs.userid = profileId;
            }            	
            lang.mixin(requestArgs, args || {});            
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            var url = this.service.constructUrl(consts.AtomProfileDo, {}, {authType : this.service._getProfileAuthString()});
            return this.service.getEntity(url, options, profileId, callbacks, args);
        },

        /**
         * Updates the profile of a user.
         * 
         * @method update
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        update : function(args) {
        	return this.service.updateProfile(this, args);
        },
        
        /**
         * Get colleagues of the profile.
         * 
         * @method getColleagues
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getColleagues : function(args){
        	return this.service.getColleagues(this, args);
        },
        /**
         * Get colleague connections of the profile.
         * 
         * @method getColleagueConnections
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getColleagueConnections : function(args){
        	return this.service.getColleagueConnections(this, args);
        },
        
        /**
         * Return content element to be included in post data for the creation or updaton of new profile entry.
         * 
         * @method createContent
         * @returns {String}
         */
        createContent : function() { 
        	if(this._update){
        		this._update = false;
	        	var transformer = function(value,key) {
	                if (key == "address") {                	
	                	value = this.service._isAddressSet(this) ? stringUtil.transform(updateProfileAddressTemplate, {"streetAddress" : this._fields["streetAddress"], 
	                	"extendedAddress" : this._fields["extendedAddress"], "locality" : this._fields["locality"], "region" : this._fields["region"],
	                	"postalCode" : this._fields["postalCode"], "countryName" : this._fields["countryName"]}) : null;
	                } 
	                else{                	
	                	value = (this._fields[key])? stringUtil.transform(updateProfileAttributeTemplate, {"attributeName" : consts.ProfileVCardXPath[key], "attributeValue" : this._fields[key]}) : null;
	                	
	                }
	                return value;
	            };
	            var content = stringUtil.transform(updateProfileXmlTemplate, this, transformer, this);
	            if (content) {
	        		return stringUtil.transform(ContentTmpl, { "contentType" : "text", "content" : content });
	        	}
	        	return "";
        	}else{
        		var transformer = function(value,key) {
                	if(this._fields[key]){
    	                value = stringUtil.transform(createProfileAttributeTemplate, {"attributeName" : consts.profileCreateAttributes[key], "attributeValue" : this._fields[key]});
    	                return value;
                	}
                };
                var content = stringUtil.transform(createProfileTemplate, this, transformer, this);
                if(content){
                	return stringUtil.transform(ContentTmpl, { "contentType" : "application/xml", "content" : content });
                }
                return "";
        	}
        	
        },
        
        /**
         * Return tags elements to be included in post data for creation and updation of profile entry.
         * 
         * @method createTags
         * @returns {String}
         */
        createTags : function() {            
        	return "";
        }
        
    });
    
    /**
     * ColleagueConnection class.
     * 
     * @class ConnectionEntry
     * @namespace sbt.connections
     */
    var ColleagueConnection = declare(AtomEntity, {

        /**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {            
        }
    });

    /**
     * ProfileTag class.
     * 
     * @class ProfileTag
     * @namespace sbt.connections
     */
    var ProfileTag = declare(BaseEntity, {

        /**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {            
        },

        /**
         * Get term of the profile tag
         * 
         * @method getTerm
         * @return {String} term of the profile tag
         * 
         */
        getTerm : function() {
            return this.getAsString("term");
        },
        
        /**
         * Get frequency of the profile tag
         * 
         * @method getFrequency
         * @return {Number} frequency of the profile tag
         * 
         */
        getFrequency : function() {
            return this.getAsNumber("frequency");
        },
        
        /**
         * Get intensity of the profile tag
         * 
         * @method getIntensity
         * @return {Number} intensity of the profile tag
         * 
         */
        getIntensity : function() {
            return this.getAsNumber("intensity");
        },
        
        /**
         * Get visibility of the profile tag
         * 
         * @method getVisibility
         * @return {Number} visibility of the profile tag
         * 
         */
        getVisibility : function() {
            return this.getAsNumber("visibility");
        }
        
    });
    
    /**
     * Invite class.
     * 
     * @class Invite
     * @namespace sbt.connections
     */
    var Invite = declare(AtomEntity, {

    	xpath : consts.InviteXPath,
    	contentType : "html",
    	categoryScheme : CategoryConnection,
    	    	
        /**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {            
        },
        
        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	var entryData = "";
        	entryData += stringUtil.transform(CategoryConnectionType, this, function(v,k) { return v; }, this);
        	entryData += stringUtil.transform(CategoryStatus, this, function(v,k) { return v; }, this);
            return stringUtil.trim(entryData);
        },
        
        /**
         * Return tags elements to be included in post data for creation and updation of invite entry.
         * 
         * @method createTags
         * @returns {String}
         */
        createTags : function() {            
        	return "";
        },
        
        
        /**
         * Return the connection type associated with this invite. 
         * 
         * @method getConnectionType
         * @return {String} status
         */
        getConnectionType : function() {
        	var connectionType = this.getAsString("connectionType");
        	return connectionType || consts.TypeColleague;
        },
                
        /**
         * Set the connection type associated with this invite. 
         * 
         * @method setConnectionType
         * @param {String} status
         */
        setConnectionType : function(connectionType) {
        	return this.setAsString("connectionType", connectionType);
        },
                
        /**
         * Return the status associated with this invite. 
         * 
         * @method getStatus
         * @return {String} status
         */
        getStatus : function() {
        	var status = this.getAsString("status");
        	return status || consts.StatusPending;
        },
        
        /**
         * Set the status associated with this invite. 
         * 
         * @method setStatus
         * @param {String} status
         */
        setStatus : function(status) {
        	return this.setAsString("status", status);
        },
        
        /**
         * Return the connection id associated with this invite. 
         * 
         * @method getConnectionId
         * @return {String} connectionId
         */
        getConnectionId : function() {
        	return this.getAsString("connectionId");
        },
        
        /**
         * Set connection id associated with this invite. 
         * 
         * @method setConnectionId
         * @param connectionId
         * @return {Invite} 
         */
        setConnectionId : function(connectionId) {
        	return this.setAsString("connectionId", connectionId);
        }
    });
    
    /**
     * Callbacks used when reading an entry that contains a Profile.
     */
    var ProfileCallbacks = {
        createEntity : function(service,data,response) {
            return new Profile({
                service : service,
                data : data,
                response: response                
            });
        }
    };
    
    /**
     * Callbacks used when reading a feed that contains Profile entries.
     */
    var ProfileFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ProfileFeedXPath
            });
        },
        createEntity : function(service,data,response) {            
            return new Profile({
                service : service,
                data: data,
                response: response
            });
        }
    };
    
    /**
     * Callbacks used when reading a feed that contains ColleagueConnections
     */
    var ColleagueConnectionFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ProfileFeedXPath
            });
        },
        createEntity : function(service,data,response) {            
            return new ColleagueConnection({
                service : service,
                data: data,
                response: response
            });
        }
    };
    
    /**
     * Callbacks used when reading a feed that contains Profile Tag entries.
     */
    var ProfileTagFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ProfileTagsXPath
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ProfileTagsXPath
            });
            return new ProfileTag({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    /**
     * ProfileService class.
     * 
     * @class ProfileService
     * @namespace sbt.connections
     */
    var ProfileService = declare(ConnectionsService, {
        
        contextRootMap: {
            profiles: "profiles"
        },
        
        serviceName : "profiles",

        /**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        	if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        	if(!this._cache){
        		if(config.Properties.ProfileCacheSize || consts.DefaultCacheSize){
        			this._cache = new Cache(config.Properties.ProfileCacheSize || consts.DefaultCacheSize);
        		}        		
        	}            
        },
        
        /**
        * Create a Profile object with the specified data.
        * 
        * @method newProfile
        * @param {Object} args Object containing the fields for the 
        *            new Profile 
        */
        newProfile : function(args) {
            return this._toProfile(args);
        },

        /**
         * Create a Invite object with the specified data.
         * 
         * @method newInvite
         * @param {Object} args Object containing the fields for the 
         *            new Invite 
         */
         newInvite : function(args) {
             return this._toInvite(args);
         },

        /**
         * Get the profile of a user.
         * 
         * @method getProfile
         * @param {String} userIdOrEmail Userid or email of the profile
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getProfile : function(userIdOrEmail, args) {           
        	var profile = this._toProfile(userIdOrEmail);
            var promise = this._validateProfile(profile);
            if (promise) {
                return promise;
            }
            return profile.load(args);
        },
        
        /**
         * Update an existing profile
         * 
         * @method updateProfile
         * @param {Object} profileOrJson Profile object to be updated
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        updateProfile : function(profileOrJson,args) {
            var profile = this._toProfile(profileOrJson);
            profile._update = true;
            var promise = this._validateProfile(profile);
            if (promise) {
                return promise;
            }

            var requestArgs = {};
            profile.getUserid() ? requestArgs.userid = profile.getUserid() : requestArgs.email = profile.getEmail();
            lang.mixin(requestArgs, args || {});
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {                
                return profile;              
            };
            
            var options = {
                    method : "PUT",
                    query : requestArgs,
                    headers : consts.AtomXmlHeaders,
                    data : profile.createPostData()
                };   
            var url = this.constructUrl(consts.AtomProfileEntryDo, {}, {authType : this._getProfileAuthString()});

            return this.updateEntity(url, options, callbacks, args);
        },      
        
        /**
         * Get the tags for the specified profile
         * 
         * @method getTags
         * @param {String} id userId/email of the profile
         * @param {Object} args Object representing various query parameters that can be passed. The parameters must 
         * be exactly as they are supported by IBM Connections.
         */
        getTags : function(id, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toTargetObject(id);
            var promise = this._validateTargetObject(idObject);
            if (promise) {
                return promise;
            }
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin(idObject, args || {})
            };
            var url = this.constructUrl(consts.AtomTagsDo, {}, {authType : this._getProfileAuthString()});

            return this.getEntities(url, options, this.getProfileTagFeedCallbacks(), args);
        },
        
        /**
         * Get the colleagues for the specified profile
         * 
         * @method getColleagues
         * @param {String} id userId/email of the profile
         * @param {Object} args Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getColleagues : function(id, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toIdObject(id);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin(idObject, {
                connectionType : "colleague",
                outputType : "profile"
            }, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            var url = this.constructUrl(consts.AtomConnectionsDo, {}, {authType : this._getProfileAuthString()});
            return this.getEntities(url, options, this.getProfileFeedCallbacks(), args);
        },
        
        /**
         * Get the colleagues for the specified profile as Collegue Connection entries
         * 
         * @method getColleagueConnections
         * @param {String} id userId/email of the profile
         * @param {Object} args Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getColleagueConnections : function(id, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toIdObject(id);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin(idObject, {
                connectionType : "colleague",
				outputType : "connection"
            }, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            var url = this.constructUrl(consts.AtomConnectionsDo, {}, {authType : this._getProfileAuthString()});
            return this.getEntities(url, options, this.getColleagueConnectionFeedCallbacks(), args);
        },
        
        /**
         * Get the reporting chain for the specified person.
         * 
         * @method getReportingChain
         * @param {String} id userId/email of the profile
         * @param {Object} args Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getReportingChain : function(id, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toIdObject(id);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin(idObject, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            var url = this.constructUrl(consts.AtomReportingChainDo, {}, {authType : this._getProfileAuthString()});
            return this.getEntities(url, options, this.getProfileFeedCallbacks(), args);
        },
        
        /**
         * Get the people managed for the specified person.
         * 
         * @method getPeopleManaged
         * @param {String} id userId/email of the profile
         * @param {Object} args Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getPeopleManaged : function(id, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toIdObject(id);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin(idObject, args || {});
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            var url = this.constructUrl(consts.AtomPeopleManagedDo, {}, {authType : this._getProfileAuthString()});
            return this.getEntities(url, options, this.getProfileFeedCallbacks(), args);
        },
                
        /**
         * Search for a set of profiles that match a specific criteria and return them in a feed.
         * 
         * @method search
         * @param {Object} args Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        search : function(args) {
            // detect a bad request by validating required arguments
            if (!args) {
            	return this.createBadRequestPromise("Invalid arguments, one or more of the input parameters to narrow the search must be specified.");
            }
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : args
            };
            var url = this.constructUrl(consts.AtomSearchDo, {}, {authType : this._getProfileAuthString()});
            return this.getEntities(url, options, this.getProfileFeedCallbacks(), args);
        },
        
        /**
		 * Updates the profile photo of a user.
		 * @method updateProfilePhoto
		 * @param {Object} fileControlOrId The Id of html control or the html control
		 * @param @param {String} id userId/email of the profile 
		 * @param {Object} [args] The additional parameters
		 */
		updateProfilePhoto: function (fileControlOrId, id, args) {
			var promise = this.validateField("File Control Or Id", fileControlOrId);
			if (promise) {
				return promise;
			}
			promose = this.validateHTML5FileSupport();
			if(promise){
				return promise;
			}			
			
			var idObject = this._toIdObject(id);
			var files = null;
			if (typeof fileControlOrId == "string") {
				var fileControl = document.getElementById(fileControlOrId);
				filePath = fileControl.value;
				files = fileControl.files;
			} else if (typeof fileControlOrId == "object") {
				filePath = fileControlOrId.value;
				files = fileControlOrId.files;
			} else {
				return this.createBadRequestPromise("File Control or ID is required");
			}

			if(files.length != 1){
				return this.createBadRequestPromise("Only one file needs to be provided to this API");
			}
			
			var file = files[0];
			var formData = new FormData();
			formData.append("file", file);
			var requestArgs = lang.mixin(idObject, args || {});		
			var url = this.constructUrl(config.Properties.serviceUrl + "/files/" + this.endpoint.proxyPath + "/" + "connections" + "/" +  "UpdateProfilePhoto" + "/" + encodeURIComponent(file.name),
					args && args.parameters ? args.parameters : {});
			var headers = {
				"Content-Type" : false,
				"Process-Data" : false // processData = false is reaquired by jquery 
			};			
			var options = {
				method : "PUT",
				headers : headers,
				query : requestArgs || {},
				data : formData
			};
			var callbacks = {
					createEntity : function(service, data, response) {
						return data; // Since this API does not return any response in case of success, returning empty data
					}
			};

			return this.updateEntity(url, options, callbacks);			
		},
        
        /**
         * Invite a person to become your colleague.
         * 
         * @method inviteColleague
         * @param id
         * @param inviteOrJson
         * @param args
         */
		createInvite : function(id, inviteOrJson, args) {
            // detect a bad request by validating required arguments
            var idObject = this._toIdObject(id);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }
            
            var invite = this._toInvite(inviteOrJson);

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                invite.setData(data);
                var connectionId = this.getLocationParameter(response, "connectionId");
                invite.setConnectionId(connectionId);
                return invite;
            };

            var requestArgs = lang.mixin(idObject, args || {});
            var options = {
                method : "POST",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : invite.createPostData()
            };
            
            var url = this.constructUrl(consts.AtomConnectionsDo, {}, {authType : this._getProfileAuthString()});
            return this.updateEntity(url, options, callbacks, args);
        },
        
        /**
         * Update profile tags. When you update profile tags, the existing tag information added by you is replaced with the new tag information.
         * To avoid this, retrieve the tags that you want to retain first, and send them back with this request. 
         * 
         * @method updateTags
         * @param {Array} tags
         * @param {String} targetEmailOrUserId email address or userid of the person whose profile you want to apply the tags to
         * @param {String} sourceEmailOrUserId email address or useridof the creator of the tags
         * @param args
         */
        updateTags : function(tags, targetEmailOrUserId, sourceEmailOrUserId, args) {
            // detect a bad request by validating required arguments
			var promise = this._validateProfileId(targetEmailOrUserId);
            if (promise) {
                return promise;
            }
            
            promise = this._validateProfileId(sourceEmailOrUserId);
            if (promise) {
                return promise;
            }
            
            var requestArgs = {};
            if (this.isEmail(targetEmailOrUserId)) {
            	requestArgs.targetEmail = targetEmailOrUserId;
            } else {
            	requestArgs.targetKey = targetEmailOrUserId;
            }
            if (this.isEmail(sourceEmailOrUserId)) {
            	requestArgs.sourceEmail = sourceEmailOrUserId;
            } else {
            	requestArgs.sourceKey = sourceEmailOrUserId;
            }
            lang.mixin(requestArgs, args || {});
            
            var callbacks = {
				createEntity : function(service, data, response) {
					return data; // Since this API does not return any response in case of success, returning empty data
				}
			};
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : this._createTagsPostData(tags)
            };
            
            
            var url = this.constructUrl(consts.AtomTagsDo, {}, {authType : this._getProfileAuthString()});

            return this.updateEntity(url, options, callbacks, args);
        },

        //
        // Internals
        //
        
        /*
         * Return callbacks for a profile feed
         */
        getProfileFeedCallbacks : function() {
            return ProfileFeedCallbacks;
        },
        
        /*
         * Return callbacks for a ColleagueConnection feed
         */
        getColleagueConnectionFeedCallbacks : function() {
            return ColleagueConnectionFeedCallbacks;
        },

        /*
         * Return callbacks for a profile entry
         */
        getProfileCallbacks : function() {
            return ProfileCallbacks;
        },

        /*
         * Return callbacks for a profile tag feed
         */
        getProfileTagFeedCallbacks : function() {
            return ProfileTagFeedCallbacks;
        },
        
        /*
         * Convert profile or key to id object
         */
        _toIdObject : function(profileOrId) {
            var idObject = {};
            if (lang.isString(profileOrId)) {
                var userIdOrEmail = profileOrId;
                if (this.isEmail(userIdOrEmail)) {
                    idObject.email = userIdOrEmail;
                } else {
                    idObject.userid = userIdOrEmail;
                }
            } else if (profileOrId instanceof Profile) {
                if (profileOrId.getUserid()) {
                    idObject.userid = profileOrId.getUserid();
                }
                else if (profileOrId.getEmail()) {
                    idObject.email = profileOrId.getEmail();
                }
            }
            return idObject;
        },
        
        /*
         * Convert profile or key to target object
         */
        _toTargetObject : function(profileOrId) {
            var targetObject = {};
            if (lang.isString(profileOrId)) {
                var userIdOrEmail = profileOrId;
                if (this.isEmail(userIdOrEmail)) {
                	targetObject.targetEmail = userIdOrEmail;
                } else {
                	targetObject.targetKey = userIdOrEmail;
                }
            } else if (profileOrId instanceof Profile) {
                if (profileOrId.getUserid()) {
                	targetObject.targetKey = profileOrId.getUserid();
                }
                else if (profileOrId.getEmail()) {
                	targetObject.targetEmail = profileOrId.getEmail();
                }
            }
            return targetObject;
        },
        
        /*
         * Validate an ID object
         */
        _validateIdObject : function(idObject) {
            if (!idObject.userid && !idObject.email) {
                return this.createBadRequestPromise("Invalid argument, userid or email must be specified.");
            }
        },
        
        /*
         * Validate an Target object
         */
        _validateTargetObject : function(idObject) {
            if (!idObject.targetKey && !idObject.targetEmail) {
                return this.createBadRequestPromise("Invalid argument, userid or email must be specified.");
            }
        },
        
        /*
         * Return a Profile instance from Profile or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toProfile : function(profileOrJsonOrString,args) {
            if (profileOrJsonOrString instanceof Profile) {
                return profileOrJsonOrString;
            } else {
            	var profileJson = profileOrJsonOrString;
            	if (lang.isString(profileOrJsonOrString)) {
            		profileJson = {};
            		if(this.isEmail(profileOrJsonOrString)){
            			profileJson.email = profileOrJsonOrString;
            		}else{
            			profileJson.userid = profileOrJsonOrString;
            		}
                }else{ // handle the case when the profileJson has id attribute. id can take either userid or email.
                	if(profileJson && profileJson.id && !profileJson.userid && !profileJson.email){
                		this.isEmail(profileJson.id) ? profileJson.email = profileJson.id : profileJson.userid = profileJson.id;
                		delete profileJson.id;
                	}
                }
                return new Profile({
                    service : this,
                    _fields : lang.mixin({}, profileJson)
                });
            }
        },
        
        /*
         * Return a Invite instance from Invite or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toInvite : function(inviteOrJsonOrString,args) {
            if (inviteOrJsonOrString instanceof Invite) {
                return inviteOrJsonOrString;
            } else {
            	if (lang.isString(inviteOrJsonOrString)) {
            		inviteOrJsonOrString = {
            			content : inviteOrJsonOrString
            		};
                } 
                return new Invite({
                    service : this,
                    _fields : lang.mixin({}, inviteOrJsonOrString)
                });
            }
        },
        
        /*
         * Returns true if an address field has been set.
         */
        _isAddressSet : function(profile){
        	return (profile._fields["streetAddress"] || profile._fields["extendedAddress"] || profile._fields["locality"] || profile._fields["region"] || profile._fields["postalCode"] || profile._fields["countryName"]);
        },
        
        /*
         * Validate a Profile object
         */
        _validateProfile : function(profile) {
            if (!profile || (!profile.getUserid() && !profile.getEmail())) {
                return this.createBadRequestPromise("Invalid argument, profile with valid userid or email must be specified.");
            }            
        },
        
        /*
         * Validate a Profile id
         */
        _validateProfileId : function(profileId) {
            if (!profileId || profileId.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected userid or email");
            }
        },
        
        _getProfileAuthString : function(){
        	if (this.endpoint.authType == consts.AuthTypes.Basic) {
        		return basicAuthString;
        	} else if (this.endpoint.authType == consts.AuthTypes.OAuth) {
        		return OAuthString;
        	} else {
        		return defaultAuthString;
        	}
        },
        
        _createTagsPostData : function(tags) {
        	var value = "";
            for (var i=0; i< tags.length;i++) {
                value += stringUtil.transform(CategoryTmpl, { "tag" : tags[i] });
            }
            var postData = stringUtil.transform(createProfileTagsTemplate, {"createTags" : value});
            return stringUtil.trim(postData);
        }

    });
    return ProfileService;
});

},
'sbt/Cache':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The cache implements the Least Recently Used (LRU)Algorithm by doubly linked list. Every node has 4 variables - key, value, next and previous.
 * The key stores the key of the node and value stores the actual data for the key. The next and previous variables point to the 
 * next and previous nodes in the cache. 
 *  The cache has a head variable pointing to the top cache node and a tail variable pointing to the last cache node.
 *
 *   Head ->  A --->  B  --->  C ---> D  <--  Tail
 *              <---     <---   <---
 *
 * Suppose the cache has 4 entries and its max size limit is 4 (the cache is full right now). The structure of the cache would be as described by figure above.
 * The entries are listed as per their order of recent access. 
 * So when a new entry E is added to the cache, the new order of the cache entries would be EABC. D would be deleted from the cache.
 * 
 * @module sbt.Cache
 */
define(['./declare'],function(declare) {
	var Cache = declare(null, {	
		constructor: function(max) {
			this.limit = max;// This is the maximum limit of the cache.
			this._cache = {};//Variable to hold the items in the cache.
			this.head = null;// Pointer to the head of the cache
			this.tail = null;// Pointer to the tail of the cache
			this.count = 0;// Counter for number of items in the cache
		},
		get: function _cg(key) { //Retrieves a cached item.
			var k = this._cache[key];
			if(k){//Item found in the cache. Move the accessed node to the top of the cache.
				if(this.head == k){return k.value;} // the node is already at the top, no need to shift, just return the value.
				else{// shift the node to the top and return the value
					if(k.prev)k.prev.next = k.next;
					if(k.next){k.next.prev = k.prev;} else {this.tail=k.prev;}
					k.next  = this.head; 
					this.head.prev = k; 
					k.prev = null; 
					this.head = k; 
				}
				return k.value;
			}
			return null; // the node is not in the cache
		},
		put: function _cp(key,value) {// puts a node in the cache if the node is not present in the cache. The node is put at the top of the cache.
			if(this._cache[key])//remove the asked node
				{this.remove(key); this.count --;}
			
			var k = this._cache[key] ={key:key, value:value};
			if(this.count==this.limit) //if the cache is full, remove the last node
				{this.remove(this.tail.key);this.count --;}
	        //add the asked node to the top of the list.
			k.next = this.head;
		    if(k.next)k.next.prev = k;else this.tail = k;
		    this.head = k;
		    k.prev = null;
		    this.count ++;
		 },
		remove: function _cr(key) {//removes a node from the cache and updates the next and prev attributes of the surrounding nodes.
			var k = this._cache[key];
			if(k){
				if(k.next)k.next.prev = k.prev;else this.tail = k.prev;
				if(k.prev)k.prev.next = k.next; else this.head = k.next;
				k.next = k.prev = null;
				delete this._cache[key];
				this.count -- ;
			}
			
		},
		
		/**
		 * Function that browse the content of the cache and call a call back method for each entry.
		 * 
		 * @param callback the callback method to invoke for each entry
		 */
		browse: function(callback) {
			if(callback) {
				for(var i in this._cache) {
					var e = this._cache[i];
					var r = callback(e.key,e.value);
					if(r) {
						return r;
					}
				}
				return null;
			}
			return null;
		}
	});

	return Cache;
});
},
'sbt/GadgetTransport':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Implements a transport for when the SDK is used from a gadget.
 * @module
 */
define(['./declare','./lang'],function(declare,lang) {
    var MethodTypes = {
        'POST':   gadgets.io.MethodType.POST,
        'PUT':    gadgets.io.MethodType.PUT,
        'DELETE': gadgets.io.MethodType.DELETE,
        'GET':    gadgets.io.MethodType.GET
    };
    var ContentTypes = {
        'XML':                   gadgets.io.ContentType.DOM, 
        'JSON':                  gadgets.io.ContentType.JSON, 
        'TEXT':                  gadgets.io.ContentType.TEXT, 
        'JSON-COMMENT-OPTIONAL': gadgets.io.ContentType.JSON,
        'JSON-COMMENT-FILTERED': gadgets.io.ContentType.JSON,
        'JAVASCRIPT':            gadgets.io.ContentType.JSON
    };
    var AuthorizationTypes = {
            'NONE':    gadgets.io.AuthorizationType.NONE, 
            'OAUTH':   gadgets.io.AuthorizationType.OAUTH, 
            'OAUTH2':  gadgets.io.AuthorizationType.OAUTH2, 
            'SIGNED':  gadgets.io.AuthorizationType.SIGNED
    };
    return declare(null, {
        serviceName: null,
        constructor: function(args) {
            this.serviceName = args.serviceName || null;
        },
        /**
         * Performs an XHR request using the gadget APIs.
         * Warning this is not a final module.  Not everything is supported as of yet.
         * @param {String} method The HTTP method to use.
         * @param {Object} args The arguments for the XHR request.
         * @param {boolean} hasBody Indicates whether there is a request body.  
         */
        xhr: function(method,args,hasBody) {
            //TODO OAuth support
            if(args.sync) {
                throw new Error('Gadget transport does not support synchronous requests.');
            }
            
            var params = {};
            params[gadgets.io.RequestParameters.METHOD]        = MethodTypes[method.toUpperCase()] || gadgets.io.MethodType.GET;
            params[gadgets.io.RequestParameters.CONTENT_TYPE]  = ContentTypes[args.handleAs ? args.handleAs.toUpperCase() : 'TEXT'];
            params[gadgets.io.RequestParameters.HEADERS]       = args.headers || {};
            params[gadgets.io.RequestParameters.POST_DATA]     = this.getPostData(params[gadgets.io.RequestParameters.METHOD], args.postData || args.putData);
            if(args.preventCache) {
                params[gadgets.io.RequestParameters.REFRESH_INTERVAL] = 0;
            }
            if(this.serviceName || args.serviceName) {
                params[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME] = this.serviceName || args.serviceName;
            }
            if(args.authType) {
                var authorization = args.authType.toUpperCase();
                params[gadgets.io.RequestParameters.AUTHORIZATION] = AuthorizationTypes[authorization] || AuthorizationTypes['NONE'];
            }
            
            var self = this;
            var callback = function(response) {
                self.handleResponse(args, response);
            };
            
            var url = this.buildUrl(args);
            gadgets.io.makeRequest(url, callback, params);
        },
        handleResponse: function(args, response) {
            if(response.errors && response.errors.length > 0) {
                if (args.error || args.handle) {
                    var error = this.createError(response);
                    this.notifyError(args, error);
                }
            } else {
                if (response.oauthApprovalUrl) {
                    this.handleApproval(args, response);
                } else {
                    this.notifyResponse(args, response);
                }
            }
        },
        handleApproval: function(args, response) {
            var error = new Error();
            error.code = 401;
            error.response = lang.mixin({}, response);
            this.notifyError(args, error);
        },
        notifyResponse: function(args, response) {
            if (args.load || args.handle) {
                var ioArgs = {
                    'args' : args,
                    'headers' : response.headers,
                    '_ioargs' : response
                };
                if (args.handle) {
                    args.handle(response.data || response.text, ioArgs);
                }
                if (args.load) {
                    args.load(response.data || response.text, ioArgs);
                }
            }
        },
        notifyError: function(args, error) {
            if (args.handle) {
                args.handle(error);
            }
            if (args.error) {
                args.error(error);
            }
        },
        createError: function(response) {
            var error = new Error();
            error.code = response.rc;
            error.message = response.errors[0];
            error.response = lang.mixin({}, response);
            return error;
        },
        getPostData: function(method, postData) {
            if (method == gadgets.io.MethodType.POST ||
                method == gadgets.io.MethodType.PUT) {
                return postData;
            }
            return '';
        },
        buildUrl: function(args) {
            var params = [];
            var url = args.url;
            if (args.content) {
                for (name in args.content) {
                    var param = encodeURIComponent(name) + "=" + encodeURIComponent(args.content[name]);
                    params.push(param);
                }
                if (params.length > 0) {
                    var query = params.join("&");
                    url += (~url.indexOf('?') ? '&' : '?') + query;
                }
            }
            return url;
        }
    });
});
},
'sbt/connections/BlogPost':function(){
/*
 * � Copyright IBM Corp. 2012, 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * 
 * @module sbt.connections.BlogPost
 * @author Rajmeet Bal
 */
define(["../declare", "../lang", "../base/AtomEntity", "./BlogConstants", "../base/XmlDataHandler" ], 
    function(declare, lang, AtomEntity, consts, XmlDataHandler) {

    /**
     * BlogPost class represents a post for a Blogs feed returned by the
     * Connections REST API.
     * 
     * @class BlogPost
     * @namespace sbt.connections
     */
    var BlogPost = declare(AtomEntity, {

    	xpath : consts.BlogPostXPath,
    	namespaces : consts.BlogPostNamespaces,
    	
        /**
         * Construct a Blog Post.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return the value of IBM Connections blog post ID
         * entry document.
         * 
         * @deprecated Use getPostUuid instead.
         * @method getBlogPostUuid
         * @return {String} ID of the blog post
         */
        getBlogPostUuid : function() {
        	var postUuidPrefix = "urn:lsid:ibm.com:blogs:entry-";
        	var postUuid = this.getAsString("postUuid");
        	if(postUuid && postUuid.indexOf(postUuidPrefix) != -1){
        		postUuid = postUuid.substring(postUuidPrefix.length, postUuid.length);
        	}
            return postUuid;
        },

        /**
         * Sets id of IBM Connections blog post Id.
         * 
         * @deprecated Use setPostUuid instead
         * @method setBlogPostUuid
         * @param {String} BlogPostUuid of the blog post
         */
        setBlogPostUuid : function(postUuid) {
            return this.setAsString("postUuid", postUuid);
        },
        
        /**
         * Return the value of IBM Connections blog post ID.
         * 
         * @method getPostUuid
         * @return {String} Unique id of the blog post
         */
        getPostUuid : function() {
        	var postUuidPrefix = "urn:lsid:ibm.com:blogs:entry-";
        	var postUuid = this.getAsString("postUuid");
        	if(postUuid && postUuid.indexOf(postUuidPrefix) != -1){
        		postUuid = postUuid.substring(postUuidPrefix.length, postUuid.length);
        	}
            return postUuid;
        },

        /**
         * Sets id of IBM Connections blog post Id.
         * 
         * @method setPostUuid
         * @param {String} Unique id of the blog post
         */
        setPostUuid : function(postUuid) {
            return this.setAsString("postUuid", postUuid);
        },
        
        /**
         * Return the entry anchor for this blog post.
         * 
         * @method getEntryAnchor
         * @return {String} Entry anchor for this blog post
         */
        getEntryAnchor : function() {
            if(this.getTitle()){
                return this.getTitle().toLowerCase().replace(/\s/g,"_");
            }
        },
        
        /**
         * Return the bloghandle of the blog post.
         * 
         * @method getBlogHandle
         * @return {String} Blog handle of the blog post
         */
        getBlogHandle : function() {
        	var blogHandle = this.getAsString("blogHandle");
        	if(blogHandle){
        		return blogHandle;
        	}
        	var blogEntryUrlAlternate = this.getAsString("alternateUrl");
        	blogHandle = this.service._extractBlogHandle(blogEntryUrlAlternate);
            return blogHandle;
        },

        /**
         * Sets blog handle of IBM Connections blog post.
         * 
         * @method setBlogHandle
         * @param {String} blogHandle of the blog post's blog
         */
        setBlogHandle : function(blogHandle) {
            return this.setAsString("blogHandle", blogHandle);
        },
        
        /**
         * Return the value of IBM Connections blog post replies URL from blog ATOM
         * entry document.
         * 
         * @method getRepliesUrl
         * @return {String} Blog replies URL for the blog post
         */
        getRepliesUrl : function() {
            return this.getAsString("replies");
        },

        /**
         * Return tags of IBM Connections blog post
         * document.
         * 
         * @method getTags
         * @return {Object} Array of tags of the blog post
         */
        getTags : function() {
            return this.getAsArray("tags");
        },

        /**
         * Set new tags to be associated with this IBM Connections blog post.
         * 
         * @method setTags
         * @param {Object} Array of tags to be added to the blog post
         */

        setTags : function(tags) {
            return this.setAsArray("tags", tags);
        },
        
        /**
         * Return the replies url of the ATOM entry document.
         * 
         * @method getRepliesUrl
         * @return {String} Replies url
         */
        getRepliesUrl : function() {
            return this.getAsString("repliesUrl");
        },
        
        /**
         * Return the last updated dateRecommendations URL of the IBM Connections blog post from
         * blog ATOM entry document.
         * 
         * @method getRecommendationsURL
         * @return {String} Recommendations URL of the Blog Post
         */
        getRecommendationsURL : function() {
            return this.getAsString("recommendationsUrl");
        },
        
        /**
         * Return the Recommendations count of the IBM Connections blog post from
         * blog ATOM entry document.
         * 
         * @method getRecommendationsCount
         * @return {String} Last updated date of the Blog post
         */
        getRecommendationsCount : function() {
            return this.getAsNumber("rankRecommendations");
        },
        
        /**
         * Return the comment count of the IBM Connections blog post from
         * blog ATOM entry document.
         * 
         * @method getCommentCount
         * @return {String} Last updated date of the Blog post
         */
        getCommentCount : function() {
            return this.getAsNumber("rankComment");
        },
        
        /**
         * Return the hit count of the IBM Connections blog post from
         * blog ATOM entry document.
         * 
         * @method getHitCount
         * @return {String} Last updated date of the Blog post
         */
        getHitCount : function() {
            return this.getAsNumber("rankHit");
        },

        /**
         * Gets an source of IBM Connections Blog post.
         * 
         * @method getSource
         * @return {Object} Source of the blog post
         */
        getSource : function() {
            return this.getAsObject([ "sourceId", "sourceTitle", "sourceLink", "sourceLinkAlternate", "sourceUpdated", "sourceCategory" ]);
        },

        /**
         * Loads the blog post object with the atom entry associated with the
         * blog post. By default, a network call is made to load the atom entry
         * document in the blog post object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var blogPostUuid = this.getBlogPostUuid();
            var promise = this.service._validateBlogUuid(blogPostUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setDataHandler(new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BlogPostXPath
                    }));
                    return self;
                }
            };

            var requestArgs = lang.mixin({}, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            var url = null;
            url = this.service.constructUrl(consts.AtomBlogPostInstance, null, {
            	blogHomepageHandle : this.service.handle,
            	postUuid : blogPostUuid
			});
            return this.service.getEntity(url, options, blogPostUuid, callbacks);
        },

        /**
         * Remove this blog post
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deletePost(this.getBlogPostUuid(), args);
        },

        /**
         * Update this blog post
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updatePost(this, args);
        },
        
        /**
         * Save this blog post
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getBlogPostUuid()) {
                return this.service.updatePost(this, args);
            } else {
                return this.service.createPost(this, args);
            }
        },
        
        /**
         * Return comments associated with this blog post.
         * 
         * @method getComments
         * @param {Object} [args] Argument object
         */
        getComments : function(args) {
        	if(this.getRepliesUrl()){
        	    return this.service.getPostComments(this, args);
        	}
        	
            var blogHandle = this.getBlogHandle();
        	var entryAnchor = this.getEntryAnchor();
        	
        	return this.service.getEntryComments(blogHandle, entryAnchor, args);
        }
    });
    return BlogPost;
});

},
'sbt/connections/ActivityService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Activities application of IBM� Connections enables a team to collect, organize, share, and reuse work related to a project goal. The Activities API
 * allows application programs to create new activities, and to read and modify existing activities.
 * 
 * @module sbt.connections.ActivityService
 */
define(
		[ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./ActivityConstants", "./ConnectionsService", "../base/AtomEntity",
				"../base/BaseEntity", "../base/XmlDataHandler", "../xml" ],
		function(declare, config, lang, stringUtil, Promise, consts, ConnectionsService, AtomEntity, BaseEntity, XmlDataHandler, xml) {
			
			var ActivityCategory = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"${getType}\" label=\"${getType}\" />";
			var PositionTmpl = "<snx:position>${getPosition}</snx:position>";
			var CommunityTmpl = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"community_activity\" label=\"Community Activity\"/><snx:communityUuid>${getCommunityUuid}</communityUuid>"
					+ "<link rel=\"http://www.ibm.com/xmlns/prod/sn/container\" type=\"application/atom+xml\" href=\"${getCommunityUrl}\"/>";			
			var CompletedTmpl = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\" term=\"completed\" label=\"Completed\"/>";
			var TemplateTmpl = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\" term=\"template\"/>";
			var DueDateTmpl = "<snx:duedate>${getDueDate}</duedate>";
			var InReplytoTmpl = "<thr:in-reply-to ref=\"${getInReplyToId}\" type=\"application/atom+xml\" href=\"${getInReplyToUrl}\" source=\"${getActivityUuid}\" />";
			var FieldTmpl = "<snx:field name=\"${name}\" fid=\"${fid}\" position=\"${position}\" type=\"${type}\">${getText}${getPerson}${getDate}${getLink}${getFile}</snx:field>";
			var TextFieldTmpl = "<summary type=\"text\">${summary}</summary>";
			var PersonFieldTmpl = "<name>${personName}</name> <email>{email}</email> <snx:userid>${userId}</snx:userid>";
			var LinkFieldTmpl = "<link href=\"${url\}\" title=\"${title}\" />";
			var DateFieldTmpl = "${date}";
			var IconTmpl = "<snx:icon>${getIconUrl}</snx:icon>";
			var AssignedToTmpl = "<snx:assignedto name=\"${getAssignedToName}\" userid=\"${getAssignedToUserId}\">${getAssignedToEmail}</snx:assignedto>";
			var RoleTmpl = "<snx:role xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\" component=\"http://www.ibm.com/xmlns/prod/sn/activities\">${getRole}</snx:role>";
			var MemberCategory = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"${getCategory}\" label=\"${getCategory}\" />";
			var ActivityIdTmpl = "<snx:activity>${getActivityUuid}</snx:activity>";
			var ActivityNodeIdTmpl = "<id>urn:lsid:ibm.com:oa:${getActivityNodeUuid}</id>";

			var extractId = function(id, token) {
				//decode uri component returns "null" for null input
				if(id) id = decodeURIComponent(id); // to make sure the Id doesnt contain encoded characters
				if (id) {
					var index = id.indexOf(token);
					if (index != -1) {
						var len = token.length;
						id = id.substring(index + len);
					}
				}
				return id;
			};

			var transformer = function(value, key) {
				if (value) {
					return value;
				}
			};

			/**
			 * Field class represents a Field in an Activity Node.
			 * 
			 * @class Field
			 * @namespace sbt.connections
			 */
			var Field = declare(null, {
				name : null,
				fid : null,
				position : null,
				type : null,

				/**
				 * Returns Field Name
				 * @method getName
				 * @returns {String} field name
				 */
				getName : function() {
					return this.name;
				},

				/**
				 * Sets Field Name
				 * @method setName
				 * @param {String} field name
				 */
				setName : function(newName) {
					this.name = newName;
				},

				/**
				 * Returns Field ID
				 * @method getFid
				 * @returns {String} field ID
				 */
				getFid : function() {
					return this.fid;
				},

				/**
				 * Returns Field Position
				 * @method getPosition
				 * @returns {String} field position
				 */
				getPosition : function() {
					return this.position;
				},

				/**
				 * Returns Field Type
				 * @method getType
				 * @returns {String} field type
				 */
				getType : function() {
					return this.type;
				}
			});

			/**
			 * TextField class represents a Text Field in an Activity Node.
			 * 
			 * @class TextField
			 * @namespace sbt.connections
			 */
			var TextField = declare(Field, {
				summary : null,

				/**
				 * Returns Field Summary
				 * @method getSummary
				 * @returns {String} field summary
				 */
				getSummary : function() {
					return this.summary;
				},

				/**
				 * Sets Field Summary
				 * @method setSummary
				 * @param {String} field summary
				 */
				setSummary : function(newSumamry) {
					this.summary = newSummary;
				}

			});

			/**
			 * DateField class represents a Date Field in an Activity Node.
			 * 
			 * @class DateField
			 * @namespace sbt.connections
			 */
			var DateField = declare(Field, {
				date : null,

				/**
				 * Returns Field Date
				 * @method getDate
				 * @returns {Date} field date
				 */
				getDate : function() {
					return this.date;
				},
				/**
				 * Sets Field Date
				 * @method setDate
				 * @param {Date} field date
				 */
				setDate : function(newDate) {
					this.date = newDate;
				}

			});

			/**
			 * LinkField class represents a Link Field in an Activity Node.
			 * 
			 * @class LinkField
			 * @namespace sbt.connections
			 */
			var LinkField = declare(Field, {
				url : null,
				title : null,
				/**
				 * Returns Link Field URL
				 * @method getUrl
				 * @returns {String} field Url
				 */
				getUrl : function() {
					return this.url;
				},
				/**
				 * Sets Link Field URL
				 * @method setUrl
				 * @param {String} field Url
				 */
				setUrl : function(newUrl) {
					this.url = newUrl;
				},
				/**
				 * Returns Link Field Title
				 * @method getTitle
				 * @returns {String} field Title
				 */
				getTitle : function() {
					return this.title;
				},
				/**
				 * Sets Link Field Title
				 * @method setTitle
				 * @param {String} field Title
				 */
				setTitle : function(title) {
					this.title = title;
				}

			});

			/**
			 * FileField class represents a File Field in an Activity Node.
			 * 
			 * @class FileField
			 * @namespace sbt.connections
			 */
			var FileField = declare(Field, {
				url : null,
				fileType : null,
				size : null,
				length : null,
				/**
				 * Returns File Field URL
				 * @method getUrl
				 * @returns {String} field URL
				 */
				getUrl : function() {
					return this.url;
				},
				/**
				 * Returns File Field File Type
				 * @method getFileType
				 * @returns {String} File Type
				 */
				getFileType : function() {
					return this.type;
				},

				/**
				 * Returns File Field File Size
				 * @method getSize
				 * @returns {String} File Size
				 */
				getSize : function() {
					return this.size;
				},
				/**
				 * Returns File Field File Length
				 * @method getLength
				 * @returns {String} File Length
				 */
				getLength : function() {
					return this.length;
				}
			});

			/**
			 * PersonField class represents a Person Field in an Activity Node.
			 * 
			 * @class PersonField
			 * @namespace sbt.connections
			 */
			var PersonField = declare(Field, {
				personName : null,
				userId : null,
				email : null,

				/**
				 * Returns Person Name
				 * @method getPersonName
				 * @returns {String} Person Name
				 */
				getPersonName : function() {
					return this.personName;
				},
				/**
				 * Sets Person Name
				 * @method setPersonName
				 * @param {String} Person Name
				 */
				setPersonName : function(newName) {
					this.personName = newName;
				},
				/**
				 * Returns Person User ID
				 * @method getUserId
				 * @returns {String} Person User ID
				 */
				getUserId : function() {
					return this.userId;
				},
				/**
				 * Sets Person User ID
				 * @method setUserId
				 * @param {String} Person User ID
				 */
				setUserId : function(newUserId) {
					this.userId = newUserId;
				},
				/**
				 * Returns Person Email
				 * @method getEmail
				 * @returns {String} Person Email
				 */
				getEmail : function() {
					return this.email;
				},
				/**
				 * Sets Person Email
				 * @method setEmail
				 * @param {String} Person Email
				 */
				setEmail : function(newEmail) {
					this.email = newEmail;
				}
			});

			/**
			 * Tag class represents an entry for a Tag feed returned by the Connections REST API.
			 * 
			 * @class Tag
			 * @namespace sbt.connections
			 */
			var Tag = declare(BaseEntity, {
				/**
				 * Construct a Tag entity.
				 * 
				 * @constructor
				 * @param args
				 */
				constructor : function(args) {
				},

				/**
				 * Returns tag term
				 * @method getTerm
				 * @returns {String} tag term
				 */
				getTerm : function() {
					return this.getAsString("term");
				},
				/**
				 * Returns tag frequency
				 * @method getFrequency
				 * @returns {String} tag frequency
				 */
				getFrequency : function() {
					return this.getAsString("frequency");
				},

				/**
				 * Returns tag bin
				 * @method getBin
				 * @returns {String} tag bin
				 */
				getBin : function() {
					return this.getAsString("bin");
				}
			});

			/**
			 * Activity class represents an entry for a activities feed returned by the Connections REST API.
			 * 
			 * @class Activity
			 * @namespace sbt.connections
			 */
			var Activity = declare(AtomEntity, {

				xpath : consts.ActivityNodeXPath,
				namespaces : consts.ActivityNamespaces,
				contentType : "html",
				categoryScheme : null,

				/**
				 * Construct an Activity entity.
				 * 
				 * @constructor
				 * @param args
				 */
				constructor : function(args) {
				},

				/**
				 * Sets template for category Scheme
				 */
				setCategoryScheme : function() {
					this.categoryScheme = stringUtil.transform(ActivityCategory, this, transformer, this);
				},
							

				/**
				 * Returns the ID
				 * @method getUuid
				 * @returns {String} Uuid
				 */
				getUuid : function() {
					var _id = this.id || this._fields.id || this.getId();
					this.id = _id;
					this._fields.id = _id;
					return _id;
				},

				/**
				 * Return the value of id from result ATOM entry document.
				 * 
				 * @method getActivityUuid
				 * @return {String} ID of the activity
				 */
				getActivityUuid : function() {
					return extractId(this.getUuid(), "urn:lsid:ibm.com:oa:");
				},

				/**
				 * Returns the Author LdapId
				 * 
				 * @method getAuthorLdapId
				 * @returns {Stirng} authorLdapId
				 */
				getAuthorLdapId : function() {
					return this.getAsString("authorLdapid");
				},

				/**
				 * Returns the contributor LdapId
				 * 
				 * @method getContributorLdapId
				 * @returns {Object} contributor
				 */
				getContributorLdapId : function() {
					return this.getAsString("contributorLdapid");
				},

				/**
				 * Returns Activity Node Type
				 * 
				 * @method getType
				 * @returns {String} type
				 */
				getType : function() {
					return this.getAsString("type");
				},

				/**
				 * Sets Activity Node Type
				 * @method setType
				 * @param {String} type
				 */
				setType : function(type) {
					return this.setAsString("type", type);
				},
				/**
				 * Returns Activity Node Priority
				 * 
				 * @method getPriority
				 * @returns {String} priority
				 */
				getPriority : function() {
					return this.getAsString("priority");
				},

				/**
				 * Return tags of IBM Connections activity from activity ATOM entry document.
				 * 
				 * @method getTags
				 * @return {Object} Array of tags of the activity
				 */
				getTags : function() {
					return this.getAsArray("tags");
				},

				/**
				 * Set new tags to be associated with this IBM Connections activity.
				 * 
				 * @method setTags
				 * @param {Object} Array of tags to be added to the activity
				 */

				setTags : function(tags) {
					return this.setAsArray("tags", tags);
				},

				/**
				 * Returns the dueDate Date
				 * 
				 * @method getDueDate
				 * @returns {Date} DueDate
				 */
				getDueDate : function() {
					return this.getAsDate("dueDate");
				},

				/**
				 * Sets the Due Date of Activity
				 * @method setDueDate
				 * @param {Date} dueDate
				 */
				setDueDate : function(dueDate) {
					return this.setAsDate("dueDate", dueDate);
				},

				/**
				 * Returns Activity Node Members Url
				 * 
				 * @method getMembersUrl
				 * @returns {String} membersUrl
				 */
				getMembersUrl : function() {
					return this.getAsString("membersUrl");
				},

				/**
				 * Returns Activity Node History Url
				 * 
				 * @method getHistoryUrl
				 * @returns {String} historyUrl
				 */
				getHistoryUrl : function() {
					return this.getAsString("historyUrl");
				},

				/**
				 * Returns Activity Node Templates Url
				 * 
				 * @method getTemplatesUrl
				 * @returns {String} templatesUrl
				 */
				getTemplatesUrl : function() {
					return this.getAsString("templatesUrl");
				},

				/**
				 * Returns Activity Position
				 * 
				 * @method getPosition
				 * @returns {String} position
				 */
				getPosition : function() {
					return this.getAsString("position");
				},

				/**
				 * Sets Activity Position
				 * @method setPosition
				 * @param position
				 */
				setPosition : function(position) {
					return this.setAsString("position", position);
				},

				/**
				 * Returns Completed Flag for Activity
				 * @method isCompleted
				 * @returns {Boolean} completed flag
				 */
				isCompleted : function() {
					return this.getAsBoolean("categoryFlagCompleted");
				},

				/**
				 * Set Completed Flag
				 * @param {Boolean} completed
				 * @returns
				 */
				setCompleted : function(completed) {
					return this.setAsBoolean("categoryFlagCompleted", completed);
				},

				/**
				 * Get Delete Flag
				 * 
				 * @returns {Boolean} isDelete
				 */
				isDeleted : function() {
					return this.getAsBoolean("categoryFlagDelete");
				},

				/**
				 * Gets Teplate Flag
				 * 
				 * @returns {Boolean} template
				 */
				isTemplate : function() {
					return this.getAsBoolean("categoryFlagTemplate");
				},

				/**
				 * Sets Template Flag
				 * 
				 * @param {Boolean} templateFlag
				 */
				setTemplate : function(templateFlag) {
					return this.setAsBoolean("categoryFlagTemplate", templateFlag);
				},

				/**
				 * Returns Activity Node Depth
				 * 
				 * @method getDepth
				 * @returns {String} depth
				 */
				getDepth : function() {
					return this.getAsString("depth");
				},

				/**
				 * Returns Activity Node Permissions
				 * 
				 * @method getPermissions
				 * @returns {String} permissions
				 */
				getPermissions : function() {
					return this.getAsString("permissions");
				},

				/**
				 * Returns Activity Node IconUrl
				 * 
				 * @method getIconUrl
				 * @returns {String} iconUrl
				 */
				getIconUrl : function() {
					return this.getAsString("iconUrl");
				},

				/**
				 * setIconUrl
				 * @param iconUrl
				 */
				setIconUrl : function(iconUrl) {
					return this.setAsString("iconUrl", iconUrl);
				},

				/**
				 * getCommunityUuid
				 * @method getCommunityUuid
				 * @returns {String} communityUuid
				 */
				getCommunityUuid : function() {
					return this.getAsString("communityUuid");
				},

				/**
				 * setCommunityUuid
				 * @method setCommunityUuid
				 * @param communityUuid
				 */
				setCommunityUuid : function(communityUuid) {
					return this.setAsString("communityUuid", communityUuid);
				},
				/**
				 * getCommunityUrl
				 * @method getCommunityUrl
				 * @returns {String} communityUrl
				 */
				getCommunityUrl : function() {
					return this.getAsString("communityUrl");
				},

				/**
				 * setCommunityUrl
				 * @method setCommunityUrl
				 * @param communityUrl
				 */
				setCommunityUrl : function(communityUrl) {
					return this.setAsString("communityUrl", communityUrl);
				},

				/**
				 * Loads the Activity object with the atom entry associated with the activity. By default, a network call is made to load the atom entry
				 * document in the activity object.
				 * 
				 * @method load
				 */
				load : function() {
					var promise = this.service.validateField("activityUuid", this.getActivityUuid());
					if (promise) {
						return promise;
					}
					var requestArgs = {
						"activityNodeUuid" : this.getActivityUuid()
					};
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs
					};					
					var self = this;
					var callbacks = {
						createEntity : function(service, data, response) {														
							self.setData(data, response);
							return self;
						}
					};
					return this.service.getEntity(consts.AtomActivityNode, options, this.getActivityUuid(), callbacks);
				},

				/**
				 * Creates an activity, sends an Atom entry document containing the new activity to the user's My Activities feed.
				 * 
				 * @method create
				 * @returns {Object} Activity
				 */
				create : function() {
					return this.service.createActivity(this);
				},

				/**
				 * updates an activity, send a replacement Atom Entry document containing the modified activity to the existing activity's edit URL
				 * @method update
				 * @returns {Object} activity
				 */
				update : function() {
					return this.service.updateActivity(this);
				},

				/**
				 * Deletes an activity entry, sends an HTTP DELETE method to the edit web address specified for the node.
				 * 
				 * @method deleteActivity
				 */
				deleteActivity : function() {
					return this.service.deleteActivity(this.getActivityUuid());
				},

				/**
				 * Restores a deleted activity, use a HTTP PUT request. This moves the activity from the trash feed to the user's My Activities feed.
				 * 
				 * @method restore
				 */
				restore : function() {
					return this.service.restoreActivity(this.getActivityUuid());
				},

				/**
				 * Adds a member to the access control list of an activity, sends an Atom entry document containing the new member to the access control list
				 * feed. You can only add one member per post.
				 * @method addMember
				 * @param {Object} memberOrJson
				 */
				addMember : function(memberOrJson) {
					return this.service.addMember(this.getActivityUuid(), memberOrJson);
				},

				/**
				 * Removes a member from the acl list for an application, use the HTTP DELETE method.
				 * @method removeMember
				 * @param {String} memberId
				 */
				removeMember : function(memberId) {
					return this.service.deleteMember(this.getActivityUuid(), memberId);
				},

				/**
				 * Updates a member in the access control list for an application, sends a replacement member entry document in Atom format to the existing ACL
				 * node's edit web address.
				 * @method updateMember
				 * @param {Object} memberOrJson
				 */
				updateMember : function(memberOrJson) {
					return this.service.updateMember(this.getActivityUuid(), memberOrJson);
				},

				/**
				 * Retrieves a member from the access control list for a application, use the edit link found in the member entry in the ACL list feed.
				 * @method getMember
				 * @param {String} memberId
				 * @returns {Object} Member
				 */
				getMember : function(memberId) {
					return this.service.getMember(this.getActivityUuid(), memberId);
				},

				/**
				 * Retrieves activity members from the access control list for a application, use the edit link found in the member entry in the ACL list feed.
				 * @method getMembers
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} members
				 */
				getMembers : function(requestArgs) {
					return this.service.getMembers(this.getActivityUuid(), requestArgs);
				},

				/**
				 * Creats an entry in an activity, such as a to-do item or to add a reply to another entry, send an Atom entry document containing the new
				 * activity node of the appropriate type to the parent activity's node list.
				 * 
				 * @mehtod createActivityNode
				 * @param {Object} activityNodeOrJson
				 * @returns {Object} ActivityNode
				 */
				createActivityNode : function(activityNodeOrJson) {
					return this.service.createActivityNode(this.getActivityUuid(), activityNodeOrJson);
				},

				/**
				 * Returns the tags for given actiivity
				 * @method getActivityTags
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} tags
				 */
				getActivityTags : function(requestArgs) {
					return this.service.getActivityTags(this.getActivityUuid(), requestArgs);
				},
				/**
		         * Return contributor element to be included in post data for this ATOM entry.
		         * 
		         * @method createContributor
		         * @returns {String}
		         */
		        createContributor : function() {
		        	return "";
		        },
				
				/**
				* Return extra entry data to be included in post data for this ATOM entry.
				* 
				* @method createEntryData
				* @returns {String}
				*/
				createEntryData : function() {
					var postData = "";
					if (this.getPosition && this.getPosition()) {
						postData += stringUtil.transform(PositionTmpl, this, transformer, this);
					}
					if (this.getCommunityUuid && this.getCommunityUuid()) {
						postData += stringUtil.transform(CommunityTmpl, this, transformer, this);
					}
					if (this.getActivityUuid && this.getActivityUuid()) {
						postData += stringUtil.transform(ActivityIdTmpl, this, transformer, this);
					}
					if (this.getActivityNodeUuid && this.getActivityNodeUuid()) {
						postData += stringUtil.transform(ActivityNodeIdTmpl, this, transformer, this);
					}
					if (this.isCompleted && this.isCompleted()) {
						postData += CompletedTmpl;
					}
					if (this.getDueDate && this.getDueDate()) {
						postData += stringUtil.transform(DueDateTmpl, this, transformer, this);
					}
					if (this.getInReplyToId && this.getInReplyToId()) {
						postData += stringUtil.transform(InReplytoTmpl, this, transformer, this);
					}
					if (this.getAssignedToUserId && this.getAssignedToUserId()) {
						postData += stringUtil.transform(AssignedToTmpl, this, transformer, this);
					}
					if (this.getIconUrl && this.getIconUrl()) {
						postData += stringUtil.transform(IconTmpl, this, transformer, this);
					}
					if (this.isTemplate && this.isTemplate()) {
						postData += TemplateTmpl;
					}

					if (this.getFields && this.getFields().length > 0) {
						var fields = this.getFields();
						for ( var counter in fields) {
							var field = fields[counter];
							var innerXml = "";
							var trans = function(value, key) {
								if (field[key]) {
									value = xml.encodeXmlEntry(field[key]);
								} else if (innerXml != "") {
									value = innerXml;
								}
								return value;
							};
							var tmpl = TextFieldTmpl;
							if (field.type == "person") {
								tmpl = PersonFieldTmpl;
							} else if (field.type == "link") {
								tmpl = LinkFieldTmpl;
							} else if (field.type == "date") {
								tmpl = DateFieldTmpl;
							}
							innerXml = stringUtil.transform(tmpl, this, trans, this);
							postData += stringUtil.transform(FieldTmpl, this, trans, this);
						}
					}

					return postData;
				}
			});

			/**
			 * Activity Node class represents an entry for a activities Node feed returned by the Connections REST API.
			 * 
			 * @class ActivityNode
			 * @namespace sbt.connections
			 */
			var ActivityNode = declare(Activity, {
				/**
				 * Construct a Result entity.
				 * 
				 * @constructor
				 * @param args
				 */
				constructor : function(args) {
				},

				/**
				 * Return the value of id from result ATOM entry document.
				 * 
				 * @method getActivityNodeUuid
				 * @return {String} ID of the result
				 */
				getActivityNodeUuid : function() {
					return extractId(this.getUuid(), "urn:lsid:ibm.com:oa:");
				},

				/**
				 * Return the value of activity uuid from result ATOM entry document.
				 * 
				 * @method getActivityUuid
				 * @return {String} cctivityUuid of the result
				 */
				getActivityUuid : function() {
					return this.getAsString("activityUuid");
				},

				/**
				 * 
				 * @param activityUuid
				 * @returns
				 */
				setActivityUuid : function(activityUuid) {
					return this.setAsString("activityUuid", activityUuid);
				},

				/**
				 * getInReplyToId
				 * @returns {String} getInReplyToId
				 */
				getInReplyToId : function() {
					return this.getAsString("inReplyToId");
				},

				/**
				 * getInReplyToUrl
				 * @returns {String} getInReplyToUrl
				 */
				getInReplyToUrl : function() {
					return this.getAsString("inReplyToUrl");
				},
				/**
				 * 
				 * @param inReplytoId
				 * @param inReplyToUrl
				 * @param inReplyToActivity
				 */
				setInReplyTo : function(inReplyToId, inReplyToUrl) {
					var id = "urn:lsid:ibm.com:oa:" + inReplyToId;
					var inReplyTo = {
						"inReplyToId" : id,
						"inReplyToUrl" : inReplyToUrl
					};

					return this.setAsObject(inReplyTo);
				},

				/**
				 * getAssignedToUserId
				 * @returns {String} getAssignedToUserId
				 */
				getAssignedToUserId : function() {
					return this.getAsString("assignedToUserId");
				},

				/**
				 * getAssignedToName
				 * @returns {String} getAssignedToName
				 */
				getAssignedToName : function() {
					return this.getAsString("assignedToName");
				},

				/**
				 * getAssignedToEmail
				 * @returns {String} getAssignedToEmail
				 */
				getAssignedToEmail : function() {
					return this.getAsString("assignedToEmail");
				},

				/**
				 * Sets Assigned to in fields for creating playload
				 * @method setAssignedTo
				 * @param {String} assignedToUserId
				 * @param {String} assignedToName
				 * @param {String} assignedToEmail
				 * @returns
				 */
				setAssignedTo : function(assignedToUserId, assignedToName, assignedToEmail) {
					var assignedTo = {
						"assignedToUserId" : assignedToUserId,
						"assignedToName" : assignedToName,
						"assignedToEmail" : assignedToEmail
					};
					return this.setAsObject(assignedTo);
				},

				/**
				 * returns Text Fields in Activity node feed
				 * @returns {Array} textFields
				 */
				getTextFields : function() {
					var nodes = this.getAsNodesArray("textFields");
					var textFields = [];
					for ( var counter in nodes) {
						var node = nodes[counter];
						var textField = new TextField();
						for ( var i = 0; i < node.attributes.length; i++) {
							var attr = node.attributes[i];
							var attrName = attr.name;
							var attrValue = attr.value;
							textField[attrName] = attrValue;
						}
						var dataHandler = new XmlDataHandler({
							service : this.service,
							data : node,
							namespaces : consts.Namespaces,
							xpath : consts.TextFieldXPath
						});
						textField.summary = dataHandler.getAsString("summary");
						textFields.push(textField);
						this.addTextField(textField);
					}
					return textFields;
				},

				/**
				 * Adds a test field
				 * @param {Object} textField
				 * @returns
				 */
				addTextField : function(textField) {
					if (this._fields["fields"]) {
						this._fields["fields"].push(textField);
						return this;
					} else {
						return this.setAsArray("fields", [ textField ]);
					}
				},

				/**
				 * returns Date Fields in Activity node feed
				 * @returns {Array} dateFields
				 */
				getDateFields : function() {
					var nodes = this.getAsNodesArray("dateFields");
					var dateFields = [];
					for ( var counter in nodes) {
						var node = nodes[counter];
						var dateField = new DateField;
						for ( var i = 0; i < node.attributes.length; i++) {
							var attr = node.attributes[i];
							var attrName = attr.name;
							var attrValue = attr.value;
							dateField[attrName] = attrValue;
						}
						dateField["date"] = new Date(stringUtil.trim(node.textContent));
						dateFields.push(dateField);
						this.addDateField(dateField);
					}
					return dateFields;
				},

				/**
				 * adds a DateField
				 * @param {Object} DateField
				 * @returns
				 */
				addDateField : function(dateField) {
					if (this._fields["fields"]) {
						this._fields["fields"].push(dateField);
						return this;
					} else {
						return this.setAsArray("fields", [ dateField ]);
					}
				},

				/**
				 * returns Link Fields in Activity node feed
				 * @returns {Array} linkFields
				 */
				getLinkFields : function() {
					var nodes = this.getAsNodesArray("linkFields");
					var linkFields = [];
					for ( var counter in nodes) {
						var node = nodes[counter];
						var linkField = new LinkField;
						for ( var i = 0; i < node.attributes.length; i++) {
							var attr = node.attributes[i];
							var attrName = attr.name;
							var attrValue = attr.value;
							linkField[attrName] = attrValue;
						}
						var dataHandler = new XmlDataHandler({
							service : this.service,
							data : node,
							namespaces : consts.Namespaces,
							xpath : consts.LinkFieldXPath
						});
						linkField.url = dataHandler.getAsString("url");
						linkField.title = dataHandler.getAsString("title");
						linkFields.push(linkField);
						this.addLinkField(linkField);
					}
					return linkFields;
				},

				/**
				 * Adds a LinkField
				 * @param {Object} LinkField
				 * @returns
				 */
				addLinkField : function(linkField) {
					if (this._fields["fields"]) {
						this._fields["fields"].push(linkField);
						return this;
					} else {
						return this.setAsArray("fields", [ linkField ]);
					}
				},

				/**
				 * returns Person Fields in Activity node feed
				 * @returns {Array} personFields
				 */
				getPersonFields : function() {
					var nodes = this.getAsNodesArray("personFields");
					var personFields = [];
					for ( var counter in nodes) {
						var node = nodes[counter];
						var personField = new PersonField;
						for ( var i = 0; i < node.attributes.length; i++) {
							var attr = node.attributes[i];
							var attrName = attr.name;
							var attrValue = attr.value;
							personField[attrName] = attrValue;
						}
						var dataHandler = new XmlDataHandler({
							service : this.service,
							data : node,
							namespaces : consts.Namespaces,
							xpath : consts.PersonFieldXPath
						});
						personField.personName = dataHandler.getAsString("name");
						personField.userId = dataHandler.getAsString("userId");
						personField.email = dataHandler.getAsString("email");
						personFields.push(personField);
						this.addPersonField(personField);
					}
					return personFields;
				},

				/**
				 * adds a person fields to activity node
				 * @param {Object} PersonField
				 * @returns
				 */
				addPersonField : function(personField) {
					if (this._fields["fields"]) {
						this._fields["fields"].push(personField);
						return this;
					} else {
						return this.setAsArray("fields", [ personField ]);
					}
				},

				/**
				 * returns File Fields in Activity node feed
				 * @returns {Array} fileFields
				 */
				getFileFields : function() {
					var nodes = this.getAsNodesArray("fileFields");
					var fileFields = [];
					for ( var counter in nodes) {
						var node = nodes[counter];
						var fileField = new FileField;
						for ( var i = 0; i < node.attributes.length; i++) {
							var attr = node.attributes[i];
							var attrName = attr.name;
							var attrValue = attr.value;
							fileField[attrName] = attrValue;
						}
						var dataHandler = new XmlDataHandler({
							service : this.service,
							data : node,
							namespaces : consts.Namespaces,
							xpath : consts.FileFieldXPath
						});
						fileField.url = dataHandler.getAsString("url");
						fileField.size = dataHandler.getAsString("size");
						fileField.type = dataHandler.getAsString("type");
						fileField.length = dataHandler.getAsString("length");
						fileFields.push(fileField);
					}
					return fileFields;
				},

				/**
				 * returns all fields in activity nodes feed
				 * @returns {Array} fields
				 */
				getFields : function() {
					if (this._fields.fields && this._fields.fields.length > 0) {
						return this._fields.fields;
					}
					var fields = [];
					var textFields = this.getTextFields();
					var personFields = this.getPersonFields();
					var linkFields = this.getLinkFields();
					var fileFields = this.getFileFields();
					var dateFields = this.getDateFields();
					for ( var counter in textFields) {
						var field = textFields[counter];
						feilds.push(field);
					}
					for ( var counter in personFields) {
						var field = personFields[counter];
						feilds.push(field);
					}
					for ( var counter in linkFields) {
						var field = linkFields[counter];
						feilds.push(field);
					}
					for ( var counter in fileFields) {
						var field = fileFields[counter];
						feilds.push(field);
					}
					for ( var counter in dateFields) {
						var field = dateFields[counter];
						feilds.push(field);
					}
					return fields;
				},

				setFields : function(fields) {
					this._fields["fields"] = fields;
				},

				/**
				 * Loads the ActivityNode object with the atom entry associated with the activity node. By default, a network call is made to load the atom
				 * entry document in the ActivityNode object.
				 * 
				 * @method load
				 */
				load : function() {
					var promise = this.service.validateField("activityNodeUuid", this.getActivityNodeUuid());
					if (promise) {
						return promise;
					}
					var requestArgs = {
						"activityNodeUuid" : this.getActivityNodeUuid()
					};
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs
					};					
					var self = this;
					var callbacks = {
						createEntity : function(service, data, response) {							
							self.setData(data, response);						
							return self;
						}
					};
					return this.service.getEntity(consts.AtomActivityNode, options, this.getActivityNodeUuid(), callbacks);
				},
				
				/**
				 * Creats an entry in an activity, such as a to-do item or to add a reply to another entry, send an Atom entry document containing the new
				 * activity node of the appropriate type to the parent activity's node list.
				 * 
				 * @mehtod create
				 * @param {String} activityUuid
				 * @returns {Object} ActivityNode
				 */
				create : function(activityUuid) {
					return this.service.createActivityNode(activityUuid, this);
				},

				/**
				 * updates an activity node entry, sends a replacement Atom entry document containing the modified activity node to the existing activity's edit
				 * web address.
				 * @method update
				 * @returns {Object} activityNode
				 */
				update : function() {
					return this.service.updateActivityNode(this);
				},

				/**
				 * Deletes an activity node entry, sends an HTTP DELETE method to the edit web address specified for the node.
				 * 
				 * @method deleteActivityNode
				 */
				deleteActivityNode : function() {
					return this.service.deleteActivityNode(this.getActivityNodeUuid());
				},
				/**
				 * Restores a deleted entry to an activity, sends a HTTP PUT request to the edit web address for the node defined in the trash feed. This moves
				 * the entry from the trash feed to the user's activity node list.
				 * 
				 * @method restoreActivityNode
				 */
				restore : function() {
					return this.service.restoreActivityNode(this.getActivityNodeUuid());
				},
				
				/**
				 * Changes certain activity entries from one type to another.
				 * 
				 * <pre> 
				 * <b>The following types of entries can be changed to other types:</b>
				 * chat
				 * email
				 * entry
				 * reply
				 * todo<
				 * </pre>
				 * 
				 * @method changeEntryType
				 * @param {String} newType
				 * @returns {Object} ActivityNode
				 */
				changeEntryType : function(newType) {
					this.setType(newType);
					return this.service.changeEntryType(this);
				},
				
				/**
				 * Moves a standard entry or a to-do entry to a section in an activity, send an updated Atom entry document to the parent activity's node list.
				 * 
				 * @method moveToSection
				 * @param {String} sectionId
				 * @param {String} [newTitle]
				 * @returns {Object} ActivityNode
				 */
				moveToSection : function(sectionId, newTitle) {
					return this.service.moveEntryToSection(this, sectionId);
				}			

			});

			/**
			 * Member class represents an entry for a members feed returned by the Connections REST API.
			 * 
			 * @class Member
			 * @namespace sbt.connections
			 */
			var Member = declare(AtomEntity, {
				
				xpath : consts.MemberXPath,
		    	namespaces : consts.ActivityNamespaces,
		    	categoryScheme : null,
		    	
		    	/**
				 * Sets template for category Scheme
				 */
				setCategoryScheme : function() {
					this.categoryScheme = stringUtil.transform(MemberCategory, this, transformer, this);
				},
				
				/**
				 * Return the member Id
				 * 
				 * @method getMemberId
				 * @return {String} ID of the result
				 */
				getMemberId : function() {
					return extractId(this.getId(), "&memberid=");
				},				

				/**
				 * Get role
				 * @method getRole
				 * @returns {String} role
				 */
				getRole : function() {
					return this.getAsString("role");
				},

				/**
				 * Set role
				 * @method setRole
				 * @param {String} role
				 * @returns
				 */
				setRole : function(role) {
					return this.setAsString("role", role);
				},
				
				/**
				 * getPermissions
				 * @method getPermissions
				 * @returns {Array} permissions
				 */
				getPermissions : function() {
					var permissions = this.getAsString("permissions");
					if (permissions) {
						return permissions.split(", ");
					}
					return permissions;
				},
				
				/**
				 * getCategory
				 * @method getCategory
				 * @returns {String} category
				 */
				getCategory : function() {
					this.getAsString("category");
				},

				/**
				 * setCategory
				 * @method setCategory
				 * @param {String} category
				 */
				setCategory : function(category) {
					this.setAsString("category", category);
				},
				
				/**
				 * get contributor user ID
				 * @method getUserId
				 * @returns {String} userId
				 */
				getUserId : function() {
					return this.getContributor().userid;
				},

				/**
				 * Sets the contributor user ID
				 * @method setUserId
				 * @param {String} userId
				 */
				setUserId : function(userId) {
					return this.setAsString("contributorUserid", userId);
				},
				
				// Overriding the below methods since they are not relevant for Activity Member Entity in Post Data
				
				 /**
		         * Return title element to be included in post data for this ATOM entry.
		         * 
		         * @method createTitle
		         * @returns {String}
		         */
		        createTitle : function() {
		        	return "";
		        },
		        

		        /**
		         * Return content element to be included in post data for this ATOM entry.
		         * 
		         * @method createContent
		         * @returns {String}
		         */
		        createContent : function() {
		        	return "";
		        },
		        
		        /**
		         * Return summary element to be included in post data for this ATOM entry.
		         * 
		         * @method createSummary
		         * @returns {String}
		         */
		        createSummary : function() {
		        	return "";
		        },
		        
		        // Overriding the above methods since they are not relevant for Activity Member Entity in Post Data
		        
		        /**
		         * Return extra entry data to be included in post data for this entity.
		         * 
		         * @returns {String}
		         */
		        createEntryData : function() {
		        	var postData = "";		            
		            postData += stringUtil.transform(RoleTmpl, this, transformer, this);
		            return stringUtil.trim(postData);
		        },


				/**
				 * Loads the Member object with the atom entry part with the activity. By default, a network call is made to load the atom entry document in the
				 * Member object.
				 * 
				 * @method load
				 * @param {Stirng} activityUuid The Activity ID
				 */
				load : function(activityUuid) {

					var promise = this.service.validateField("memberId", this.getMemberId());
					if (!promise) {
						promise = this.service.validateField("activityUuid", activityUuid);
					}
					if (promise) {
						return promise;
					}
					var options = {
						method : "GET",
						handleAs : "text"
					};

					var url = this.service.constructUrl(consts.AtomActivitiesMember, null, {
						"activityUuid" : activityUuid,
						"memberId" : this.getMemberId()
					});
					
					var self = this;
					var callbacks = {
						createEntity : function(service, data, response) {
							// This is required because the feed starts from <feed> insttead of <entry>
							var feedHandler = new XmlDataHandler({
								data : data,
								namespaces : consts.ActivityNamespaces,
								xpath : consts.MemberXPath
							});
							var entry = feedHandler.data;							
							self.setData(entry, response);					
							return self;
						}
					};
					
					return this.service.getEntity(url, options, this.getMemberId(), callbacks);
				},
				/**
				 * Adds a member to the access control list of an activity, sends an Atom entry document containing the new member to the access control list
				 * feed. You can only add one member per post.
				 * @method addToActivity
				 * @param {String} activityUuid
				 */
				addToActivity : function(actvitiyUuid) {
					return this.service.addMember(actvitiyUuid, this);
				},

				/**
				 * Removes a member from the acl list for an application, use the HTTP DELETE method.
				 * @method removeFromActivity
				 * @param {String} activityUuid
				 */
				removeFromActivity : function(activityUuid) {
					return this.service.deleteMember(activityUuid, this.getMemberId());
				},

				/**
				 * Updates a member in the access control list for an application, sends a replacement member entry document in Atom format to the existing ACL
				 * node's edit web address.
				 * @method updateInActivity
				 * @param {String} activityUuid
				 */
				updateInActivity : function(activityUuid) {
					return this.service.updateMember(activityUuid, this);
				}

			});

			/*
			 * Callbacks used when reading a feed that contains Tag entries.
			 */
			var TagFeedCallbacks = {
				createEntities : function(service, data, response) {
					return new XmlDataHandler({
						service : service,
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.TagXPath
					});
				},
				createEntity : function(service, data, response) {
					var entryHandler = new XmlDataHandler({
						service : service,
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.TagXPath
					});
					return new Tag({
						service : service,
						dataHandler : entryHandler
					});
				}
			};

			/*
			 * Callbacks used when reading a feed that contains activities entries.
			 */
			var MemberFeedCallbacks = {
				createEntities : function(service, data, response) {
					return new XmlDataHandler({
						service : service,
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.ActivitiesFeedXPath
					});
				},
				createEntity : function(service, data, response) {
					var entry = null;
					if (typeof data == "object") {
						entry = data;
					} else {
						var feedHandler = new XmlDataHandler({
							data : data,
							namespaces : consts.Namespaces,
							xpath : consts.MemberXPath
						});
						entry = feedHandler.data;
					}
					var entryHandler = new XmlDataHandler({
						data : entry,
						namespaces : consts.Namespaces,
						xpath : consts.MemberXPath
					});
					return new Member({
						service : service,
						dataHandler : entryHandler
					});
				}
			};

			/*
			 * Callbacks used when reading a feed that contains activities entries.
			 */
			var ActivityFeedCallbacks = {
				createEntities : function(service, data, response) {
					return new XmlDataHandler({
						service : service,
						data : data,
						namespaces : consts.ActivityNamespaces,
						xpath : consts.ActivitiesFeedXPath
					});
				},
				createEntity : function(service, data, response) {
					return new Activity({
						service : service,
						data : data
					});
				}
			};

			/*
			 * Callbacks used when reading a feed that contains activities nodes and activity entries.
			 */
			var ActivityNodeFeedCallbacks = {
				createEntities : function(service, data, response) {
					return new XmlDataHandler({
						service : service,
						data : data,
						namespaces : consts.ActivityNamespaces,
						xpath : consts.ActivitiesFeedXPath
					});
				},
				createEntity : function(service, data, response) {
					var entry = null;
					if (typeof data == "object") {
						entry = data;
					} else {
						var feedHandler = new XmlDataHandler({
							data : data,
							namespaces : consts.ActivityNamespaces,
							xpath : consts.ActivityNodeXPath
						});
						entry = feedHandler.data;
					} 
					return new ActivityNode({
						service : service,
						data : entry
					});
				}
			};

			/**
			 * ActivityService class which provides wrapper APIs to the Activities application of IBM� Connections which enables a team to collect, organize,
			 * share, and reuse work related to a project goal. The Activities API allows application programs to create new activities, and to read and modify
			 * existing activities.
			 * 
			 * @class ActivityService
			 * @namespace sbt.connections
			 */
			var ActivityService = declare(ConnectionsService, {

				contextRootMap : {
					activities : "activities"
				},
				
				serviceName : "activities",

				/**
				 * Constructor for ActivitiesService
				 * 
				 * @constructor
				 * @param args
				 */
				constructor : function(args) {
					if (!this.endpoint) {
						this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
					}
				},

				/**
				 * Get a list of all active activities that match a specific criteria.
				 * 
				 * @method getMyActivitiesU
				 * @param {Object} [requestArgs] Optional arguments like ps, page, asc etc.
				 * @returns {Array} Activity array
				 */
				getMyActivities : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesMy, options, ActivityFeedCallbacks);
				},

				/**
				 * Get a list of all active activity nodes that match a specific criteria in an activity.
				 * 
				 * @method getActivityNodes
				 * @param {String} activityUuid The Activity I
				 * @param {Object} [requestArgs] Optional arguments like ps, page, asc etc.
				 * @returns {Array} ActivityNode array
				 */
				getActivityNodes : function(activityUuid, requestArgs) {
					var args = lang.mixin(requestArgs || {}, {
						"nodeUuid" : activityUuid
					});

					var options = {
						method : "GET",
						handleAs : "text",
						query : args
					};

					return this.getEntities(consts.AtomActivityNodes, options, ActivityNodeFeedCallbacks);
				},

				/**
				 * Search for content in all of the activities, both completed and active, that matches a specific criteria.
				 * 
				 * @method getAllActivities
				 * @param requestArgs
				 * @returns {Array} Activity array
				 */
				getAllActivities : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesEverything, options, ActivityFeedCallbacks);
				},

				/**
				 * Search for a set of completed activities that match a specific criteria.
				 * 
				 * @method getCompletedActivities
				 * @param {Object} [requestArgs] The optional arguments
				 * @returns {Array} Activity array
				 */
				getCompletedActivities : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesCompleted, options, ActivityFeedCallbacks);
				},

				/**
				 * Retrieve an activity node entry, uses the edit link found in the corresponding activity node in the user's My Activities feed.
				 * 
				 * @method getActivityNode
				 * @param {String} activityNodeUuid the ID of Activity Node
				 * @returns {Object} ActivityNode
				 */
				getActivityNode : function(activityNodeUuid) {
					var promise = this.validateField("activityNodeUuid", activityNodeUuid);
					if (promise) {
						return promise;
					}
					var activityNode = this.newActivityNode(activityNodeUuid);
					return activityNode.load();
				},

				/**
				 * Retrieve an activity entry, uses the edit link found in the corresponding activity node in the user's My Activities feed.
				 * 
				 * @method getActivity
				 * @param {String} activityUuid the ID of Activity
				 * @returns {Object} Activity
				 */
				getActivity : function(activityUuid) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}
					var activity = this.newActivity(activityUuid);
					return activity.load();
				},

				/**
				 * Creats an entry in an activity, such as a to-do item or to add a reply to another entry, send an Atom entry document containing the new
				 * activity node of the appropriate type to the parent activity's node list.
				 * 
				 * @mehtod createActivityNode
				 * @param {String} activityUuid
				 * @param {Object} activityNodeOrJson
				 * @returns {Object} ActivityNode
				 */
				createActivityNode : function(activityUuid, activityNodeOrJson) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (!promise) {
						promise = this.validateField("activityNodeOrJson", activityNodeOrJson);
					}
					if (promise) {
						return promise;
					}
					var activityNode = this.newActivityNode(activityNodeOrJson);
					activityNode.setActivityUuid(activityUuid);
					activityNode.setCategoryScheme();
					var payload = activityNode.createPostData();
					var requestArgs = {
						"activityUuid" : activityUuid
					};

					var options = {
						method : "POST",
						headers : consts.AtomXmlHeaders,
						query : requestArgs,
						data : payload
					};

					return this.updateEntity(consts.AtomCreateActivityNode, options, ActivityNodeFeedCallbacks);
				},

				/**
				 * Creates an activity, sends an Atom entry document containing the new activity to the user's My Activities feed.
				 * 
				 * @method createActivity
				 * @param {Object} activityOrJson
				 * @returns {Object} Activity
				 */
				createActivity : function(activityOrJson) {
					var promise = this.validateField("activityOrJson", activityOrJson);
					if (promise) {
						return promise;
					}
					var activity = this.newActivity(activityOrJson);
					activity.setType(consts.ActivityNodeTypes.Activity);
					activity.setCategoryScheme();
					var payload = activity.createPostData();

					var options = {
						method : "POST",
						headers : consts.AtomXmlHeaders,
						data : payload
					};

					return this.updateEntity(consts.AtomActivitiesMy, options, ActivityFeedCallbacks);
				},

				_validateActivityNode : function(activityNode, checkUuid, checkType) {
					if (checkUuid && !activityNode.getActivityNodeUuid()) {
						return this.createBadRequestPromise("Invalid argument, activity node with UUID must be specified.");
					}
					if (checkType && !activityNode.getType()) {
						return this.createBadRequestPromise("Invalid argument, activity node with Type must be specified.");
					}
				},

				_validateActivity : function(activity, checkUuid) {
					if (checkUuid && !activity.getActivityUuid()) {
						return this.createBadRequestPromise("Invalid argument, activity with UUID must be specified.");
					}
				},
				/**
				 * updates an activity node entry, sends a replacement Atom entry document containing the modified activity node to the existing activity's edit
				 * web address.
				 * @method updateActivityNode
				 * @param {Object} activityNodeOrJson ActivityNode or Json Object with Uuid populated
				 * @returns {Object} ActivityNode
				 */
				updateActivityNode : function(activityNodeOrJson) {
					var promise = this.validateField("activityNodeOrJson", activityNodeOrJson);
					if (promise) {
						return promise;
					}
					var newActivityNode = this.newActivityNode(activityNodeOrJson);
					promise = this._validateActivityNode(newActivityNode, true);
					if (promise) {
						return promise;
					}
					return this._update(newActivityNode, ActivityNodeFeedCallbacks);
				},

				/**
				 * Updates an activity, send a replacement Atom Entry document containing the modified activity to the existing activity's edit URL
				 * @method updateActivity
				 * @param {Object} activityOrJson Activity or Json Object
				 * @returns {Object} Activity
				 */
				updateActivity : function(activityOrJson) {
					var promise = this.validateField("activityOrJson", activityOrJson);
					if (promise) {
						return promise;
					}
					var newActivity = this.newActivity(activityOrJson);
					promise = this._validateActivity(newActivity, true);
					if (promise) {
						return promise;
					}
					return this._update(activityOrJson, ActivityFeedCallbacks);
				},

				_update : function(activityOrActivityNode, callbacks) {
					var promise = new Promise();
					var _this = this;
					var uuid = extractId(activityOrActivityNode.getUuid());
					var update = function() {
						activityOrActivityNode.setCategoryScheme();
						var payload = activityOrActivityNode.createPostData(); 
						var requestArgs = {
							"activityNodeUuid" : uuid
						};
						var options = {
							method : "PUT",
							headers : consts.AtomXmlHeaders,
							query : requestArgs,
							data : payload
						};
						_this.updateEntity(consts.AtomActivityNode, options, callbacks).then(function(node) {
							promise.fulfilled(node);
						}, function(error) {
							promise.rejected(error);
						});
					};
					if (activityOrActivityNode.isLoaded()) {
						update();
					} else {
						var fields = activityOrActivityNode._fields;
						activityOrActivityNode.load().then(function() {
							activityOrActivityNode._fields = fields;
							update();
						}, function(error) {
							promise.rejected(error);
						});
					}
					return promise;
				},
				/**
				 * Changes certain activity entries from one type to another.
				 * 
				 * <pre> 
				 * <b>The following types of entries can be changed to other types:</b>
				 * chat
				 * email
				 * entry
				 * reply
				 * todo<
				 * /pre>
				 * 
				 * @method changeEntryType
				 * @param {Object} activityNodeOrJson ActivityNode or Json object with Uuid and type populated
				 * @returns {Object} ActivityNode
				 */
				changeEntryType : function(activityNodeOrJson) {
					var promise = this.validateField("activityNodeOrJson", activityNodeOrJson);
					if (promise) {
						return promise;
					}
					var activityNode = this.newActivityNode(activityNodeOrJson);
					promise = this._validateActivityNode(activityNode, true, true);

					return this.updateActivityNode(activityNode);
				},

				/**
				 * Moves a standard entry or a to-do entry to a section in an activity, send an updated Atom entry document to the parent activity's node list.
				 * 
				 * @method moveEntryToSection
				 * @param {Object} activityNodeOrJson
				 * @param {Object} sectionNodeOrJsonOrId section activityNode or Json Object or Section ID
				 * @returns {Object} ActivityNode
				 */
				moveEntryToSection : function(activityNodeOrJson, sectionNodeOrJsonOrId) {
					var _this = this;
					var promise = this.validateField("activityNodeOrJson", activityNodeOrJson);
					if (!promise) {
						promise = this.validateField("sectionNodeOrJsonOrId", sectionNodeOrJsonOrId);
					}
					if (promise) {
						return promise;
					}
					var activityNode = this.newActivityNode(activityNodeOrJson);
					var sectionNode = this.newActivityNode(sectionNodeOrJsonOrId);
					promise = new Promise();
					var update = function() {
						activityNode.setInReplyTo(sectionNode.getActivityNodeUuid(), sectionNode.getSelfUrl());
						_this.updateActivityNode(activityNode).then(function(activityNode) {
							promise.fulfilled(activityNode);
						}, function(error) {
							promise.rejected(error);
						});
					};
					if (sectionNode.isLoaded()) {
						update();
					} else {
						sectionNode.load().then(function() {
							update();
						}, function(error) {
							promise.rejected(error);
						});
					}
					return promise;
				},

				/**
				 * Deletes an activity node entry, sends an HTTP DELETE method to the edit web address specified for the node.
				 * 
				 * @method deleteActivityNode
				 * @param {String} activityNodeUuid
				 */
				deleteActivityNode : function(activityNodeUuid) {
					var promise = this.validateField("activityNodeUuid", activityNodeUuid);
					if (promise) {
						return promise;
					}
					var requestArgs = {
						"activityNodeUuid" : activityNodeUuid
					};
					var options = {
						method : "DELETE",
						headers : consts.AtomXmlHeaders,
						query : requestArgs
					};

					return this.deleteEntity(consts.AtomActivityNode, options, activityNodeUuid);
				},

				/**
				 * Deletes an activity entry, sends an HTTP DELETE method to the edit web address specified for the node.
				 * 
				 * @method deleteActivity
				 * @param {String} activityUuid
				 */
				deleteActivity : function(activityUuid) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}
					return this.deleteActivityNode(activityUuid);
				},

				/**
				 * Restores a deleted activity, use a HTTP PUT request. This moves the activity from the trash feed to the user's My Activities feed.
				 * 
				 * @method restoreActivity
				 * @param {String} activityUuid
				 */
				restoreActivity : function(activityUuid) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}
					var _this = this;
					promise = new Promise();
					this.getActivityNodeFromTrash(activityUuid).then(function(deleted) {
						return deleted;
					}).then(function(activity) {
						if (!activity.isDeleted()) {
							promise.rejected("Activity is not in Trash");
						} else {
							var requestArgs = {
								"activityNodeUuid" : activityUuid
							};
							activity.setCategoryScheme();
							var options = {
								method : "PUT",
								headers : consts.AtomXmlHeaders,
								query : requestArgs,
								data : activity.createPostData()							
							};
							var callbacks = {
								createEntity : function(service, data, response) {
									return response;
								}
							};
							_this.updateEntity(consts.AtomActivityNodeTrash, options, callbacks).then(function(response) {
								promise.fulfilled(response);
							}, function(error) {
								promise.rejected(error);
							});
						}
					});
					return promise;
				},

				/**
				 * Restores a deleted entry to an activity, sends a HTTP PUT request to the edit web address for the node defined in the trash feed. This moves
				 * the entry from the trash feed to the user's activity node list.
				 * 
				 * @method restoreActivityNode
				 * @param {String} activityNodeUuid
				 */
				restoreActivityNode : function(activityNodeUuid) {
					var promise = this.validateField("activityNodeUuid", activityNodeUuid);
					if (promise) {
						return promise;
					}
					var _this = this;
					var promise = new Promise();
					this.getActivityNodeFromTrash(activityNodeUuid).then(function(deletedNode) {
						return deletedNode;
					}).then(function(activityNode) {
						if (!activityNode.isDeleted()) {
							promise.rejected("Activity Node is not in Trash");
						} else {
							var requestArgs = {
								"activityNodeUuid" : activityNodeUuid
							};
							activityNode.setCategoryScheme();
							var options = {
								method : "PUT",
								headers : consts.AtomXmlHeaders,
								query : requestArgs,
								data : activityNode.createPostData()							
							};
							var callbacks = {
								createEntity : function(service, data, response) {
									return response;
								}
							};
							_this.updateEntity(consts.AtomActivityNodeTrash, options, callbacks).then(function(response) {
								promise.fulfilled(response);
							}, function(error) {
								promise.rejected(error);
							});
						}
					});
					return promise;
				},

				/**
				 * Retrieves and activity node from trash
				 * 
				 * @method getActivityNodeFromTrash
				 * @param {String} activityNodeUuid
				 * @returns {Object} ActivityNode
				 */
				getActivityNodeFromTrash : function(activityNodeUuid) {
					var promise = this.validateField("activityNodeUuid", activityNodeUuid);
					if (promise) {
						return promise;
					}
					var requestArgs = {
						"activityNodeUuid" : activityNodeUuid
					};
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs
					};
					return this.getEntity(consts.AtomActivityNodeTrash, options, activityNodeUuid, ActivityNodeFeedCallbacks);
				},

				/**
				 * Returns a ActivityNode instance from ActivityNode or JSON or String. Throws an error if the argument was neither.
				 * 
				 * @method newActivityNode
				 * @param {Object} activityNodeOrJsonOrString The ActivityNode Object or json String for ActivityNode
				 */
				newActivityNode : function(activityNodeOrJsonOrString) {
					if (activityNodeOrJsonOrString instanceof ActivityNode || activityNodeOrJsonOrString instanceof Activity) {
						return activityNodeOrJsonOrString;
					} else {
						if (lang.isString(activityNodeOrJsonOrString)) {
							activityNodeOrJsonOrString = {
								id : activityNodeOrJsonOrString
							};
						}
						return new ActivityNode({
							service : this,
							_fields : lang.mixin({}, activityNodeOrJsonOrString)
						});
					}
				},

				/**
				 * Gets All activity nodes in trash which match given criteria
				 * @method getActivityNodesInTrash
				 * @param {String} activityUuid
				 * @param {Object} [requestArgs] optional arguments
				 * @returns {Array} ActivityNode list
				 */
				getActivityNodesInTrash : function(activityUuid, requestArgs) {

					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}
					var args = lang.mixin(requestArgs || {}, {
						"activityUuid" : activityUuid
					});
					var options = {
						method : "GET",
						handleAs : "text",
						query : args || {}
					};

					return this.getEntities(consts.AtomActivitiesTrash, options, ActivityNodeFeedCallbacks);

				},

				/**
				 * Returns a Activity instance from Activity or JSON or String. Throws an error if the argument was neither.
				 * @method newActivity
				 * @param {Object} activityOrJsonOrString The Activity Object or json String for Activity
				 */
				newActivity : function(activityOrJsonOrString) {

					if (activityOrJsonOrString instanceof Activity) {
						return activityOrJsonOrString;
					} else {
						if (lang.isString(activityOrJsonOrString)) {
							activityOrJsonOrString = {
								id : activityOrJsonOrString
							};
						}
						return new Activity({
							service : this,
							_fields : lang.mixin({}, activityOrJsonOrString)
						});
					}
				},

				/**
				 * Search for a set of to-do items that match a specific criteria.
				 * 
				 * @method getAllToDos
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} ActivityNode Array
				 */
				getAllToDos : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesToDos, options, ActivityFeedCallbacks);
				},

				/**
				 * Search for a set of tags that match a specific criteria.
				 * @method getAllTags
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array}
				 */
				getAllTags : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesTags, options, TagFeedCallbacks);
				},

				/**
				 * Search for sctivities in trash which math a specif criteria
				 * 
				 * @method getActivitiesInTrash
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} activities
				 */
				getActivitiesInTrash : function(requestArgs) {
					var options = {
						method : "GET",
						handleAs : "text",
						query : requestArgs || {}
					};

					return this.getEntities(consts.AtomActivitiesTrash, options, ActivityFeedCallbacks);

				},

				/**
				 * Returns the tags for given actiivity
				 * @method getActivityTags
				 * @param {String} activityUuid
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} tags
				 */
				getActivityTags : function(activityUuid, requestArgs) {

					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}

					var args = lang.mixin(requestArgs || {}, {
						"activityUuid" : activityUuid
					});

					var options = {
						method : "GET",
						handleAs : "text",
						query : args || {}
					};

					return this.getEntities(consts.AtomActivitiesTags, options, TagFeedCallbacks);
				},

				/**
				 * Returns the tags for given actiivity node.
				 * @method getActivityNodeTags
				 * @param activityNodeUuid
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} tags
				 */
				getActivityNodeTags : function(activityNodeUuid, requestArgs) {

					var promise = this.validateField("activityNodeUuid", activityNodeUuid);
					if (promise) {
						return promise;
					}
					var args = lang.mixin(requestArgs || {}, {
						"activityNodeUuid" : activityNodeUuid
					});

					var options = {
						method : "GET",
						handleAs : "text",
						query : args || {}
					};

					return this.getEntities(consts.AtomActivitiesTags, options, TagFeedCallbacks);
				},

				/**
				 * Retrieves activity members from the access control list for a application, use the edit link found in the member entry in the ACL list feed.
				 * @method getMembers
				 * @param {String} activityUuid
				 * @param {Object} [requestArgs] the optional arguments
				 * @returns {Array} members
				 */
				getMembers : function(activityUuid, requestArgs) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (promise) {
						return promise;
					}
					var args = lang.mixin(requestArgs || {}, {
						"activityUuid" : activityUuid
					});

					var options = {
						method : "GET",
						handleAs : "text",
						query : args || {}
					};

					return this.getEntities(consts.AtomActivitiesMembers, options, MemberFeedCallbacks);
				},

				_validateMember : function(member, checkId, checkUserIdOrEmail) {
					if (checkId && !member.getMemberId()) {
						return this.createBadRequestPromise("Invalid argument, member with ID must be specified.");
					}
					if (checkUserIdOrEmail) {
						var id = member.getContributor().userid || member.getContributor().email;
						if (!id) {
							return this.createBadRequestPromise("Invalid argument, member with User ID or Email must be specified.");
						}
					}
				},

				/**
				 * Retrieves a member from the access control list for a application, use the edit link found in the member entry in the ACL list feed.
				 * @method getMember
				 * @param {String} activityUuid
				 * @param {String} memberId
				 * @returns {Object} Member
				 */
				getMember : function(activityUuid, memberId) {

					var promise = this.validateField("memberId", memberId);
					if (!promise) {
						promise = this.validateField("activityUuid", activityUuid);
					}
					if (promise) {
						return promise;
					}
					var member = this._toMember(memberId);
					return member.load(activityUuid);
				},

				/**
				 * Adds a member to the access control list of an activity, sends an Atom entry document containing the new member to the access control list
				 * feed. You can only add one member per post.
				 * @method addMember
				 * @param {String} activityUuid
				 * @param {Object} memberOrJson
				 */
				addMember : function(activityUuid, memberOrJson) {
					var promise = this.validateField("memberOrJson", memberOrJson);
					if (!promise) {
						promise = this.validateField("activityUuid", activityUuid);
					}
					if (promise) {
						return promise;
					}
					var member = this._toMember(memberOrJson);
					promise = this._validateMember(member, false, true);
					if (promise) {
						return promise;
					}
					if (!member.getRole()) {
						member.setRole("member");
					}
					member.setCategoryScheme();
					var payload = member.createPostData(); 
					var requestArgs = {
						"activityUuid" : activityUuid
					};
					var options = {
						method : "POST",
						headers : consts.AtomXmlHeaders,
						query : requestArgs,
						data : payload
					};
					var callbacks = {
						createEntity : function(service, data, response) {
							return response;
						}
					};

					return this.updateEntity(consts.AtomActivitiesMembers, options, callbacks);

				},

				/**
				 * Updates a member in the access control list for an application, sends a replacement member entry document in Atom format to the existing ACL
				 * node's edit web address.
				 * @method updateMember
				 * @param {String} activityUuid
				 * @param {Object} memberOrJson
				 */
				updateMember : function(activityUuid, memberOrJson) {
					var promise = this.validateField("memberOrJson", memberOrJson);
					if (!promise) {
						promise = this.validateField("activityUuid", activityUuid);
					}
					if (promise) {
						return promise;
					}
					var member = this._toMember(memberOrJson);
					promise = this._validateMember(member, true, true);
					if (promise) {
						return promise;
					}
					member.setCategoryScheme();
					var payload = member.createPostData();
					var requestArgs = {
						"activityUuid" : activityUuid,
						"memberid" : member.getMemberId()
					};

					var options = {
						method : "PUT",
						headers : consts.AtomXmlHeaders,
						query : requestArgs,
						data : payload
					};

					var callbacks = {
						createEntity : function(service, data, response) {
							return response;
						}
					};

					return this.updateEntity(consts.AtomActivitiesMembers, options, callbacks);

				},

				/**
				 * Removes a member from the acl list for an application, use the HTTP DELETE method.
				 * @method deleteMember
				 * @param {String} activityUuid
				 * @param {String} memberId
				 */
				deleteMember : function(activityUuid, memberId) {
					var promise = this.validateField("activityUuid", activityUuid);
					if (!promise) {
						promise = this.validateField("memberId", memberId);
					}
					if (promise) {
						return promise;
					}
					var requestArgs = {
						"activityUuid" : activityUuid,
						"memberid" : memberId
					};
					var options = {
						method : "DELETE",
						headers : consts.AtomXmlHeaders,
						query : requestArgs
					};

					return this.deleteEntity(consts.AtomActivitiesMembers, options, memberId);
				},

				_toMember : function(memberOrJsonOrString) {
					if (memberOrJsonOrString) {
						if (memberOrJsonOrString instanceof Member) {
							return memberOrJsonOrString;
						}
						var member = new Member({
							service : this
						});
						if (lang.isString(memberOrJsonOrString)) {							
							memberOrJsonOrString = {									
								id : memberOrJsonOrString									
							};
						}
						member._fields = lang.mixin({}, memberOrJsonOrString);
						if(member._fields.userId) {
							member._fields.contributorUserid = member._fields.userId;
						}
						return member;
					}
				},

				/**
				 * Returns a Member instance from Member or JSON or String. Throws an error if the argument was neither.
				 * @method newMember
				 * @param {Object} memberOrJsonOrString The Member Object or json String for Member
				 */
				newMember : function(memberOrJsonOrString) {
					return this._toMember(memberOrJsonOrString);
				}					
			});
			return ActivityService;
		});

},
'sbt/base/JsonDataHandler':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * Helpers for the base capabilities of data handlers.
 * 
 * @module sbt.base.JsonDataHandler
 */
define(["../declare", "../lang", "../json", "./DataHandler", "../Jsonpath", "../stringUtil"], 
    function(declare, lang, json, DataHandler, jsonPath, stringUtil) {

    /**
     * JsonDataHandler class
     * 
     * @class JsonDataHandler
     * @namespace sbt.base
     */     
	var JsonDataHandler = declare(DataHandler, {	
		
        /**
         * Data type for this DataHandler is 'json'
         */
        dataType : "json",
		
        /**
         * Set of jsonpath expressions used by this handler.
         */
        jsonpath : null,
        
        /**
         * Set of values that have already been read.
         */
        _values : null,
        
	    /**
	     * @constructor
	     * @param {Object} args Arguments for this data handler.
	     */     
		constructor : function(args) {
            lang.mixin(this, args);
            this._values = {}; 
            this.data = args.data;
		},
        
        /**
         * @method getAsString
         * @param data
         * @returns
         */
        getAsString : function(property) {
        	this._validateProperty(property, "getAsString");
        	if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._get(property).toString();
                }
                return this._values[property];
            } else {
                return _get(property);
            }
        },

        /**
         * @method getAsNumber
         * @returns
         */
        getAsNumber : function(property) {
        	this._validateProperty(property, "getAsNumber");
        	if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._getNumber(property); 
                }
                return this._values[property];
            } else {
                return _getNumber(property);
            }
        },

        /**
         * @method getAsDate
         * @returns
         */
        getAsDate : function(property) {
        	this._validateProperty(property, "getAsDate");
        	if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._getDate(property); 
                }
                return this._values[property];
            } else {
                return _getDate(property);
            }
        },

        /**
         * @method getAsBoolean
         * @returns
         */
        getAsBoolean : function(property) {
        	this._validateProperty(property, "getAsBoolean");
        	if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._getBoolean(property); 
                }
                return this._values[property];
            } else {
                return _getBoolean(property);
            }                    
        },

        /**
         * @method getAsArray
         * @returns
         */
        getAsArray : function(property) {
        	this._validateProperty(property, "getAsArray");
        	if (this._values) {
                if (!this._values.hasOwnProperty(property)) {
                    this._values[property] = this._get(property);
                }
                return this._values[property];
            } else {
                return _get(property);
            }       
        },

        /**
         * @method getEntityId
         * @returns
         */
        getEntityId : function(data) {
        	return stringUtil.trim(this.getAsString(this.jsonpath["id"]));
        },

        /**
         * getEntityData
         * @returns
         */
        getEntityData : function() {            
            return this.data;
        },
        
        /**
         * @method getSummary
         * @returns
         */
        getSummary : function() {
        	if (!this._summary && this._get("totalResults")[0]) {
                this._summary = {
                	totalResults : this.getAsNumber("totalResults"),
                	startIndex : this.getAsNumber("startIndex"),
                	itemsPerPage : this.getAsNumber("itemsPerPage")
                };
            }
            return this._summary;
        },
        
        /**
         * @method getEntitiesDataArray
         * @returns {Array}
         */
        getEntitiesDataArray : function() {
        	var entityJPath = this._getJPath("entry");
        	var resultingArray = this._get(entityJPath);
        	return resultingArray[0];
        },
        
        /**
         * @method toJson
         * @returns {Object}
         */
        toJson : function() {
        	return this.data;
        },
        
        //
        // Internals
        //
        
        _getDate : function(property) {
        	var text = this._get(property)[0];
        	if(text instanceof Date) {
        		return text;
        	}
        	else {
        		return new Date(text);
        	}
        },
        
        _getBoolean : function(property) {
        	var text = this._get(property)[0];
        	return text ? true : false;
        },
        
        _getNumber : function(property) {
        	var text = this._get(property)[0];
        	// if it is a Number
        	if(typeof text === 'number')
        		return text;
        	//if its an array, we return the length of the array
        	else if(lang.isArray(text))
        		return text.length;
        	//if its a string or any other data type, we convert to number and return. Invalid data would throw an error here.
        	else return Number(text);
        },
        
        /**
         Validate that the property is valid
         **/
        _validateProperty : function(property, method) {
            if (!property) {
                var msg = stringUtil.substitute("Invalid argument for JsonDataHandler.{1} {0}", [ property, method ]);
                throw new Error(msg);
            }
        },
        
        /**
         Validate that the object is valid
         **/
        _validateObject : function(object) {
            if (!object) {
                var msg = stringUtil.substitute("Invalid argument for JsonDataHandler.{0}", [ object ]);
                throw new Error(msg);
            }
        },
        
		_evalJson: function(jsonQuery){
			return jsonPath(this.data,jsonQuery);			
		},
	
		_evalJsonWithData: function(jsonQuery, data){
			return jsonPath(data,jsonQuery);			
		},
		
		_get: function(property){

			this._validateObject(this.data);
			var jsonQuery = this._getJPath(property);

			var result = this._evalJson(jsonQuery);
			return result;
		},
		
		_getJPath: function(property) {
			return this.jsonpath[property] || property;
		},
		
		extractFirstElement: function(result){
			return this._evalJsonWithData("$[0]", result);
		}
	});
	return JsonDataHandler;
});
},
'sbt/connections/Tag':function(){
/*
 * � Copyright IBM Corp. 2012, 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * 
 * @module sbt.connections.Tag
 * @author Rajmeet Bal
 */
define(["../declare", "../base/BaseEntity" ], 
    function(declare, BaseEntity) {

	 /**
     * Tag class.
     * 
     * @class Tag
     * @namespace sbt.connections
     */
    var Tag = declare(BaseEntity, {

        /**
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {            
        },

        /**
         * Get term of the tag
         * 
         * @method getTerm
         * @return {String} term of the tag
         * 
         */
        getTerm : function() {
            return this.getAsString("term");
        },
        
        /**
         * Get frequency of the tag
         * 
         * @method getFrequency
         * @return {Number} frequency of the tag
         * 
         */
        getFrequency : function() {
            return this.getAsNumber("frequency");
        }
    });
    return Tag;
});

},
'sbt/connections/FileService':function(){
/*
 * (C) Copyright IBM Corp. 2014
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * JavaScript API for IBM Connections File Service.
 * 
 * @module sbt.connections.FileService
 */

define(
	[ "../declare", "../lang", "../stringUtil", "../Promise", "./FileConstants", "./ConnectionsService", "../base/BaseEntity", "../base/XmlDataHandler",
			"../config", "../util", "../xml" ],
	function(declare, lang, stringUtil, Promise, consts, ConnectionsService, BaseEntity, XmlDataHandler, config, util, xml) {

	var FolderTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">${getCategory}${getId}${getFolderLabel}${getTitle}${getSummary}${getVisibility}${getVisibilityShare}</entry>";
	var FolderLabelTmpl = "<label xmlns=\"urn:ibm.com/td\" makeUnique=\"true\">${label}</label>";
	var FileVisibilityShareTmpl = "<sharedWith xmlns=\"urn:ibm.com/td\"> <member xmlns=\"http://www.ibm.com/xmlns/prod/composite-applications/v1.0\" ca:type=\"${shareWithWhat}\" xmlns:ca=\"http://www.ibm.com/xmlns/prod/composite-applications/v1.0\" ca:id=\"${shareWithId}\" ca:role=\"${shareWithRole}\"/> </sharedWith>";
	var FileFeedTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><feed xmlns=\"http://www.w3.org/2005/Atom\">${getEntries}</feed>";
	var FileEntryTmpl = "<entry xmlns=\"http://www.w3.org/2005/Atom\">${getCategory}${getId}${getUuid}${getLabel}${getTitle}${getSummary}${getVisibility}${getItem}${getTags}${getNotification}</entry>";
	var FileItemEntryTmpl = "<entry>${getCategory}${getItem}</entry>";
	var FileCommentsTmpl = "<entry xmlns=\"http://www.w3.org/2005/Atom\">${getCategory}${getDeleteComment}${getContent}</entry>";
	var FileCategoryTmpl = "<category term=\"${category}\" label=\"${category}\" scheme=\"tag:ibm.com,2006:td/type\"/>";
	var FileContentTmpl = "<content type=\"text/plain\">${content}</content>";
	var FileDeleteCommentTmpl = "<deleteWithRecord xmlns=\"urn:ibm.com/td\">${deleteWithRecord}</deleteWithRecord>";
	var FileIdTmpl = "<id>${id}</id>";
	var FileUuidTmpl = "<uuid xmlns=\"urn:ibm.com/td\">${uuid}</uuid>";
	var FileLabelTmpl = "<label xmlns=\"urn:ibm.com/td\">${label}</label>";
	var FileTitleTmpl = "<title>${title}</title>";
	var FileSummaryTmpl = "<summary type=\"text\">${summary}</summary>";
	var FileVisibilityTmpl = "<visibility xmlns=\"urn:ibm.com/td\">${visibility}</visibility>";
	var FileItemIdTmpl = "<itemId xmlns=\"urn:ibm.com/td\">${fileId}</itemId>";
	var TagsTmpl = "<category term=\"${tag}\" /> ";
	var NotificationTmpl = "<td:notification>${notification}</td:notification>";

	/**
	 * Library class associated with a library.
	 * 
	 * @class Library
	 * @namespace sbt.connections
	 */
	var Library = declare(BaseEntity, {

		/**
		 * Returned the Library Id
		 * 
		 * @method getId
		 * @returns {String} Id
		 */
		getId : function() {
			return this.getAsString("id");
		},

		/**
		 * Returned the Library Uuid
		 * 
		 * @method getLibrrayUuid
		 * @returns {String} Uuid
		 */
		getLibraryUuid : function() {
			return this.getAsString("uuid");
		},

		/**
		 * Returned the library size
		 * 
		 * @method getLibrarySize
		 * @returns {Number} library size
		 */
		getLibrarySize : function() {
			return this.getAsNumber("librarySize");
		},

		/**
		 * Returned the library quota
		 * 
		 * @method getLibraryQuota
		 * @returns {Number} library quota
		 */
		getLibraryQuota : function() {
			return this.getAsNumber("libraryQuota");
		},

		/**
		 * Returned the total removed size
		 * 
		 * @method getTotalRemovedSize
		 * @returns {Number} total removed size
		 */
		getTotalRemovedSize : function() {
			return this.getAsNumber("totalRemovedSize");
		},

		/**
		 * Returned the total results
		 * 
		 * @method getTotalResults
		 * @returns {Number} total results
		 */
		getTotalResults : function() {
			return this.getAsNumber("totalResults");
		}
	});
	
	/**
	 * Comment class associated with a file comment.
	 * 
	 * @class Comment
	 * @namespace sbt.connections
	 */
	var Comment = declare(BaseEntity, {

		/**
		 * Returned the Comment Id
		 * 
		 * @method getCommentId
		 * @returns {String} File Id
		 */
		getCommentId : function() {
			return this.id || this.getAsString("uid");
		},
		/**
		 * Returns Comment Title
		 * 
		 * @method getTitle
		 * @returns {String} title
		 */
		getTitle : function() {
			return this.getAsString("title");
		},
		/**
		 * Returns the Comment Content
		 * 
		 * @method getContent
		 * @returns {String} content
		 */
		getContent : function() {
			return this.getAsString("content");
		},
		/**
		 * Returns The create Date
		 * 
		 * @method getCreated
		 * @returns {Date} create Date
		 */
		getCreated : function() {
			return this.getAsDate("created");
		},
		/**
		 * Returns The modified Date
		 * 
		 * @method getModified
		 * @returns {Date} modified Date
		 */
		getModified : function() {
			return this.getAsDate("modified");
		},
		/**
		 * Returns the version label
		 * 
		 * @method getVersionLabel
		 * @returns {String} version label
		 */
		getVersionLabel : function() {
			return this.getAsString("versionLabel");
		},
		/**
		 * Returns the updated Date
		 * 
		 * @method getModified
		 * @returns {Date} modified Date
		 */
		getUpdated : function() {
			return this.getAsDate("updated");
		},
		/**
		 * Returns the published Date
		 * 
		 * @method getPublished
		 * @returns {Date} modified Date
		 */
		getPublished : function() {
			return this.getAsDate("published");
		},
		/**
		 * Returns the modifier
		 * 
		 * @method getModifier
		 * @returns {Object} modifier
		 */
		getModifier : function() {
			return this.getAsObject([ "modifierName", "modifierUserId", "modifierEmail", "modifierUserState" ]);
		},
		/**
		 * Returns the author
		 * 
		 * @method getAuthor
		 * @returns {Object} author
		 */
		getAuthor : function() {
			return this.getAsObject([ "authorName", "authorUserId", "authorEmail", "authorUserState" ]);
		},
		/**
		 * Returns the language
		 * 
		 * @method getLanguage
		 * @returns {String} language
		 */
		getLanguage : function() {
			return this.getAsString("language");
		},
		/**
		 * Returns the flag for delete with record
		 * 
		 * @method getDeleteWithRecord
		 * @returns {Boolean} delete with record
		 */
		getDeleteWithRecord : function() {
			return this.getAsBoolean("deleteWithRecord");
		}
	});

	/**
	 * File class associated with a file.
	 * 
	 * @class File
	 * @namespace sbt.connections
	 */
	var File = declare(BaseEntity, {

		/**
		 * Returns the file Id
		 * 
		 * @method getFileId
		 * @returns {String} file Id
		 */
		getFileId : function() {
			return this.id || this.getAsString("uid") || this._fields.id;
		},
		/**
		 * Returns the label
		 * 
		 * @method getLabel
		 * @returns {String} label
		 */
		getLabel : function() {
			return this.getAsString("label");
		},
		/**
		 * Returns the self URL
		 * 
		 * @method getSelfUrl
		 * @returns {String} self URL
		 */
		getSelfUrl : function() {
			return this.getAsString("selfUrl");
		},
		/**
		 * Returns the alternate URL
		 * 
		 * @method getAlternateUrl
		 * @returns {String} alternate URL
		 */
		getAlternateUrl : function() {
			return this.getAsString("alternateUrl");
		},
		/**
		 * Returns the download URL
		 * 
		 * @method getDownloadUrl
		 * @returns {String} download URL
		 */
		getDownloadUrl : function() {
			var url = this.getAsString("downloadUrl");
			return this.service.endpoint.rewriteUrl(url);
		},
		/**
		 * Returns the type
		 * 
		 * @method getType
		 * @returns {String} type
		 */
		getType : function() {
			return this.getAsString("type");
		},
		/**
		 * Returns the Category
		 * 
		 * @method getCategory
		 * @returns {String} category
		 */
		getCategory : function() {
			return this.getAsString("category");
		},
		/**
		 * Returns the size
		 * 
		 * @method getSize
		 * @returns {Number} length
		 */
		getSize : function() {
			return this.getAsNumber("length");
		},
		/**
		 * Returns the Edit Link
		 * 
		 * @method getEditLink
		 * @returns {String} edit link
		 */
		getEditLink : function() {
			return this.getAsString("editLink");
		},
		/**
		 * Returns the Edit Media Link
		 * 
		 * @method getEditMediaLink
		 * @returns {String} edit media link
		 */
		getEditMediaLink : function() {
			return this.getAsString("editMediaLink");
		},
		/**
		 * Returns the Thumbnail URL
		 * 
		 * @method getThumbnailUrl
		 * @returns {String} thumbnail URL
		 */
		getThumbnailUrl : function() {
			return this.getAsString("thumbnailUrl");
		},
		/**
		 * Returns the Comments URL
		 * 
		 * @method getCommentsUrl
		 * @returns {String} comments URL
		 */
		getCommentsUrl : function() {
			return this.getAsString("commentsUrl");
		},
		/**
		 * Returns the author
		 * 
		 * @method getAuthor
		 * @returns {Object} author
		 */
		getAuthor : function() {
			return this.getAsObject([ "authorName", "authorUserId", "authorEmail", "authorUserState" ]);
		},
		/**
		 * Returns the Title
		 * 
		 * @method getTitle
		 * @returns {String} title
		 */
		getTitle : function() {
			return this.getAsString("title");
		},
		/**
		 * Returns the published date
		 * 
		 * @method getPublished
		 * @returns {Date} published date
		 */
		getPublished : function() {
			return this.getAsDate("published");
		},
		/**
		 * Returns the updated date
		 * 
		 * @method getUpdated
		 * @returns {Date} updated date
		 */
		getUpdated : function() {
			return this.getAsDate("updated");
		},
		/**
		 * Returns the created date
		 * 
		 * @method getCreated
		 * @returns {Date} created date
		 */
		getCreated : function() {
			return this.getAsDate("created");
		},
		/**
		 * Returns the modified date
		 * 
		 * @method getModified
		 * @returns {Date} modified date
		 */
		getModified : function() {
			return this.getAsDate("modified");
		},
		/**
		 * Returns the last accessed date
		 * 
		 * @method getLastAccessed
		 * @returns {Date} last accessed date
		 */
		getLastAccessed : function() {
			return this.getAsDate("lastAccessed");
		},
		/**
		 * Returns the modifier
		 * 
		 * @method getModifier
		 * @returns {Object} modifier
		 */
		getModifier : function() {
			return this.getAsObject([ "modifierName", "modifierUserId", "modifierEmail", "modifierUserState" ]);
		},
		/**
		 * Returns the visibility
		 * 
		 * @method getVisibility
		 * @returns {String} visibility
		 */
		getVisibility : function() {
			return this.getAsString("visibility");
		},
		/**
		 * Returns the library Id
		 * 
		 * @method getLibraryId
		 * @returns {String} library Id
		 */
		getLibraryId : function() {
			return this.getAsString("libraryId");
		},
		
		/**
		 * Sets the library Id
		 * 
		 * @method setLibraryId
		 * @param libaryId
		 */
		setLibraryId : function(libraryId) {
			return this.setAsString("libraryId", libraryId);
		},
		/**
		 * Returns the library Type
		 * 
		 * @method getLibraryType
		 * @returns {String} library Type
		 */
		getLibraryType : function() {
			return this.getAsString("libraryType");
		},
		/**
		 * Returns the version Id
		 * 
		 * @method getVersionUuid
		 * @returns {String} version Id
		 */
		getVersionUuid : function() {
			return this.getAsString("versionUuid");
		},
		/**
		 * Returns the version label
		 * 
		 * @method getVersionLabel
		 * @returns {String} version label
		 */
		getVersionLabel : function() {
			return this.getAsString("versionLabel");
		},
		/**
		 * Returns the propagation
		 * 
		 * @method getPropagation
		 * @returns {String} propagation
		 */
		getPropagation : function() {
			return this.getAsString("propagation");
		},
		/**
		 * Returns the recommendations Count
		 * 
		 * @method getRecommendationsCount
		 * @returns {Number} recommendations Count
		 */
		getRecommendationsCount : function() {
			return this.getAsNumber("recommendationsCount");
		},
		/**
		 * Returns the comments Count
		 * 
		 * @method getCommentsCount
		 * @returns {Number} comments Count
		 */
		getCommentsCount : function() {
			return this.getAsNumber("commentsCount");
		},
		/**
		 * Returns the shares Count
		 * 
		 * @method getSharesCount
		 * @returns {Number} shares Count
		 */
		getSharesCount : function() {
			return this.getAsNumber("sharesCount");
		},
		/**
		 * Returns the folders Count
		 * 
		 * @method getFoldersCount
		 * @returns {Number} folders Count
		 */
		getFoldersCount : function() {
			return this.getAsNumber("foldersCount");
		},
		/**
		 * Returns the attachments Count
		 * 
		 * @method getAttachmentsCount
		 * @returns {Number} attachments Count
		 */
		getAttachmentsCount : function() {
			return this.getAsNumber("attachmentsCount");
		},
		/**
		 * Returns the versions Count
		 * 
		 * @method getVersionsCount
		 * @returns {Number} versions Count
		 */
		getVersionsCount : function() {
			return this.getAsNumber("versionsCount");
		},
		/**
		 * Returns the references Count
		 * 
		 * @method getReferencesCount
		 * @returns {Number} references Count
		 */
		getReferencesCount : function() {
			return this.getAsNumber("referencesCount");
		},
		/**
		 * Returns the total Media Size
		 * 
		 * @method getTotalMediaSize
		 * @returns {Number} total Media Size
		 */
		getTotalMediaSize : function() {
			return this.getAsNumber("totalMediaSize");
		},
		/**
		 * Returns the Summary
		 * 
		 * @method getSummary
		 * @returns {String} Summary
		 */
		getSummary : function() {
			return this.getAsString("summary");
		},
		/**
		 * Returns the Content URL
		 * 
		 * @method getContentUrl
		 * @returns {String} Content URL
		 */
		getContentUrl : function() {
			return this.getAsString("contentUrl");
		},
		/**
		 * Returns the Content Type
		 * 
		 * @method getContentType
		 * @returns {String} Content Type
		 */
		getContentType : function() {
			return this.getAsString("contentType");
		},
		/**
		 * Returns the objectTypeId
		 * 
		 * @method getObjectTypeId
		 * @returns {String} objectTypeId
		 */
		getObjectTypeId : function() {
			return this.getAsString("objectTypeId");
		},
		/**
		 * Returns the lock state
		 * 
		 * @method getLockType
		 * @returns {String} lock state
		 */
		getLockType : function() {
			return this.getAsString("lock");
		},
		/**
		 * Returns the permission ACLs
		 * 
		 * @method getAcls
		 * @returns {String} ACLs
		 */
		getAcls : function() {
			return this.getAsString("acls");
		},
		/**
		 * Returns the hit count
		 * 
		 * @method getHitCount
		 * @returns {Number} hit count
		 */
		getHitCount : function() {
			return this.getAsNumber("hitCount");
		},
		/**
		 * Returns the anonymous hit count
		 * 
		 * @method getAnonymousHitCount
		 * @returns {Number} anonymous hit count
		 */
		getAnonymousHitCount : function() {
			return this.getAsNumber("anonymousHitCount");
		},
		/**
		 * Returns the tags
		 * 
		 * @method getTags
		 * @returns {Array} tags
		 */
		getTags : function() {
			return this.getAsArray("tags");
		},
		/**
		 * Returns the tags
		 * 
		 * @method setTags
		 * @param {Array} tags
		 */
		setTags : function(tags) {
			return this.setAsArray("tags", tags);
		},
		/**
		 * Sets the label
		 * 
		 * @method setLabel
		 * @param {String} label
		 */
		setLabel : function(label) {
			return this.setAsString("label", label);
		},
		/**
		 * Sets the summary
		 * 
		 * @method setSummary
		 * @param {String} summary
		 */
		setSummary : function(summary) {
			return this.setAsString("summary", summary);
		},
		/**
		 * Sets the visibility
		 * 
		 * @method setVisibility
		 * @param {String} visibility
		 */
		setVisibility : function(visibility) {
			return this.setAsString("visibility", visibility);
		},

		/**
		 * Sets Indicator whether the currently authenticated user wants to receive notifications as people edit the document. Options are on or off.
		 * @param {Boolean} notification
		 * @returns
		 */
		setNotification : function(notification) {
			return this.setAsBoolean("notification", notification ? "on" : "off");
		},
		/**
		 * Loads the file object with the atom entry associated with the file. By default, a network call is made to load the atom entry document in the
		 * file object.
		 * 
		 * @method load
		 * @param {Object} [args] Argument object
		 * @param {Boolean} [isPublic] Optinal flag to indicate whether to load public file which does not require authentication
		 */
		load : function(args, isPublic, url) {
			// detect a bad request by validating required arguments
			var fileUuid = this.getFileId();
			var promise = this.service.validateField("fileId", fileUuid);
			if (promise) {
				return promise;
			}
			if(isPublic) {
				promise = this.service.validateField("libraryId", this.getLibraryId());
				if (promise) {
					return promise;
				}
			}

			var self = this;
			var callbacks = {
				createEntity : function(service, data, response) {
					self.dataHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.FileXPath
					});
					return self;
				}
			};

			var requestArgs = lang.mixin({
				fileUuid : fileUuid
			}, args || {});
			var options = {
				// handleAs : "text",
				query : requestArgs
			};

			if (!url) {						
				if (isPublic) {
					url = this.service.constructUrl(consts.AtomFileInstancePublic, null, {
						"documentId" : fileUuid,
						"libraryId" : this.getLibraryId()
					});
				}
				else {
					url = this.service.constructUrl(consts.AtomFileInstance, null, {
						"documentId" : fileUuid							
					});
				}
			}
			return this.service.getEntity(url, options, fileUuid, callbacks);
		},
		/**
		 * Save this file
		 * 
		 * @method save
		 * @param {Object} [args] Argument object
		 */
		save : function(args) {
			if (this.getFileId()) {
				return this.service.updateFileMetadata(this, args);
			}
		},
		/**
		 * Adds a comment to the file.
		 * 
		 * @method addComment
		 * @param {String} comment the comment to be added
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		addComment : function(comment, args) {
			return this.service.addCommentToFile(this.getAuthor().authorUserId, this.getFileId(), comment, args);
		},
		/**
		 * Pin th file, by sending a POST request to the myfavorites feed.
		 * 
		 * @method pin
		 * @param {Object} [args] Argument object.
		 */
		pin : function(args) {
			return this.service.pinFile(this.getFileId(), args);
		},
		/**
		 * Unpin the file, by sending a DELETE request to the myfavorites feed.
		 * 
		 * @method unPin
		 * @param {Object} [args] Argument object.
		 */
		unpin : function(args) {
			return this.service.unpinFile(this.getFileId(), args);
		},
		/**
		 * Lock the file
		 * 
		 * @method lock
		 * @param {Object} [args] Argument object
		 */
		lock : function(args) {
			return this.service.lockFile(this.getFileId(), args);
		},
		/**
		 * UnLock the file
		 * 
		 * @method unlock
		 * @param {Object} [args] Argument object
		 */
		unlock : function(args) {
			return this.service.unlockFile(this.getFileId(), args);
		},
		/**
		 * Deletes the file.
		 * 
		 * @method remove
		 * @param {Object} [args] Argument object
		 */
		remove : function(args) {
			return this.service.deleteFile(this.getFileId(), args);
		},
		/**
		 * Update the Atom document representation of the metadata for the file
		 * 
		 * @method update
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		update : function(args) {
			return this.service.updateFileMetadata(this, args);
		},
		/**
		 * Downloads the file
		 * 
		 * @method download
		 */
		download : function() {
			return this.service.downloadFile(this.getFileId(), this.getLibraryId());
		}

	});

	/**
	 * Callbacks used when reading a feed that contains File entries.
	 */
	var FileFeedCallbacks = {
		createEntities : function(service, data, response) {
			return new XmlDataHandler({
				data : data,
				namespaces : consts.Namespaces,
				xpath : consts.FileFeedXPath
			});
		},
		createEntity : function(service, data, response) {
			var entry = null;
			if (typeof data == "object") {
				entry = data;
			} else {
				var feedHandler = new XmlDataHandler({
					data : data,
					namespaces : consts.Namespaces,
					xpath : consts.FileXPath
				});
				entry = feedHandler.data;
			}
			var entryHandler = new XmlDataHandler({
				data : entry,
				namespaces : consts.Namespaces,
				xpath : consts.FileXPath
			});
			return new File({
				service : service,
				dataHandler : entryHandler
			});
		}
	};

	/**
	 * Callbacks used when reading a feed that contains File Comment entries.
	 */
	var CommentCallbacks = {
		createEntities : function(service, data, response) {
			return new XmlDataHandler({
				data : data,
				namespaces : consts.Namespaces,
				xpath : consts.CommentFeedXPath
			});
		},
		createEntity : function(service, data, response) {
			var entry = null;
			if (typeof data == "object") {
				entry = data;
			} else {
				var feedHandler = new XmlDataHandler({
					data : data,
					namespaces : consts.Namespaces,
					xpath : consts.CommentXPath
				});
				entry = feedHandler.data;
			}
			var entryHandler = new XmlDataHandler({
				data : entry,
				namespaces : consts.Namespaces,
				xpath : consts.CommentXPath
			});
			return new Comment({
				service : service,
				dataHandler : entryHandler
			});
		}
	};

	/**
	 * FileService class.
	 * 
	 * @class FileService
	 * @namespace sbt.connections
	 */
	var FileService = declare(ConnectionsService, {

		contextRootMap : {
			files : "files"
		},
        
        serviceName : "files",

		/**
		 * Constructor for FileService
		 * 
		 * @constructor
		 * @param args
		 */
		constructor : function(args) {
			var endpointName = args ? (args.endpoint ? args.endpoint : this.getDefaultEndpointName()) : this.getDefaultEndpointName();
			if (!this.endpoint) {
				this.endpoint = config.findEndpoint(endpointName);
			}
		},

		/**
		 * Returns information about the current users library.
		 * 
		 */
		getMyLibrary : function(args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : { ps:1, includeQuota:true } || args || {}
			};

			var self = this;
			var callbacks = {
				createEntity : function(service, data, response) {
					var entryHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.LibraryXPath
					});
					return new Library({
						service : self,
						dataHandler : entryHandler
					});
				}
			};

			return this.getEntity(consts.AtomFilesMy, options, "my", callbacks);
		},

		/**
		 * Returns a File instance from File or JSON or String. Throws an error if the argument was neither.
		 * 
		 * @param {Object} fileOrJsonOrString The file Object or json String for File
		 */
		newFile : function(fileOrJsonOrString) {
			if (fileOrJsonOrString instanceof File) {
				return fileOrJsonOrString;
			} else {
				if (lang.isString(fileOrJsonOrString)) {
					fileOrJsonOrString = {
						id : fileOrJsonOrString
					};
				}
				return new File({
					service : this,
					_fields : lang.mixin({}, fileOrJsonOrString)
				});
			}
		},

		/**
		 * Loads File with the ID passed
		 * 
		 * @method getFile
		 * @param {String} fileId the Id of the file to be loaded
		 * @param {Object} [args] Argument object
		 */
		getFile : function(fileId, args) {
			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			var file = this.newFile({
				id : fileId
			});
			return file.load(args);

		},

		/**
		 * Loads Community File 
		 * 
		 * @method getFile
		 * @param {String} fileId the Id of the file to be loaded
		 * @param {String} communityId the Id of the community to which it belongs
		 * @param {Object} [args] Argument object
		 */
		getCommunityFile : function(fileId, communityId, args) {
			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("communityId", communityId);
			}
			if (promise) {
				return promise;
			}
			var file = this.newFile({
				id : fileId
			});
			var url = this.constructUrl(consts.AtomGetCommunityFile, null, {
				communityId : communityId,
				documentId : file.getFileId()
			});
			return file.load(args, null, url);

		},
		/**
		 * Get my files from IBM Connections
		 * 
		 * @method getMyFiles
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getMyFiles : function(args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomFilesMy, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get community files from IBM Connections (community files refer to
		 * files which the user uploaded to the community. Calling this function
		 * will not list files that have been shared with this community).
		 * 
		 * @method getCommunityFiles
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getCommunityFiles : function(communityId, args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			var url = this.constructUrl(consts.AtomGetAllFilesInCommunity, null, {
				communityId : communityId
			});

			return this.getEntities(url, options, this.getFileFeedCallbacks());
		},
		/**
		 * Get files shared with logged in user from IBM Connections
		 * 
		 * @method getFilesSharedWithMe
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getFilesSharedWithMe : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",

				query : lang.mixin({
					direction : "inbound"
				}, args ? args : {})
			};

			return this.getEntities(consts.AtomFilesShared, options, this.getFileFeedCallbacks());
		},
		/**
		 * Get files shared by the logged in user from IBM Connections
		 * 
		 * @method getFilesSharedByMe
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getFilesSharedByMe : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",

				query : lang.mixin({
					direction : "outbound"
				}, args ? args : {})
			};

			return this.getEntities(consts.AtomFilesShared, options, this.getFileFeedCallbacks());
		},
		/**
		 * Get public files from IBM Connections
		 * 
		 * @method getPublicFiles
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getPublicFiles : function(args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {},
				headers : {}
			};

			return this.getEntities(consts.AtomFilesPublic, options, this.getFileFeedCallbacks());
		},
		/**
		 * Get my folders from IBM Connections
		 * 
		 * @method getMyFolders
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getMyFolders : function(args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomFoldersMy, options, this.getFileFeedCallbacks());
		},
		
		/**
		 * A feed of comments associated with files to which you have access. You must authenticate this request.
		 * 
		 * @method getMyFileComments
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getMyFileComments : function(userId, fileId, args) {

			return this.getFileComments(fileId, userId, false, null, args);
		},
		/**
		 * A feed of comments associated with all public files. Do not authenticate this request.
		 * 
		 * @method getPublicFileComments
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		getPublicFileComments : function(userId, fileId, args) {

			return this.getFileComments(fileId, userId, true, null, args);
		},

		/**
		 * Adds a comment to the specified file.
		 * 
		 * @method addCommentToFile
		 * @param {String} [userId] the userId for the author
		 * @param {String} fileId the ID of the file
		 * @param {String} comment the comment to be added
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		addCommentToFile : function(userId, fileId, comment, url, args) {
			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("comment", comment);
			}
			if (promise) {
				return promise;
			}
			var options = {
				method : "POST",
				query : args || {},
				headers : consts.AtomXmlHeaders,
				data : this._constructPayloadForComment(false, comment)
			};

			if (!url) {
				if (!userId) {
					url = this.constructUrl(consts.AtomAddCommentToMyFile, null, {
						documentId : fileId
					});
				} else {
					url = this.constructUrl(consts.AtomAddCommentToFile, null, {
						userId : userId,
						documentId : fileId
					});
				}
			}
			return this.updateEntity(url, options, this.getCommentFeedCallbacks());
		},

		/**
		 * Adds a comment to the specified file of logged in user.
		 * 
		 * @method addCommentToMyFile
		 * @param {String} fileId the ID of the file
		 * @param {String} comment the comment to be added
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		addCommentToMyFile : function(fileId, comment, args) {
			return this.addCommentToFile(null, fileId, comment, null, args);
		},

		/**
		 * Method to add comments to a Community file <p> Rest API used : /files/basic/api/communitylibrary/<communityId>/document/<fileId>/feed
		 * 
		 * @method addCommentToCommunityFile
		 * @param {String} fileId
		 * @param {String} comment
		 * @param {String} communityId
		 * @param {Object} [args]
		 * @return {Comment} comment
		 */
		addCommentToCommunityFile : function(fileId, comment, communityId, args) {
			var url = this.constructUrl(consts.AtomAddCommentToCommunityFile, null, {
				communityId : communityId,
				documentId : fileId
			});
			return this.addCommentToFile(null, fileId, comment, url, args);
		},

		/**
		 * Update the Atom document representation of the metadata for a file from logged in user's library.
		 * 
		 * @method updateFileMetadata
		 * @param {Object} fileOrJson file or json representing the file to be updated
		 * @param {Object} [args] Argument object. Object representing various parameters that can be passed. The parameters must be exactly as they are
		 * supported by IBM Connections like ps, sortBy etc.
		 */
		updateFileMetadata : function(fileOrJson, url, args) {

			var promise = this.validateField("fileOrJson", fileOrJson);
			if (promise) {
				return promise;
			}

			var file = this.newFile(fileOrJson);
			var options = {
				method : "PUT",
				query : args || {},
				headers : consts.AtomXmlHeaders,
				data : this._constructPayload(file._fields, file.getFileId())
			};

			if (!url) {
				url = this.constructUrl(consts.AtomUpdateFileMetadata, null, {
					documentId : file.getFileId()
				});
			}
			return this.updateEntity(url, options, this.getFileFeedCallbacks());
		},

		/**
		 * Method to update Community File's Metadata <p> Rest API used : /files/basic/api/library/<libraryId>/document/<fileId>/entry <p>
		 * @method updateCommunityFileMetadata
		 * @param {Object} fileOrJson
		 * @param {String} libraryId
		 * @param {Object} [args]
		 * @return {File}
		 */
		updateCommunityFileMetadata : function(fileOrJson, communityId, args) {
			var promise = this.validateField("fileOrJson", fileOrJson);
			if (promise) {
				return promise;
			}
			var file = this.newFile(fileOrJson);
			promise = new Promise();
			var _this = this;
			var update = function() {
				var url = _this.constructUrl(consts.AtomUpdateCommunityFileMetadata, null, {
					libraryId : file.getLibraryId(),
					documentId : file.getFileId()
				});
				_this.updateFileMetadata(file, url, args).then(function(file) {
					promise.fulfilled(file);
				}, function(error) {
					promise.rejected(error);
				});
			};
			if (file.isLoaded()) {
				update();
			} else {
				var url = _this.constructUrl(consts.AtomGetCommunityFile, null, {
					communityId : communityId,
					documentId : file.getFileId()
				});
				file.load(null, null, url).then(function() {
					update();
				}, function(error) {
					promise.rejected(error);
				});
			}
			return promise;
		},

		/**
		 * Pin a file, by sending a POST request to the myfavorites feed.
		 * 
		 * @method pinFile
		 * @param {String} fileId ID of file which needs to be pinned
		 * @param {Object} [args] Argument object.
		 */
		pinFile : function(fileId, args) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["itemId"] = fileId;

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			var callbacks = {
				createEntity : function(service, data, response) {
					return "Success";
				}
			};

			return this.updateEntity(consts.AtomPinFile, options, callbacks);

		},

		/**
		 * Unpin a file, by sending a DELETE request to the myfavorites feed.
		 * 
		 * @method unpinFile
		 * @param {String} fileId ID of file which needs to be unpinned
		 * @param {Object} [args] Argument object.
		 */
		unpinFile : function(fileId, args) {
			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}

			var parameters = args ? lang.mixin({}, args) : {};
			parameters["itemId"] = fileId;

			var options = {
				method : "DELETE",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			return this.deleteEntity(consts.AtomPinFile, options, fileId);

		},

		/**
		 * Add a file or files to a folder.
		 * 
		 * You cannot add a file from your local directory to a folder; the file must already have been uploaded to the Files application. To add a file
		 * to a folder you must be an editor of the folder.
		 * 
		 * @method addFilesToFolder
		 * @param {String} folderId the Id of the folder
		 * @param {List} fileIds list of file Ids to be added to the folder
		 * @param {Object} [args] Argument object.
		 */
		addFilesToFolder : function(fileIds, folderId, args) {

			var promise = this.validateField("fileIds", fileIds);
			if (!promise) {
				promise = this.validateField("folderId", folderId);
			}

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};
			var url = this.constructUrl(consts.AtomAddFilesToFolder, null, {
				collectionId : folderId
			});

			var separatorChar = "?";
			for ( var counter in fileIds) {
				url += separatorChar + "itemId=" + fileIds[counter];
				separatorChar = "&";
			}

			var callbacks = {
				createEntity : function(service, data, response) {
					return "Success";
				}
			};

			return this.updateEntity(url, options, callbacks);

		},

		/**
		 * Gets the files pinned by the logged in user.
		 * 
		 * @method getPinnedFiles
		 * @param {Object} [args] Argument object for the additional parameters like pageSize etc.
		 */
		getPinnedFiles : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomFilesMyPinned, options, this.getFileFeedCallbacks());
		},

		/**
		 * Delete a file.
		 * 
		 * @method deleteFile
		 * @param {String} fileId Id of the file which needs to be deleted
		 * @param {Object} [args] Argument object
		 */
		deleteFile : function(fileId, args) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}

			var options = {
				method : "DELETE",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};
			var url = this.constructUrl(consts.AtomDeleteFile, null, {
				documentId : fileId
			});

			return this.deleteEntity(url, options, fileId);
		},

		/**
		 * Lock a file
		 * 
		 * @method lockFile
		 * @param {String} fileId Id of the file which needs to be locked
		 * @param {Object} [args] Argument object
		 */
		lockFile : function(fileId, args) {
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["type"] = "HARD";

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : args || {}
			};
			var url = this.constructUrl(consts.AtomLockUnlockFile, parameters, {
				documentId : fileId
			});

			var callbacks = {
				createEntity : function(service, data, response) {
					return "Success";
				}
			};

			return this.updateEntity(url, options, callbacks, args);
		},

		/**
		 * unlock a file
		 * 
		 * @method lockFile
		 * @param {String} fileId Id of the file which needs to be unlocked
		 * @param {Object} [args] Argument object
		 */
		unlockFile : function(fileId, args) {
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["type"] = "NONE";

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : args || {}
			};
			var url = this.constructUrl(consts.AtomLockUnlockFile, parameters, {
				documentId : fileId
			});

			var callbacks = {
				createEntity : function(service, data, response) {
					return "Success";
				}
			};

			return this.updateEntity(url, options, callbacks, args);
		},

		/**
		 * Uploads a new file for logged in user.
		 * 
		 * @method uploadFile
		 * @param {Object} fileControlOrId The Id of html control or the html control
		 * @param {Object} [args] The additional parameters for upload
		 */
		uploadFile : function(fileControlOrId, args) {

			var promise = this.validateField("File Control Or Id", fileControlOrId);
			if (promise) {
				return promise;
			}
			promise = this.validateHTML5FileSupport();
			if (promise) {
				return promise;
			}
			
			var files = null;
			if (typeof fileControlOrId == "string") {
				var fileControl = document.getElementById(fileControlOrId);
				files = fileControl.files;
			} else if (typeof fileControlOrId == "object") {
				files = fileControlOrId.files;
			} else {
				return this.createBadRequestPromise("File Control or ID is required");
			}
			
			if (files.length == 0) {
				return this.createBadRequestPromise("No files selected for upload");
			}

			var file = files[0];
			var data = new FormData();
			data.append("file", file);

			return this.uploadFileBinary(data, file.name, args);
		},

		/**
		 * Uploads a new file for logged in user.
		 * 
		 * @method uploadFile
		 * @param {Object} binaryContent The binary content of the file
		 * @param {String} filename The name of the file
		 * @param {Object} [args] The additional parameters of metadata of file for upload like visibility, tag, etc.
		 */
		uploadFileBinary : function(binaryContent, fileName, args) {

			var promise = this.validateField("Binary Content", binaryContent);
			if (promise) {
				return promise;
			}
			promise = this.validateField("File Name", fileName);
			if (promise) {
				return promise;
			}
			if (util.getJavaScriptLibrary().indexOf("Dojo 1.4.3") != -1) {
				return this.createBadRequestPromise("Dojo 1.4.3 is not supported for File upload");
			}
			// /files/<<endpointName>>/<<serviceType>>/<<operation>>/fileName eg. /files/smartcloud/connections/UploadFile/fileName?args
			var url = this.constructUrl(config.Properties.serviceUrl + "/files/" + this.endpoint.proxyPath + "/" + "connections" + "/" + "UploadFile"
					+ "/" + encodeURIComponent(fileName), args && args.parameters ? args.parameters : {});
			var headers = {
				"Content-Type" : false,
				"Process-Data" : false, // processData = false is reaquired by jquery
				"X-Endpoint-name" : this.endpoint.name
			};
			var options = {
				method : "POST",
				headers : headers,
				query : args || {},
				data : binaryContent
			};

			return this.updateEntity(url, options, this.getFileFeedCallbacks());
		},

		/**
		 * Upload new version of a file.
		 * 
		 * @method uploadNewVersion
		 * @param {Object} fileId The ID of the file
		 * @param {Object} fileControlOrId The Id of html control or the html control
		 * @param {Object} [args] The additional parameters ffor updating file metadata
		 */
		uploadNewVersion : function(fileId, fileControlOrId, args) {

			var promise = this.validateField("File Control Or Id", fileControlOrId);
			if (!promise) {
				promise = this.validateField("File ID", fileId);
			}
			if (promise) {
				return promise;
			}
			promise = this.validateHTML5FileSupport();
			if (promise) {
				return promise;
			}
			var files = null;
			if (typeof fileControlOrId == "string") {
				var fileControl = document.getElementById(fileControlOrId);
				filePath = fileControl.value;
				files = fileControl.files;
			} else if (typeof fileControlOrId == "object") {
				filePath = fileControlOrId.value;
				files = fileControlOrId.files;
			} else {
				return this.createBadRequestPromise("File Control or ID is required");
			}

			var file = files[0];
			var data = new FormData();
			data.append("file", file);

			return this.uploadNewVersionBinary(data, fileId, file.name, args);
		},

		/**
		 * Uploads new Version of a File.
		 * 
		 * @method uploadNewVersionBinary
		 * @param {Object} binaryContent The binary content of the file
		 * @param {String} fileId The ID of the file
		 * @param {Object} [args] The additional parameters for upding file metadata
		 */
		uploadNewVersionBinary : function(binaryContent, fileId, fileName, args) {

			var promise = this.validateField("Binary Content", binaryContent);
			if (promise) {
				return promise;
			}
			promise = this.validateField("File ID", fileId);
			if (promise) {
				return promise;
			}
			promise = this.validateField("File Name", fileName);
			if (promise) {
				return promise;
			}
			if (util.getJavaScriptLibrary().indexOf("Dojo 1.4.3") != -1) {
				return this.createBadRequestPromise("Dojo 1.4.3 is not supported for File Upload");
			}
			// /files/<<endpointName>>/<<serviceType>>/<<operation>>/fileId?args eg./files/smartcloud/connections/UpdateFile/fileId/fileName?args
			var url = this.constructUrl(config.Properties.serviceUrl + "/files/" + this.endpoint.proxyPath + "/" + "connections" + "/"
					+ "UploadNewVersion" + "/" + encodeURIComponent(fileId) + "/" + encodeURIComponent(fileName),
					args && args.parameters ? args.parameters : {});
			var headers = {
				"Content-Type" : false,
				"Process-Data" : false  // processData = false is reaquired by jquery
			};
			var options = {
				method : "PUT",
				headers : headers,
				data : binaryContent
			};
			var promise = new Promise();
			var _this = this;

			this.updateEntity(url, options, this.getFileFeedCallbacks()).then(function(file) {
				if (args) {
					_this.updateFile(file.getFileId(), args).then(function(updatedFile) {
						promise.fulfilled(updatedFile);
					});
				} else {
					promise.fulfilled(file);
				}
			}, function(error) {
				promise.rejected(error);
			});
			return promise;
		},

		/**
		 * Updates metadata of a file programatically using a PUT call
		 * @param [String] fileId the File ID
		 * @param [Object] args The parameters for update. Supported Input parameters are commentNotification, created, identifier, includePath,
		 * mediaNotification, modified, recommendation, removeTag, sendNotification, sharePermission, shareSummary, shareWith, tag and visibility
		 * @returns
		 */
		updateFile : function(fileId, args) {
			var promise = this.validateField("File ID", fileId);
			if (promise) {
				return promise;
			}
			var url = this.constructUrl(consts.AtomFileInstance, null, {
				documentId : fileId
			});
			var separatorChar = "?";
			if (args && args.tags) {
				var tags = args.tags.split(",");
				for ( var counter in tags) {
					url += separatorChar + "tag=" + stringUtil.trim(tags[counter]);
					separatorChar = "&";
				}
				delete args.tags;
			}
			if (args && args.removeTags) {
				var removeTags = args.removeTags.split(",");
				for ( var counter in removeTags) {
					url += separatorChar + "removeTag=" + stringUtil.trim(removeTags[counter]);
					separatorChar = "&";
				}
				delete args.removeTags;
			}

			var options = {
				method : "PUT",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : args || {}
			};

			return this.updateEntity(url, options, this.getFileFeedCallbacks());
		},

		/**
		 * Downloads a file.
		 * 
		 * @method downloadFile
		 * @param {String} fileId The ID of the file
		 * @param {String} libraryId The library ID of the file
		 */
		downloadFile : function(fileId, libraryId) {
			window.open(this.getDownloadUrl());
		},

		actOnCommentAwaitingApproval : function(commentId, action, actionReason) {

		},
		actOnFileAwaitingApproval : function(fileId, action, actionReason) {

		},
		/**
		 * Add a file to a folder or list of folders.
		 * 
		 * You cannot add a file from your local directory to a folder; the file must already have been uploaded to the Files application. To add a file
		 * to a folder you must be an editor of the folder.
		 * 
		 * @method addFilesToFolder
		 * @param {String} fileId the Id of the file
		 * @param {List} folderIds list of folder Ids
		 * @param {String} [userId] the userId of the user in case of own file
		 * @param {Object} [args] Argument object.
		 */
		addFileToFolders : function(fileId, folderIds, userId, args) {
			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("folderIds", folderIds);
			}
			if (promise) {
				return promise;
			}

			var url = null;

			if (!userId) {
				url = this.constructUrl(consts.AtomAddMyFileToFolders, null, {
					documentId : fileId
				});
			} else {
				url = this.constructUrl(consts.AtomAddFileToFolders, null, {
					userId : userId,
					documentId : fileId
				});
			}

			var payload = this._constructPayloadForMultipleEntries(folderIds, "itemId", "collection");

			var options = {
				method : "POST",
				headers : consts.AtomXmlHeaders,
				data : payload
			};

			var callbacks = {
				createEntity : function(service, data, response) {
				}
			};

			return this.updateEntity(url, options, callbacks);
		},

		/**
		 * Create a new Folder
		 * 
		 * @method createFolder <p> Rest API used : /files/basic/api/collections/feed
		 * 
		 * @param {String} name name of the folder to be created
		 * @param {String} [description] description of the folder
		 * @param {String} [shareWith] If the folder needs to be shared, specify the details in this parameter. <br> Pass Coma separated List of id,
		 * (person/community/group) or role(reader/Contributor/owner) in order
		 * @return {Object} Folder
		 */
		createFolder : function(name, description, shareWith) {
			var promise = this.validateField("folderName", name);
			if (promise) {
				return promise;
			}
			var url = consts.AtomCreateFolder;
			var payload = this._constructPayloadFolder(name, description, shareWith, "create");

			var options = {
				method : "POST",
				headers : lang.mixin(consts.AtomXmlHeaders, {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}),
				data : payload
			};

			return this.updateEntity(url, options, this.getFileFeedCallbacks());

		},

		/**
		 * Delete Files From Recycle Bin
		 * 
		 * @param {String} userId The ID of user
		 */
		deleteAllFilesFromRecycleBin : function(userId) {

			var url = null;

			if (!userId) {
				url = consts.AtomDeleteMyFilesFromRecyclebBin;
			} else {
				url = this.constructUrl(consts.AtomDeleteAllFilesFromRecyclebBin, null, {
					userId : userId
				});
			}
			var options = {
				method : "DELETE"
			};
			return this.deleteEntity(url, options, "");
		},

		/**
		 * Delete all Versions of a File before the given version
		 * 
		 * @param {String} fileId the ID of the file
		 * @param {String} [versionLabel] The version from which all will be deleted
		 * @param {Object} [args] additional arguments
		 */
		deleteAllVersionsOfFile : function(fileId, versionLabel, args) {

			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("versionLabel", versionLabel);
			}
			if (promise) {
				return promise;
			}

			var requestArgs = lang.mixin({
				category : "version",
				deleteFrom : versionLabel
			}, args || {});

			var options = {
				method : "DELETE",
				query : requestArgs,
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};
			var url = this.constructUrl(consts.AtomDeleteAllVersionsOfAFile, null, {
				documentId : fileId
			});

			return this.deleteEntity(url, options, fileId);
		},

		/**
		 * Delete a Comment for a file
		 * 
		 * @param {String} fileId the ID of the file
		 * @param {String} commentId the ID of comment
		 * @param {String} [userId] the ID of the user, if not provided logged in user is assumed
		 * @param {Object} [args] the additional arguments
		 */
		deleteComment : function(fileId, commentId, userId, args) {
			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("commentId", commentId);
			}
			if (promise) {
				return promise;
			}

			var url = null;

			if (userId) {
				url = this.constructUrl(consts.AtomDeleteComment, null, {
					userId : userId,
					documentId : fileId,
					commentId : commentId
				});
			} else {
				url = this.constructUrl(consts.AtomDeleteMyComment, null, {
					documentId : fileId,
					commentId : commentId
				});
			}

			var options = {
				method : "DELETE",
				query : args || {},
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};

			return this.deleteEntity(url, options, commentId);
		},

		/**
		 * Delete File from RecycleBin of a user
		 * @param {String} fileId the Id of the file
		 * @param {String} [userId] the Id of the user
		 * @param {Object} args the additional arguments
		 * @returns
		 */
		deleteFileFromRecycleBin : function(fileId, userId, args) {
			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}

			var url = null;

			if (userId) {
				url = this.constructUrl(consts.AtomDeleteFileFromRecycleBin, null, {
					userId : userId,
					documentId : fileId
				});
			} else {
				url = this.constructUrl(consts.AtomDeleteMyFileFromRecycleBin, null, {
					documentId : fileId
				});
			}

			var options = {
				method : "DELETE",
				query : args || {},
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};

			return this.deleteEntity(url, options, fileId);
		},

		/**
		 * deletes a File Share
		 * @param {String} fileId the ID of the file
		 * @param {String} userId the ID of the user
		 * @param {Object} args the additional arguments
		 */
		deleteFileShare : function(fileId, userId, args) {
			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}

			var requestArgs = lang.mixin({
				sharedWhat : fileId
			}, args || {});

			if (userId) {
				requestArgs.sharedWith = userId;
			}

			var url = consts.AtomDeleteFileShare;

			var options = {
				method : "DELETE",
				query : requestArgs,
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};

			return this.deleteEntity(url, options, fileId);
		},

		/**
		 * Deletes a Folder
		 * @param {String} folderId the ID of the folder
		 */
		deleteFolder : function(folderId) {
			var promise = this.validateField("folderId", folderId);
			if (promise) {
				return promise;
			}

			var options = {
				method : "DELETE",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				}
			};
			var url = this.constructUrl(consts.AtomDeleteFFolder, null, {
				collectionId : folderId
			});

			return this.deleteEntity(url, options, folderId);
		},

		/**
		 * Get all user Files
		 * @param {String} userId the ID of the user
		 * @param {Object} args the addtional arguments
		 * @returns {Object} Files
		 */
		getAllUserFiles : function(userId, args) {

			var promise = this.validateField("userId", userId);
			if (promise) {
				return promise;
			}

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			var url = this.constructUrl(consts.AtomGetAllUsersFiles, null, {
				userId : userId
			});

			return this.getEntities(url, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get file Comments
		 * @param {String} fileId the ID of the file
		 * @param {String} [userId] the ID of the user
		 * @param {Boolean} [isAnnonymousAccess] flag to indicate annonymous access
		 * @param {String} [commentId] the ID of the comment
		 * @param {String} [communityId] required in case the file in a community file
		 * @param {Object} args the additional arguments
		 * @returns {Array} Comments List
		 */
		getFileComments : function(fileId, userId, isAnnonymousAccess, commentId, communityId, args) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}

			var url = null;
			if(communityId){
				url = this.constructUrl(consts.AtomAddCommentToCommunityFile, null, {
					communityId : communityId,
					documentId : fileId
				});
			}
			else if (commentId) {
				if (userId) {
					url = this.constructUrl(consts.AtomGetFileComment, null, {
						userId : userId,
						documentId : fileId,
						commentId : commentId
					});
				} else {
					url = this.constructUrl(consts.AtomGetMyFileComment, null, {
						documentId : fileId,
						commentId : commentId
					});
				}
			} else {
				var promise = this.validateField("userId", userId);
				if (promise) {
					return promise;
				}
				if (isAnnonymousAccess) {
					url = this.constructUrl(consts.AtomFileCommentsPublic, null, {
						userId : userId,
						documentId : fileId
					});
				} else {
					url = this.constructUrl(consts.AtomFileCommentsMy, null, {
						userId : userId,
						documentId : fileId
					});
				}
			}

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(url, options, this.getCommentFeedCallbacks());
		},
		
		 /**
	     * Method to get All comments of a Community File
	     * <p>
	     * Rest API Used : 
	     * /files/basic/api/communitylibrary/<communityId>/document/<fileId>/feed
	     * <p>
	     * @method getAllCommunityFileComments
	     * @param {String} fileId
	     * @param {String} communityId
	     * @param {Object} [args]
	     * @returns {Array} comments
	     */
	    getAllCommunityFileComments : function(fileId, communityId, args) {
	    	
	    	var promise = this.validateField("fileId", fileId);
	    	if(!promise){
	    		promise = this.validateField("communityId", communityId);
	    	}
			if (promise) {
				return promise;
			}
			
			return this.getFileComments(fileId, null, null, null, communityId, args);			    	
	    },

		/**
		 * Get Files from recycle bin
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} Files
		 */
		getFileFromRecycleBin : function(fileId, userId, args) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};
			var url = this.constructUrl(consts.AtomGetFileFromRecycleBin, null, {
				userId : userId,
				documentId : fileId
			});

			var callbacks = {
				createEntity : function(service, data, response) {
					self.dataHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.FileXPath
					});
					return self;
				}
			};

			return this.getEntity(url, options, callbacks);
		},

		/**
		 * Get Files awaiting approval
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} Files
		 */
		getFilesAwaitingApproval : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetFilesAwaitingApproval, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get File Shares
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} Files
		 */
		getFileShares : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetFileShares, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get Files in a folder
		 * @param {String} folderId the ID of the folder
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} Files
		 */
		getFilesInFolder : function(folderId, args) {

			var url = this.constructUrl(consts.AtomGetFilesInFolder, null, {
				collectionId : folderId
			});

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(url, options, this.getFileFeedCallbacks());

		},

		/**
		 * Get Files in my recycle bin
		 * @param {Object} [args] the addtional arguments
		 * @returns
		 */
		getFilesInMyRecycleBin : function(args) {
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetFilesInMyRecycleBin, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get a file with given version
		 * @param {String} fileId the ID of the file
		 * @param {String} versionId the ID of the version
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} File
		 */
		getFileWithGivenVersion : function(fileId, versionId, args) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			if (!versionId) {
				return this.getFile(fileId, args);
			}
			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};
			var url = this.constructUrl(consts.AtomGetFileWithGivenVersion, null, {
				documentId : fileId,
				versionId : versionId
			});

			var callbacks = {
				createEntity : function(service, data, response) {
					self.dataHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.FileXPath
					});
					return self;
				}
			};

			return this.getEntity(url, options, callbacks);
		},

		/**
		 * Get a folder
		 * @param {String} folderId the ID of the folder
		 * @returns
		 */
		getFolder : function(folderId) {
			var promise = this.validateField("folderId", folderId);
			if (promise) {
				return promise;
			}
			var options = {
				method : "GET",
				handleAs : "text"
			};
			var url = this.constructUrl(consts.AtomGetFolder, null, {
				collectionId : folderId
			});

			var callbacks = {
				createEntity : function(service, data, response) {
					self.dataHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.FileXPath
					});
					return self;
				}
			};

			return this.getEntity(url, options, callbacks);
		},

		/**
		 * Get Folders With Recently Added Files
		 * @param {Object} [args] the additional arguents
		 * @returns {Object} List of Files
		 */
		getFoldersWithRecentlyAddedFiles : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetFoldersWithRecentlyAddedFiles, options, this.getFileFeedCallbacks());

		},

		/**
		 * Gets the folders pinned by the logged in user.
		 * 
		 * @method getPinnedFolders
		 * @param {Object} [args] Argument object for the additional parameters like pageSize etc.
		 */
		getPinnedFolders : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetPinnedFolders, options, this.getFileFeedCallbacks());
		},

		/**
		 * Get public folders
		 * 
		 * @param {Object} [args] Additional arguments like ps, sort by, etc
		 */
		getPublicFolders : function(args) {

			var options = {
				method : "GET",
				handleAs : "text",
				query : args || {}
			};

			return this.getEntities(consts.AtomGetPublicFolders, options, this.getFileFeedCallbacks());
		},

		/**
		 * Pin a folder, by sending a POST request to the myfavorites feed.
		 * 
		 * @method pinFolder
		 * @param {String} folderId ID of folder which needs to be pinned
		 * @param {Object} [args] Argument object.
		 */
		pinFolder : function(folderId, args) {

			var promise = this.validateField("folderId", folderId);
			if (promise) {
				return promise;
			}
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["itemId"] = folderId;

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			var callbacks = {
				createEntity : function(service, data, response) {
				}
			};

			return this.updateEntity(consts.AtomPinFolder, options, callbacks);

		},

		/**
		 * Remove a File from a Folder
		 * 
		 * @param {String} folderId the ID of the folder
		 * @param {Stirng} fileId The ID of the File
		 */
		removeFileFromFolder : function(folderId, fileId) {

			var promise = this.validateField("folderId", folderId);
			if (promise) {
				return promise;
			}
			promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["itemId"] = fileId;

			var url = this.constructUrl(consts.AtomRemoveFileFromFolder, null, {
				collectionId : folderId
			});
			var options = {
				method : "DELETE",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			return this.deleteEntity(url, options, fileId);

		},

		/**
		 * Restore a File from Recycle Bin (trash)
		 * 
		 * @param {String} fileId the ID of the file
		 * @param {String} userId the ID of the user
		 */
		restoreFileFromRecycleBin : function(fileId, userId) {

			var promise = this.validateField("fileId", fileId);
			if (promise) {
				return promise;
			}
			promise = this.validateField("userId", userId);
			if (promise) {
				return promise;
			}
			var parameters = args ? lang.mixin({}, args) : {};
			parameters["undelete"] = "true";

			var options = {
				method : "POST",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			var callbacks = {
				createEntity : function(service, data, response) {
					self.dataHandler = new XmlDataHandler({
						data : data,
						namespaces : consts.Namespaces,
						xpath : consts.FileXPath
					});
					return self;
				}
			};

			var url = this.constructUrl(consts.AtomRestoreFileFromRecycleBin, null, {
				userId : userId,
				documentId : fileId
			});

			return this.updateEntity(url, options, callbacks);
		},

		/**
		 * Share a File with community(ies)
		 * 
		 * @param {String} fileId the ID of the file
		 * @param {Object} communityIds The list of community IDs
		 * @param {Object} args the additional arguments
		 */
		shareFileWithCommunities : function(fileId, communityIds, args) {

			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("communityIds", communityIds);
			}
			if (promise) {
				return promise;
			}

			var url = this.constructUrl(consts.AtomShareFileWithCommunities, null, {
				documentId : fileId
			});

			var payload = this._constructPayloadForMultipleEntries(communityIds, "itemId", "community");

			var options = {
				method : "POST",
				headers : consts.AtomXmlHeaders,
				data : payload
			};

			var callbacks = {
				createEntity : function(service, data, response) {
					return response;
				}
			};

			return this.updateEntity(url, options, callbacks);
		},

		/**
		 * Unpin a folder, by sending a DELETE request to the myfavorites feed.
		 * 
		 * @method unpinFolder
		 * @param {String} folderId ID of folder which needs to be unpinned
		 * @param {Object} [args] Argument object.
		 */
		unpinFolder : function(folderId, args) {
			var promise = this.validateField("folderId", folderId);
			if (promise) {
				return promise;
			}

			var parameters = args ? lang.mixin({}, args) : {};
			parameters["itemId"] = folderId;

			var options = {
				method : "DELETE",
				headers : {
					"X-Update-Nonce" : "{X-Update-Nonce}"
				},
				query : parameters
			};

			return this.deleteEntity(consts.AtomPinFolder, options, folderId);

		},

		/**
		 * Update comment created by logged in user
		 * @param {String} fileId the ID of the file
		 * @param {String}commentId the ID of the comment
		 * @param {String} comment the updated comment
		 * @param {Object} args the additional arguments
		 * @returns
		 */
		updateMyComment : function(fileId, commentId, comment, args) {

			return updateComment(fileId, commentId, comment, null, args);
		},

		/**
		 * updates a comment
		 * @param {String} fileId the ID of the file
		 * @param {String} commentId the ID of the comment
		 * @param {String} comment the comment
		 * @param {String} [userId] the ID of the user
		 * @param {Object} [args] the additional arguments
		 * @returns {Object} the updated Comment
		 */
		updateComment : function(fileId, commentId, comment, userId, args) {

			var promise = this.validateField("fileId", fileId);
			if (!promise) {
				promise = this.validateField("comment", comment);
			}
			if (promise) {
				return promise;
			}
			if (!promise) {
				promise = this.validateField("commentId", commentId);
			}
			if (promise) {
				return promise;
			}
			var options = {
				method : "POST",
				query : args || {},
				headers : consts.AtomXmlHeaders,
				data : this._constructPayloadForComment(false, comment)
			};
			var url = null;

			if (!userId) {
				url = this.constructUrl(consts.AtomUpdateMyComment, null, {
					documentId : fileId,
					commentId : commentId
				});
			} else {
				url = this.constructUrl(consts.AtomUpdateComment, null, {
					userId : userId,
					documentId : fileId,
					commentId : commentId
				});
			}
			return this.updateEntity(url, options, this.getCommentFeedCallbacks());
		},

		/**
		 * Add a file to a folder.
		 * 
		 * You cannot add a file from your local directory to a folder; the file must already have been uploaded to the Files application. To add a file
		 * to a folder you must be an editor of the folder.
		 * 
		 * @method addFileToFolder
		 * @param {String} fileId the Id of the file
		 * @param {String} folderId the ID of the folder
		 * @param {String} [userId] the userId of the user in case of own file
		 * @param {Object} [args] Argument object.
		 */
		addFileToFolder : function(fileId, folderId, userId, args) {

			return this.addFileToFolders(fileId, [ folderId ], userId, args);
		},

		/*
		 * Callbacks used when reading a feed that contains File entries.
		 */
		getFileFeedCallbacks : function() {
			return FileFeedCallbacks;
		},

		/*
		 * Callbacks used when reading a feed that contains File Comment entries.
		 */
		getCommentFeedCallbacks : function() {
			return CommentCallbacks;
		},
		
		_constructPayloadFolder : function(name, description, shareWith, operation, entityId) {
			var _this = this;
			var shareWithId = null;
			var shareWithWhat = null;
			var shareWithRole = null;
			if (shareWith && stringUtil.trim(shareWith) != "") {
				var parts = shareWith.split(",");
				if (parts.length == 3) {
					shareWithId = parts[0];
					shareWithWhat = parts[1];
					shareWithRole = parts[2];
				}
			}
			var trans = function(value, key) {
				if (key == "category") {
					value = xml.encodeXmlEntry("collection");
				} else if (key == "id") {
					value = xml.encodeXmlEntry(entityId);
				} else if (key == "label") {
					value = xml.encodeXmlEntry(name);
				} else if (key == "title") {
					value = xml.encodeXmlEntry(name);
				} else if (key == "summary") {
					value = xml.encodeXmlEntry(description);
				} else if (key == "visibility") {
					value = xml.encodeXmlEntry("private");
				} else if (key == "shareWithId" && shareWithId) {
					value = xml.encodeXmlEntry(shareWithId);
				} else if (key == "shareWithWhat" && shareWithWhat) {
					value = xml.encodeXmlEntry(shareWithWhat);
				} else if (key == "shareWithRole" && shareWithRole) {
					value = xml.encodeXmlEntry(shareWithRole);
				}
				return value;
			};
			var transformer = function(value, key) {
				if (key == "getCategory") {
					value = stringUtil.transform(FileCategoryTmpl, _this, trans, _this);
				} else if (key == "getId" && entityId) {
					value = stringUtil.transform(FileIdTmpl, _this, trans, _this);
				} else if (key == "getFolderLabel") {
					value = stringUtil.transform(FolderLabelTmpl, _this, trans, _this);
				} else if (key == "getTitle") {
					value = stringUtil.transform(FileTitleTmpl, _this, trans, _this);
				} else if (key == "getSummary") {
					value = stringUtil.transform(FileSummaryTmpl, _this, trans, _this);
				} else if (key == "getVisibility") {
					value = stringUtil.transform(FileVisibilityTmpl, _this, trans, _this);
				} else if (key == "getVisibilityShare" && shareWithId) {
					value = stringUtil.transform(FileVisibilityShareTmpl, _this, trans, _this);
				}
				return value;
			};
			var postData = stringUtil.transform(FolderTmpl, this, transformer, this);					
			return stringUtil.trim(postData);
		},

		_constructPayloadForMultipleEntries : function(listOfIds, multipleEntryId, category) {
			var payload = FileFeedTmpl;
			var entriesXml = "";
			var categoryXml = "";
			var itemXml = "";
			var currentId = "";
			var transformer = function(value, key) {
				if (key == "category") {
					value = xml.encodeXmlEntry(category);
				} else if (key == "getCategory") {
					value = categoryXml;
				} else if (key == "fileId") {
					value = xml.encodeXmlEntry(currentId);
				} else if (key == "getItem") {
					value = itemXml;
				} else if (key == "getEntries") {
					value = entriesXml;
				}
				return value;
			};
			var _this = this;

			for ( var counter in listOfIds) {
				currentId = listOfIds[counter];
				var entryXml = FileItemEntryTmpl;
				if (category) {
					categoryXml = stringUtil.transform(FileCategoryTmpl, _this, transformer, _this);
				}
				itemXml = stringUtil.transform(FileItemIdTmpl, _this, transformer, _this);
				entryXml = stringUtil.transform(entryXml, _this, transformer, _this);
				entriesXml = entriesXml + entryXml;
			}

			if (entriesXml != "") {
				payload = stringUtil.transform(payload, _this, transformer, _this);
			}					
			return payload;
		},
		
		_constructPayloadForComment : function(isDelete, comment) {

			var payload = FileCommentsTmpl;
			var categoryXml = "";
			var contentXml = "";
			var deleteXml = "";
			var _this = this;

			var transformer = function(value, key) {
				if (key == "category") {
					value = xml.encodeXmlEntry("comment");
				} else if (key == "content") {
					value = xml.encodeXmlEntry(comment);
				} else if (key == "deleteWithRecord") {
					value = "true";
				} else if (key == "getCategory" && categoryXml != "") {
					value = categoryXml;
				} else if (key == "getContent" && contentXml != "") {
					value = contentXml;
				} else if (key == "getDeleteComment" && deleteXml != "") {
					value = deleteXml;
				}
				return value;
			};

			categoryXml = stringUtil.transform(FileCategoryTmpl, _this, transformer, _this);

			contentXml = stringUtil.transform(FileContentTmpl, _this, transformer, _this);
			if (isDelete) {
				deleteXml = stringUtil.transform(FileDeleteCommentTmpl, _this, transformer, _this);
			}

			payload = stringUtil.transform(payload, this, transformer, this);
			return payload;
		},
		
		_constructPayload : function(payloadMap, documentId) {

			var payload = FileEntryTmpl;
			var categoryXml = "";
			var idXml = "";
			var uuidXml = "";
			var labelXml = "";
			var titleXml = "";
			var summaryXml = "";
			var visibilityXml = "";
			var itemXml = "";
			var tagsXml = "";
			var notificationXml = "";
			var currentValue = null;
			var transformer = function(value, key) {
				if (currentValue) {
					value = xml.encodeXmlEntry(currentValue);
				} else if (key == "getCategory" && categoryXml != "") {
					value = categoryXml;
				} else if (key == "getId" && idXml != "") {
					value = idXml;
				} else if (key == "getUuid" && uuidXml != "") {
					value = uuidXml;
				} else if (key == "getLabel" && labelXml != "") {
					value = labelXml;
				} else if (key == "getTitle" && titleXml != "") {
					value = titleXml;
				} else if (key == "getSummary" && summaryXml != "") {
					value = summaryXml;
				} else if (key == "getVisibility" && visibilityXml != "") {
					value = visibilityXml;
				} else if (key == "getItem" && itemXml != "") {
					value = itemXml;
				} else if (key == "getTags" && tagsXml != "") {
					value = tagsXml;
				} else if (key == "getNotification" && notificationXml != "") {
					value = notificationXml;
				}
				return value;
			};

			for ( var currentElement in payloadMap) {
				currentValue = payloadMap[currentElement];
				if (currentElement.indexOf("category") != -1) {
					categoryXml = stringUtil.transform(FileCategoryTmpl, this, transformer, this);
				} else if (currentElement.indexOf("id") != -1) {
					idXml = stringUtil.transform(FileIdTmpl, this, transformer, this);
				} else if (currentElement.indexOf("uuid") != -1) {
					uuidXml = stringUtil.transform(FileUuidTmpl, this, transformer, this);
				} else if (currentElement.indexOf("label") != -1) {
					labelXml = stringUtil.transform(FileLabelTmpl, this, transformer, this);
					titleXml = stringUtil.transform(FileTitleTmpl, this, transformer, this);
				} else if (currentElement.indexOf("summary") != -1) {
					summaryXml = stringUtil.transform(FileSummaryTmpl, this, transformer, this);
				} else if (currentElement.indexOf("visibility") != -1) {
					visibilityXml = stringUtil.transform(FileVisibilityTmpl, this, transformer, this);
				} else if (currentElement.indexOf("itemId") != -1) {
					itemXml = stringUtil.transform(FileItemIdTmpl, this, transformer, this);
				} else if (currentElement.indexOf("tags") != -1) {
					var tags = currentValue;
					for ( var tag in tags) {
						tagsXml += stringUtil.transform(TagsTmpl, {
							"tag" : tags[tag]
						});
					}
				} else if (currentElement.contains("notification")) {
					notificationXml = stringUtil.transform(NotificationTmpl, this, transformer, this);
				}
			}
			currentValue = null;

			payload = stringUtil.transform(payload, this, transformer, this);
			return payload;
		}
	});
	return FileService;
});

},
'sbt/authenticator/SSO':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */ 
/**
 * Social Business Toolkit SDK.
 * Definition of an authentication mechanism.
 */
define(["../declare", "../lang", "../util", "../i18n!../nls/messageSSO"],function(declare, lang, util, ssoMessages) {
/**
 * Proxy SSO authentication.
 * 
 * This class triggers the authentication for a service.
 */
return declare(null, {
	loginUi: "",
	messageSSO: "/sbt/authenticator/templates/MessageSSO.html",
	dialogMessageSSO: "authenticator/templates/MessageDialogSSO.html",
    url: "",
    
    constructor: function(args){
        lang.mixin(this, args || {});
    },
	
    authenticate: function(options) {
    	var self = this;
	    require(['sbt/config'], function(config){
	        var mode =  options.loginUi || config.Properties["loginUi"] || self.loginUi;
	        var messagePage = options.messageSSO || config.Properties["messageSSO"] || self.messageSSO;
	        var dialogMessagePage = options.dialogMessageSSO || config.Properties["dialogMessageSSO"] || self.dialogMessageSSO;
	        if(mode=="popup") {
	            self._authPopup(options, messagePage, self.url);
	        } else if(mode=="dialog") {
	            self._authDialog(options, dialogMessagePage);
	        } else {
	            self._authMainWindow(options, messagePage, self.url);
	        }
	    });
		return true;
    	
	},
	
	_authPopup: function(options, messagePage, sbtUrl) {
        var urlParamsMap = {
            loginUi: 'popup'
        };
        var urlParams = util.createQuery(urlParamsMap, "&");
        var url = sbtUrl+messagePage + '?' + urlParams;
                                         
        var windowParamsMap = {
            width: window.screen.availWidth / 2,
            height: window.screen.availHeight / 2,
            left: window.screen.availWidth / 4,
            top: window.screen.availHeight / 4,
            menubar: 0,
            toolbar: 0,
            status: 0,
            location: 0,
            scrollbars: 1,
            resizable: 1
        };
        var windowParams = util.createQuery(windowParamsMap, ",");
        var loginWindow = window.open(url,'Authentication', windowParams);
        loginWindow.globalSSOStrings = ssoMessages;
        loginWindow.globalEndpointAlias = options.name;
        loginWindow.focus();
        
        return true;
	},
	
	_authDialog: function(options, dialogLoginPage) {
		require(["sbt/_bridge/ui/SSO_Dialog", "sbt/dom"], function(dialog, dom) {	        
			dialog.show(options, dialogLoginPage, ssoMessages);
			dom.setText('reloginMessage', ssoMessages.message);
			dom.setAttr(dom.byId('ssoLoginFormOK'), "value", ssoMessages.relogin_button_text);
		});
		
		return true;
	},
	
	_authMainWindow: function(options, loginPage, sbtUrl) {
		var urlParamsMap = {
            redirectURL: document.URL,
            loginUi: 'mainWindow',
          	message_title: ssoMessages.message_title,
        	message: ssoMessages.message,
        	relogin_button_text: ssoMessages.relogin_button_text
        };
		
        var urlParams = util.createQuery(urlParamsMap, "&");
		var url = sbtUrl+loginPage + '?' + urlParams;
		var loginWindow = window.location.href = url;
		
		return true;
	}
}
);
});
},
'sbt/nls/validate':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  error_callback:"Error running error callback : {0}",
	  error_console:"Error received. Error Code = {0}. Error Message = {1}",
	  validate_nullObject:"{0}.{1} : Null argument provided for {2}. Expected type is {3}",
	  validate_expectedType:"{0}.{1} : {2} argument type does not match expected type {3} for {4}"
  })
  
});
},
'sbt/emailService':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Provides functionality to send emails.
 * 
 * @module sbt.emailService
 */
define(['./declare', './lang', './config', './_bridge/Transport', './json'], function(declare, lang, config, Transport, sbtJson) {
    var transport = new Transport();
    return {
        /**
         * Sends an email.
         * @method send
         * @static
         * @param {Object || Array} email The JSON object representing the email to send.
         * @return {sbt.Promise} A promise to fulfill the send.
         * 
         * @example
         *     var emails = 
         *         [
         *             {
         *                 "from" : "sdary@renovations.com",
         *                 "to" : ["fadams@renovations.com", "tamado@renovations.com"],
         *                 "cc" : ["pclemmons@renovations.com"],
         *                 "bcc" : [],
         *                 "subject" : "This is a test email",
         *                 "mimeParts" : 
         *                     [
         *                         {
         *                             "mimeType" : "text/plain",
         *                             "content" : "This is plain text",
         *                             "headers" : 
         *                                 {
         *                                     "header1":"value1", 
         *                                     "header2":"value2"
         *                                 }
         *                         },
         *                         {
         *                             "mimeType" : "text/html",
         *                             "content" : "<b>This is html</b>"
         *                         },
         *                         {
         *                             "mimeType" : "application/embed+json",
         *                             "content" : {
         *                                 "gadget" : "http://renovations.com/gadget.xml",
         *                                 "context" : {
         *                                     "foo" : "bar"
         *                                 }
         *                             }
         *                         }
         *                     ]
         *              },
         *              {
         *                     "from" : "sdaryn@renovations.com",
         *                     "to" : ["fadams@renovations.com", "tamado@renovations.com"],
         *                     "subject": "This is a test email",
         *                     "mimeParts" : 
         *                         [
         *                             {
         *                                 "mimeType" : "text/plain",
         *                                 "content" : "This is plain text"
         *                             },
         *                             {
         *                                 "mimeType" : "text/html",
         *                                 "content" : "<b>This is html</b>"
         *                             }
         *                         ]
         *              }
         *         ];
         *     var successCallback = function(response) {
         *         //If you send multiple emails, for example emails is an array of email objects,
         *         //than it is possible that some emails succeeded being sent while others may have
         *         //failed.  It is good practice to check for any emails that had errors being sent.
         *         if(response.error && response.error.length != 0) {
         *             //There was one of more errors with emails sent, handle them
         *         }
         *        
         *         if(response.successful  && response.successful.length > 0) {
         *             //Some or all of your emails were successfully sent
         *         }
         *     };
         *  
         *     var errorCallback = function(error) {
         *         //This callback will only be called if there was an error in the request
         *         //being made to the server.  It will NOT be called if there are errors
         *         //with any of the emails being sent.
         *         if(error.message) {
         *             //The request failed handle it.
         *         }
         *     };
         *  
         *     email.send(emails).then(successCallback, errorCallback);
         */
        send : function(emails) {
            var postUrl = config.Properties.serviceUrl + '/mailer';
            
            var options = {
                method: "POST",
                data: sbtJson.stringify(emails),
                headers: {"Content-Type" : "application/json"},
                handleAs: "json"
            };
            
            return transport.request(postUrl, options);
        }
    };
});
},
'sbt/main':function(){
/*
* © Copyright IBM Corp. 2012
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at:
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
* implied. See the License for the specific language governing
* permissions and limitations under the License.
*/

/**
* @module sbt.main
*/
define([
    'sbt/Cache',
    'sbt/DebugTransport',
    'sbt/Endpoint',
    'sbt/ErrorTransport',
    'sbt/Gadget',
    'sbt/GadgetTransport',
    'sbt/IWidget',
    'sbt/Jsonpath',
    'sbt/MockTransport',
    'sbt/Portlet',
    'sbt/Promise',
    'sbt/Proxy',
    'sbt/_config',
    'sbt/compat',
    'sbt/config',
    'sbt/declare',
    'sbt/defer',
    'sbt/dom',
    'sbt/emailService',
    'sbt/i18n',
    'sbt/itemFactory',
    'sbt/json',
    'sbt/lang',
    'sbt/log',
    'sbt/pathUtil',
    'sbt/ready',
    'sbt/stringUtil',
    'sbt/text',
    'sbt/url',
    'sbt/util',
    'sbt/validate',
    'sbt/xml',
    'sbt/xpath',
    'sbt/xsl',
    'sbt/WPSProxy',
    'sbt/authenticator/Basic',
    'sbt/authenticator/GadgetOAuth',
    'sbt/authenticator/OAuth',
    'sbt/authenticator/SSO',
    'sbt/base/AtomEntity',
    'sbt/base/BaseConstants',
    'sbt/base/BaseEntity',
    'sbt/base/BaseService',
    'sbt/base/DataHandler',
    'sbt/base/JsonDataHandler',
    'sbt/base/VCardDataHandler',
    'sbt/base/XmlDataHandler',
    'sbt/base/core',
    'sbt/connections/ActivityConstants',
    'sbt/connections/ActivityService',
    'sbt/connections/ActivityStreamConstants',
    'sbt/connections/ActivityStreamService',
    'sbt/connections/BlogConstants',
    'sbt/connections/BlogService',
    'sbt/connections/BookmarkConstants',
    'sbt/connections/BookmarkService',
    'sbt/connections/CommunityConstants',
    'sbt/connections/CommunityService',
    'sbt/connections/ConnectionsConstants',
    'sbt/connections/ConnectionsService',
    'sbt/connections/FileConstants',
    'sbt/connections/FileService',
    'sbt/connections/FollowConstants',
    'sbt/connections/FollowService',
    'sbt/connections/ForumConstants',
    'sbt/connections/ForumService',
    'sbt/connections/ProfileAdminService',
    'sbt/connections/ProfileConstants',
    'sbt/connections/ProfileService',
    'sbt/connections/SearchConstants',
    'sbt/connections/SearchService',
    'sbt/connections/Tag',
    'sbt/connections/WikiConstants',
    'sbt/connections/WikiService',
    'sbt/data/AtomReadStore',
    'sbt/nls/Endpoint',
    'sbt/nls/ErrorTransport',
    'sbt/nls/loginForm',
    'sbt/nls/messageSSO',
    'sbt/nls/util',
    'sbt/nls/validate',
    'sbt/smartcloud/CommunityConstants',
    'sbt/smartcloud/ProfileConstants',
    'sbt/smartcloud/ProfileService',
    'sbt/smartcloud/SmartcloudConstants',
    'sbt/smartcloud/Subscriber',
    'sbt/store/AtomStore',
    'sbt/store/parameter',
    'sbt/authenticator/nls/SSO',
    'sbt/authenticator/templates/ConnectionsLogin.html',
    'sbt/authenticator/templates/ConnectionsLoginDialog.html',
    'sbt/authenticator/templates/Message.html',
    'sbt/authenticator/templates/MessageDialogSSO.html',
    'sbt/authenticator/templates/MessageSSO.html',
    'sbt/authenticator/templates/login.html',
    'sbt/authenticator/templates/login',
    'sbt/authenticator/templates/loginDialog.html',
    'sbt/authenticator/templates/messageSSO',
    'sbt/connections/nls/CommunityService',
    'sbt/connections/nls/ConnectionsService',
    'sbt/connections/nls/ProfileService'
],function() {
       return;
});

},
'sbt/Proxy':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * Definition of a proxy re-writer.
 * 
 * @module sbt.Proxy
 */
define(['./declare','./lang','./pathUtil'],function(declare,lang,pathUtil) {

    /**
     * Definition of the proxy module
     * 
     * @class sbt.Proxy
     * 
     */
    var Proxy = declare(null, {
    	
    	proxyUrl		: null, 
    	
    	constructor: function(args){
    		lang.mixin(this, args);	
    	},
    	
    	rewriteUrl: function(baseUrl,serviceUrl,proxyPath) {
    		// When this proxy is being used, we don't add the base URL as it will be added on the server side
    		// A different implementation might use the full URL
    		var u = serviceUrl;
    		if(this.proxyUrl) {
    			if(u.indexOf("http://")==0) {
    				u = "/http/"+u.substring(7);
    			} else if(u.indexOf("https://")==0) {
    				u = "/https/"+u.substring(8);
    			}
    			if(proxyPath) {
    				u = pathUtil.concat(proxyPath,u);
    			}
    			return pathUtil.concat(this.proxyUrl,u);
    		}
    		return u;
    	}
    });
    
    return Proxy;

});
},
'sbt/validate':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - JS Validation Utilities
 * @module sbt.validate
 */
define([ "./log", "./stringUtil", "sbt/i18n!sbt/nls/validate","./util" ],
		function(log, stringUtil, nls, util) {
			var errorCode = 400;
			
			return {
				
				/**
				 * Validates Input to be not null and of expected Type
				 * @param {String} [className] class which called this utility
				 * @param {String} [methodName] method which called this utility
				 * @param {String} [fieldName] Name of Field which is being validated
				 * @param {Object} [object] object to be validated
				 * @param {String} [expectedType] expected type of the object
				 * @param {Object} [args] Arguments containing callbacks
				 * @param {Function} [args.error] The error parameter is a callback function that is only invoked when an error occurs. This allows to write
				 * logic when an error occurs. The parameter passed to the error function is a JavaScript Error object indicating what the failure was. From the
				 * error object. one can access the javascript library error object, the status code and the error message.
				 * @param {Function} [args.handle = null] This callback function is called regardless of whether the call to update the file completes or fails.
				 * The parameter passed to this callback is the FileEntry object (or error object). From the error object. one can get access to the javascript
				 * library error object, the status code and the error message.
				 * @static
				 * @method _validateInputTypeAndNotify
				 */
				_validateInputTypeAndNotify : function(className, methodName, fieldName, object, expectedType, args) {
					if (!object || (typeof object == "object" && object.declaredClass && object.declaredClass != expectedType)
							|| (typeof object == "object" && !object.declaredClass && typeof object != expectedType)
							|| (typeof object != "object" && typeof object != expectedType)) {
						var message;
						if (!object) {
							message = stringUtil.substitute(nls.validate_nullObject, [ className, methodName,
									fieldName, expectedType ]);
						} else {
							var actualType;
							if (typeof object == "object" && object.declaredClass) {
								actualType = object.declaredClass;
							} else {
								actualType = typeof object;
							}
							message = stringUtil.substitute(nls.validate_expectedType, [ className, methodName,
									actualType, expectedType, fieldName ]);
						}
						util.notifyError({
							code : errorCode,
							message : message
						}, args);
						return false;
					}
					return true;

				},
				/**
				 * Validates Input to be not null and of expected Type
				 * @param {String} [className] class which called this utility
				 * @param {String} [methodName] method which called this utility
				 * @param {Object} [fieldNames] List of Names of Fields which are being validated
				 * @param {Object} [objects] List of objects to be validated
				 * @param {Object} [expectedTypes] List of expected types of the objects
				 * @param {Object} [args] Arguments containing callbacks
				 * @param {Function} [args.error] The error parameter is a callback function that is only invoked when an error occurs. This allows to write
				 * logic when an error occurs. The parameter passed to the error function is a JavaScript Error object indicating what the failure was. From the
				 * error object. one can access the javascript library error object, the status code and the error message.
				 * @param {Function} [args.handle = null] This callback function is called regardless of whether the call to update the file completes or fails.
				 * The parameter passed to this callback is the FileEntry object (or error object). From the error object. one can get access to the javascript
				 * library error object, the status code and the error message.
				 * @static
				 * @method _validateInputTypeAndNotify
				 */
				_validateInputTypesAndNotify : function(className, methodName, fieldNames, objects, expectedTypes, args) {
					for ( var counter in objects) {
						var object = objects[counter];
						var expectedType = expectedTypes[counter];
						var fieldName = fieldNames[counter];
						if (!(this._validateInputTypeAndNotify(className, methodName, fieldName, object, expectedType, args))) {
							return false;
						}
					}
					return true;

				}
			};
		});

},
'sbt/data/AtomReadStore':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * @module sbt.data.AtomReadStore
 */
define(["../declare","../config", "../lang", "../base/core", "../xml", "../xpath", "../entities"], function(declare, config, lang, core, xml, xpath, entities) {
    
    /**
     * A data store for Atom XML based services or documents.   This store is still under development
     * and doesn't support filtering or paging yet.
     * 
     * @class AtomReadStore
     * @namespace sbt.data
     */
    var AtomReadStore = declare(null, {
        // private
        _endpoint : null,
        _xmlData : null,
        // read only
        totalResults : 0,
        startIndex : 0,
        itemsPerPage : 5,
        items : null,
        // public
        url : "",
        sendQuery : true,
        unescapeHTML : false,
        urlPreventCache : false,
        atom : core.feedXPath,
        attributes : core.entryXPath,
        namespaces : core.namespaces,
        paramSchema: {},
        
        /**
         * Constructor for the AtomRead store.
         * 
         * @param args
         * An anonymous object to initialize properties. It expects the following values:
         *   url: The url to a service or an XML document that represents the store 
         *   unescapeHTML: A boolean to specify whether or not to unescape HTML text 
         *   sendQuery: A boolean indicate to add a query string to the service URL  
         *   endpoint: the endpoint to be used
         */
        constructor: function(args) {
            this._endpoint = config.findEndpoint(args.endpoint || "connections");

            if (args) {
                this.url = args.url;
                this.attributes = args.attributes || this.attributes;
                this.atom = args.feedXPath || this.atom;
                this.namespaces = args.namespaces || this.namespaces;
                this.paramSchema = args.paramSchema || this.paramSchema;
                this.rewriteUrl = args.rewriteUrl;
                this.label = args.label || this.label;
                this.sendQuery = (args.sendQuery || args.sendquery || this.sendQuery);
                this.unescapeHTML = args.unescapeHTML;
                if ("urlPreventCache" in args) {
                    this.urlPreventCache = args.urlPreventCache ? true : false;
                }
            }
            if(!this.url) {
                throw new Error("sbt.data.AtomReadStore: A service URL must be specified when creating the data store");
            }
        },
        
        /**
         * @method getEndpoint
         * @returns
         */
        getEndpoint: function() {
        	return this._endpoint;
        },
        
        setUrl: function(url){
        	this.url = url;
        },
        
        getUrl: function(){
            return this.url;
        },
        
        setAttributes: function(attributes){
        	this.attributes = attributes;
        },
        
        /*
         * Returns defaultValue if and only if *item* does not have a value for *attribute*.
         */
        getValue: function(item, attribute, defaultValue) {
            var xpathCountFunction = /^count\(.*\)$/;
            this._assertIsItem(item);
            this._assertIsAttribute(attribute);
            
            if (!item._attribs[attribute]) {
                var access = this.attributes[attribute];
                if (lang.isFunction(access)) {
                    item._attribs[attribute] = access(item, attribute);
                }else if (access.match(xpathCountFunction)){
                    item._attribs[attribute] = xpath.selectNumber(item.element, this.attributes[attribute], this.namespaces)+"";
                } else {
                    var nodes = xpath.selectNodes(item.element, this.attributes[attribute], this.namespaces);
                    if (nodes && nodes.length == 1) {
                        item._attribs[attribute] = nodes[0].text || nodes[0].textContent;
                    } else if (nodes) {
                        item._attribs[attribute] = [];
                        for (var j=0; j<nodes.length; j++) {
                            item._attribs[attribute].push(nodes[j].text || nodes[j].textContent);
                        }
                    } else {
                        item._attribs[attribute] = null;
                    }
                }
            }

            if (!item._attribs[attribute]) {
                return defaultValue;
            }
            
         
            if(typeof item._attribs[attribute] == "object"){
            	for(var i=0;i<item._attribs[attribute].length; i++){
            		item._attribs[attribute][i] = entities.encode(item._attribs[attribute][i]);
            	}
            }
            else{
            	item._attribs[attribute] = entities.encode(item._attribs[attribute]);
            }
            
            return item._attribs[attribute];
        },
        
        /*
         * This getValues() method works just like the getValue() method, but getValues()
         * always returns an array rather than a single attribute value.
         */
        getValues: function(item, attribute) {
            this._assertIsItem(item);
            this._assertIsAttribute(attribute);
            
            if (!item._attribs[attribute]) {
                var nodes = xpath.selectNodes(item.element, this.attributes[attribute], this.namespaces);
                var values = [];
                for (var i=0; i<nodes.length; i++) {
                    values[i] = nodes[i].text || nodes[i].textContent;
                }
                item._attribs[attribute] = values;
            }

            return item._attribs[attribute];
        },
        
        /*
         *  Returns an array with all the attributes that this item has.
         */
        getAttributes: function(item) {
            var result = [];
            for (var name in this.attributes) {
                if (this.attributes.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        },
        
        /*
         * Returns true if the given *item* has a value for the given attribute*.
         */
        hasAttribute: function(item, attribute) {
            return (this.attributes[attribute] != undefined);
        },
        
        /*
         * Returns true if the given *value* is one of the values that getValues() would return.
         */
        containsValue: function(item, attribute, value) {
            throw new Error("sbt.data.AtomReadStore: Not implemented yet!");
        },

        /*
         * Returns true if *something* is an item and came from the store instance.
         */
        isItem: function(something) {
            if (something && something.element && something.store && something.store === this) {
                return true;
            }
            return false;
        },
        
        /*
         * Return true if *something* is loaded.
         */
        isItemLoaded: function(something) {
            return this.isItem(something);
        },
        
        /*
         * Given an item, this method loads the item so that a subsequent call
         * to store.isItemLoaded(item) will return true.
         */
        loadItem: function(keywordArgs) {
            throw new Error("sbt.data.AtomReadStore: Not implemented yet!");
        },
        
        /*
         * Given a query and set of defined options, such as a start and count of items to return,
         * this method executes the query and makes the results available as data items.
         */
        fetch: function(args) {
            var self = this;
            var scope = args.scope || self;
            
            var serviceUrl = this._getServiceUrl(this._getQuery(args));
            if (!serviceUrl) {
                if (args.onError) {
                    args.onError.call(new Error("sbt.data.AtomReadStore: No service URL specified."));
                }
                return;
            }
            
            this._endpoint.xhrGet({
                serviceUrl : serviceUrl,
                handleAs : "text",
                preventCache: true,
                load : function(response) {
                    try {
                        // parse the data
                    	self.response = response;
                        self._xmlData = xml.parse(response);
                        self.totalResults = parseInt(xpath.selectText(self._xmlData, self.atom.totalResults, self.namespaces));
                        self.startIndex = parseInt(xpath.selectText(self._xmlData, self.atom.startIndex, self.namespaces));
                        self.itemsPerPage = parseInt(xpath.selectText(self._xmlData, self.atom.itemsPerPage, self.namespaces));
                        self.items = self._createItems(self._xmlData);
                        
                        // invoke callbacks
                        if (args.onBegin) {
                            args.onBegin.call(scope, self.totalResults, args);
                        }
                        if (args.onItem) {
                            for(var i=0; i<self._entries; i++){
                                args.onItem.call(scope, self.entries[i], args);
                            }
                        }
                        if (args.onComplete) {
                            args.onComplete.call(scope, args.onItem ? null : self.items, args);
                        }
                    } catch (e) {
                        if (args.onError) {
                            args.onError.call(e);
                        }
                    }
                },
                error : function(error) {
                    if (args.onError) {
                        args.onError.call(error);
                    }
                }
            });
        },
        
        /*
         * The getFeatures() method returns an simple keyword values object
         * that specifies what interface features the datastore implements.
         */
        getFeatures: function() {
            return { 'dojo.data.api.Read': true };
        },
        
        /*
         * The close() method is intended for instructing the store to 'close' out
         * any information associated with a particular request.
         */
        close: function(request) {
            throw new Error("sbt.data.AtomReadStore: Not implemented yet!");
        },
        
        /*
         * Method to inspect the item and return a user-readable 'label' for the item
         * that provides a general/adequate description of what the item is.
         */
        getLabel: function(item) {
            return this.getValue(item, this.label);
        },
        
        /*
         * Method to inspect the item and return an array of what attributes of the item were used
         * to generate its label, if any.
         */
        getLabelAttributes: function(item) {
            return [ this.label ];
        },
        
        // Internals
        
        _getQuery: function(args) {
            var query = args.query || {};
            query.pageSize = args.count || query.pageSize;
            var page = Math.floor(args.start / args.count) + 1; // needs to be a whole number
            query.pageNumber = page;
            
            if(args.sort && args.sort[0]) {
                var sort = args.sort[0];
                query.sortBy = sort.attribute;
                if(sort.descending === true) {
                    query.sortOrder = "desc";
                }
                else if(sort.descending === false) {
                    query.sortOrder = "asc";
                }
            }

            return query;
        },
        
        _getServiceUrl: function(query) {
            if (!this.sendQuery) {
                return this.url;
            }
            if (!query) {
                return this.url;
            }
            if (lang.isString(query)) {
                return this.url + query;
            }
            
            var queryString = "";
            var paramSchema = this.paramSchema;
            for(var key in query) {
                if(key in paramSchema) {
                    var val = paramSchema[key].format(query[key]);
                    if(val) {
                        queryString += val + "&";
                    }
                }
                else {
                    queryString += (key + "=" + query[key] + "&");
                }
            }

            if (!queryString) {
                return this.url;
            }
            var serviceUrl = this.url;
            if (serviceUrl.indexOf("?") < 0){
                serviceUrl += "?";
            } else {
                serviceUrl += "&";
            }
            return serviceUrl + queryString;
        },

        _createItems: function(document) {
            var nodes = xpath.selectNodes(document, this.atom.entries, this.namespaces);
            var items = [];
            for (var i=0; i<nodes.length; i++) {
                items.push(this._createItem(nodes[i]));
            }
            return items;
        },
                
        _createItem: function(element) {
            var attribs = this.getAttributes();
            var xpathCountFunction = /^count\(.*\)$/;
            
            // TODO add item.index and item.attribs
            var item = { 
                element : element,
                getValue : function(attrib) { 
                	var result = [];
                	 if(typeof this[attrib] == "object"){
                     	for(var i=0;i<this[attrib].length; i++){
                     		result[i] = entities.encode(this[attrib][i]);
                     	}
                     }
                     else{
                    	 result = entities.encode(this[attrib]);
                     }
                	
                	return result; 
                }
            };
            for (var i=0; i<attribs.length; i++) {
                var attrib = attribs[i];
                var access = this.attributes[attrib];
                if (lang.isFunction(access)) {
                    item[attrib] = access(this, item);
                } else if (access.match(xpathCountFunction)){
                    item[attrib] = xpath.selectNumber(element, access, this.namespaces)+"";
                } else {
                    var nodes = xpath.selectNodes(element, access, this.namespaces);
                    if (nodes && nodes.length == 1) {
                        item[attrib] = entities.encode(nodes[0].text) || entities.encode(nodes[0].textContent);
                    } else if (nodes) {
                        item[attrib] = [];
                        for (var j=0; j<nodes.length; j++) {
                            item[attrib].push(entities.encode(nodes[j].text) || entities.encode(nodes[j].textContent));
                        }
                    } else {
                        item[attrib] = null;
                    }
                }

            }
           
            return item;
        },
        
        _assertIsItem: function(item) {
            if (!this.isItem(item)) {
                throw new Error("sbt.data.AtomReadStore: Invalid item argument.");
            }
        },
        
        _assertIsAttribute: function(attribute) {
            if (!this.attributes[attribute]) {
                throw new Error("sbt.data.AtomReadStore: Invalid attribute argument.");
            }
        }
        
        
    });
    return AtomReadStore;
    
});
},
'sbt/Promise':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * 
 * @module sbt.Promise
 */
define(["./declare","./log"], function(declare,log) {

    /**
     * Promise class
     * 
     * @class Promise
     * @namespace sbt
     */     
	var Promise = declare(null, {	
		
        // private
        _isRejected : false,
        _isFulfilled : false,
        _isCanceled : false,
        _deferreds : null,
        response : null,
        error : null,
        
        /*
         * Constructor for the promise.
         */
        constructor: function(response) {
            if (response) {
                if (response instanceof Error) {
                    this.rejected(response);
                } else {
                    this.fulfilled(response);
                }
            } else {
                this._deferreds = [];
            }
        },
        
        /*
         * Add new callbacks to the promise.
         */
        then: function(fulfilledHandler, errorHandler) {
        	var promise = new Promise();
            if (this._isFulfilled) {
            	this._fulfilled(fulfilledHandler, errorHandler, promise, this.data);
            } else if (this._isRejected) {
            	this._rejected(errorHandler, promise, this.error);
            } else {
                this._deferreds.push([ fulfilledHandler, errorHandler, promise ]);
            }
            return promise;
        },

        /*
         * Inform the deferred it may cancel its asynchronous operation.
         */
        cancel: function(reason, strict) {
            this._isCanceled = true;
        },

        /*
         * Checks whether the promise has been resolved.
         */
        isResolved: function() {
            return this._isRejected || this._isFulfilled;
        },

        /*
         * Checks whether the promise has been rejected.
         */
        isRejected: function() {
            return this._isRejected;
        },

        /*
         * Checks whether the promise has been resolved or rejected.
         */
        isFulfilled: function() {
            return this._isFulfilled;
        },

        /*
         * Checks whether the promise has been canceled.
         */
        isCanceled: function() {
            return this._isCanceled;
        },

        /*
         * Called if the promise has been fulfilled
         */
        fulfilled : function(data) {
            if (this._isCanceled) {
                return;
            }
            
            this._isFulfilled = true;
            this.data = data;
            
            if (this._deferreds) {
                while (this._deferreds.length > 0) {
                    var deferred = this._deferreds.shift();
                    var fulfilledHandler = deferred[0];
                    var errorHandler = deferred[1];
                    var promise = deferred[2];
                	this._fulfilled(fulfilledHandler, errorHandler, promise, data);
                }
            }
        },
        
        /*
         * Call if the promise has been rejected
         */
        rejected : function(error) {
            if (this._canceled) {
                return;
            }
            
            this._isRejected = true;
            this.error = error;
            
            if (this._deferreds) {
                while (this._deferreds.length > 0) {
                    var deferred = this._deferreds.shift();
                    var errorHandler = deferred[1];
                    var promise = deferred[2];
                	this._rejected(errorHandler, promise, error);
                }
            }
        },
        
        _fulfilled : function(fulfilledHandler, errorHandler, promise, data) {
            if (fulfilledHandler) {
            	try {
                	var retval = fulfilledHandler(data);
                	if (retval instanceof Promise) {
                		retval.then(
                			function(data) {
                				promise.fulfilled(data);
                			},
                			function(error) {
                				promise.rejected(error);
                			}
                		);
                	} else {
                		promise.fulfilled(retval);
                	}
            	} catch (error) {
            		promise.rejected(error);
            	}
            } else {
            	promise.fulfilled(data);
            }
        },
        
        _rejected : function(errorHandler, promise, error) {
            if (errorHandler) {
            	try {
                	var retval = errorHandler(error);
                	if (!retval) {
                		// stop propogating errors
                		promise.rejected(retval);
                	}
            	} catch (error1) {
            		promise.rejected(error1);
            	}
            } else {
            	promise.rejected(error);
            }
        }
	
	});
	return Promise;
});
},
'sbt/_bridge/json':function(){
/**
 * Dojo AMD JSON implementation.
 */
define(['dojo/json'],function(json) {
    return json;
});
},
'sbt/ready':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * @module sbt.ready
 */
define(['./_bridge/ready'],function(ready) {
	return ready;
});

},
'sbt/connections/SearchConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * Definition of constants for SearchService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin(conn, {
    	
        /**
         * Namespaces to be used when reading the Search ATOM feed
         */
        SearchNamespaces : {
            a : "http://www.w3.org/2005/Atom",
            ibmsc : "http://www.ibm.com/search/content/2010",
            opensearch : "http://a9.com/-/spec/opensearch/1.1/",
            relevance : "http://a9.com/-/opensearch/extensions/relevance/1.0/",
            snx : "http://www.ibm.com/xmlns/prod/sn",
            spelling : "http://a9.com/-/opensearch/extensions/spelling/1.0/"
        },
        
        /**
         * XPath expressions used when parsing a Connections Search ATOM feed
         */
        SearchFeedXPath : conn.ConnectionsFeedXPath,

        /**
         * XPath expressions used when parsing a Connections Search facets feed
         * that only contains a single facet
         */
        SingleFacetXPath : {
            // used by getEntitiesDataArray
            entries : "/a:feed/ibmsc:facets/ibmsc:facet[@id='{facet.id}']/ibmsc:facetValue"
            // used by getSummary
            //totalResults : "",
            //startIndex : "",
            //itemsPerPage : ""
        },

        /**
         * XPath expressions used when parsing a Connections Search facet
         */
        FacetValueXPath : {
            // used by getEntityData
            entry : "/ibmsc:facetValue",
            // used by getEntityId
            uid : "@id",
            // used by getters
            id : "@id",
            label : "@label",
            weight : "@weight"
        },

        /**
         * XPath expressions to be used when reading a scope
         */
        ScopeXPath : lang.mixin({}, conn.AtomEntryXPath, {
            link : "link"
        }),
        
        /**
         * XPath expressions to be used when reading a search result
         */
        SearchXPath : lang.mixin({}, conn.AtomEntryXPath, {
            rank : "snx:rank",
            relevance : "relevance:score",
            type : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
            application : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term",
            applicationCount : "count(a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term)",
            primaryComponent : "a:category[ibmsc:field[@id='primaryComponent']]/@term",
            tags : "a:category[not(@scheme)]/@term",
            commentCount : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment']",
            resultLink : "a:link[not(@rel)]/@href",
            bookmarkLink : "ibmsc:field[@id='dogearURL']",
            eventStartDate : "ibmsc:field[@id='eventStartDate']",
            authorJobTitle : "a:content/xhtml:div/xhtml:span/xhtml:div[@class='title']",
            authorJobLocation : "a:content/xhtml:div/xhtml:span/xhtml:div[@class='location']",
            authorCount : "count(a:contributor)",
            contributorCount : "count(a:author)",
            tagCount : "count(a:category[not(@scheme)])",
            highlightField : "ibmsc:field[@id='highlight']",
            fileExtension : "ibmsc:field[@id='fileExtension']",
            memberCount : "snx:membercount",
            communityUuid : "snx:communityUuid",
            containerType : "ibmsc:field[@id='container_type']",
            communityParentLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container' and @type='text/html']/@href",
            parentageMetaID : "ibmsc:field[contains(@id, 'ID')]/@id",
            parentageMetaURL : "ibmsc:field[contains(@id, 'URL')]",
            parentageMetaURLID : "ibmsc:field[contains(@id, 'URL')]/@id",
            objectRefDisplayName : "ibmsc:field[@id='FIELD_OBJECT_REF_DISPLAY_NAME']",
            objectRefUrl : "ibmsc:field[@id='FIELD_OBJECT_REF_URL']",
            accessControl : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/accesscontrolled']/@term",
            commentsSummary : "ibmsc:field[@id='commentsSummary']"
        }),
        
		/**
         * Returns the set of supported values that can be passed to the "scope" parameter of the Search API. 
         * Scopes relating to Connections applications that have not been installed will not be returned.
         */
        AtomScopes : "/${search}/atom/scopes",
        
        /**
         * API call for searching IBM Connections to find content that, for example, contains a specific text 
         * string in its title or content, or is tagged with a specific tag.
         */
        AtomSearch : "/${search}/atom/search",
        
        /**
         * API call for searching IBM Connections to find content that, for example, contains a specific text 
         * string in its title or content, or is tagged with a specific tag.
         */
        AtomMySearch : "/${search}/atom/mysearch",
        
		/**
         * These API's are all deprecated
         */
        publicSearch : "/${search}/atom/search/results",
        mySearch : "/${search}/atom/mysearch/results",
        peopleSearch : "/${search}/atom/search/facets/people",
        myPeopleSearch : "/${search}/atom/mysearch/facets/people",
        tagsSearch : "/${search}/atom/search/facets/tags",
        myTagsSearch : "/${search}/atom/mysearch/facets/tags",
        dateSearch : "/${search}/atom/search/facets/date",
        myDateSearch : "/${search}/atom/mysearch/facets/date",
        sourceSearch : "/${search}/atom/search/facets/source",
        mySourceSearch : "/${search}/atom/mysearch/facets/source"
        

    });
});
},
'sbt/smartcloud/CommunityConstants':function(){
/*
 * ��� Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for CommunityService.
 * 
 * @module sbt.connections.CommunityConstants
 */
define([ "../lang", "../smartcloud/SmartcloudConstants" ], function(lang,conn) {

    return lang.mixin({
  
        /**
         * Namespaces to be used when reading the Communities ATOM entry or feed
         */
        CommunityNamespaces : {
			a : "http://www.w3.org/2005/Atom",
			app : "http://www.w3.org/2007/app",
			snx : "http://www.ibm.com/xmlns/prod/sn",
			opensearch: "http://a9.com/-/spec/opensearch/1.1/"	
		},
        
        /**
         * XPath expressions used when parsing a Connections Communities ATOM feed
         * 
         * @property CommunityFeedXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        CommunityFeedXPath : conn.SmartcloudFeedXPath,

        /**
         * XPath expressions to be used when reading a Community Entry
         * 
         * @property CommunityXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        CommunityXPath : lang.mixin({}, conn.AtomEntryXPath, {
            communityUuid : "a:id",
            communityTheme : "snx:communityTheme",
            logoUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/logo']/@href",
            tags : "a:category[not(@scheme)]/@term",
            memberCount : "snx:membercount",
            communityType : "snx:communityType",
            isExternal : "snx:isExternal"
        }),
        
        /**
         * XPath expressions to be used when reading a Community Member Entry
         * 
         * @property MemberXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        MemberXPath : lang.mixin({}, conn.AtomEntryXPath, {
        	id : "a:contributor/snx:userid",
            uid : "a:contributor/snx:userid",
            role : "snx:role"
        }),
                    
        /**
         * A feed of members.
         * 
         * Retrieve the members feed to view a list of the members who belong to a given community.
         * 
         * Supports: asc, email, page, ps, role, since, sortField, userid
         * 
         * @property AtomCommunityMembers
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityMembers : "${communities}/service/atom/community/members"

        
    }, conn);
});
},
'sbt/_bridge/i18n':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 */
define(['dojo/i18n', 'dojo/date/locale'],function(i18n, dateLocale) {
	    var load = function(id, require, callback){	    	
	    	i18n.load(id, require, callback); 
	    };
	    
	    return {
	    	load : load,
	    	
	        getLocalizedTime: function(date) {
	            return dateLocale.format(date, { selector:"time",formatLength:"short" });
	        },
	            
	        getLocalizedDate: function(date) {
	            return dateLocale.format(date, { selector:"date",formatLength:"medium" });
	        }
	    }; 
});



},
'sbt/nls/util':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  error_callback:"Error running error callback : {0}",
	  error_console:"Error received. Error Code = {0}. Error Message = {1}"	  
  })
  
});
},
'sbt/declare':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - declare() function.
 * 
 * @module sbt.declare
 */
define(['./_bridge/declare'],function(declare) {
	return declare;
});

},
'sbt/connections/ActivityStreamService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * JavaScript API for IBM Connections Activity Stream Service.
 * 
 * @module sbt.connections.ActivityStreamService
 */
define([ "../declare", "../lang", "../stringUtil", "../config", "../Promise", "./ActivityStreamConstants", "./ConnectionsService","../base/BaseEntity",  "../base/DataHandler", 'sbt/json'], 
		function(declare,lang,stringUtil,config,Promise,consts,ConnectionsService, BaseEntity,DataHandler, json) {

	/**
     * JsonDataHandler class
     * 
     * @class JsonDataHandler
     * @namespace sbt.base
     */   
	var ActivityStreamsDataHandler = declare(DataHandler, {	
	    
		constructor : function(args) {
            lang.mixin(this, args);
            this.data = args.data;
		},
        
        getSummary : function() {
            if (!this._summary && this.data.totalResults) {
                this._summary = {
                    totalResults : this.data.totalResults,
                    startIndex : this.data.startIndex,
                    itemsPerPage : this.data.itemsPerPage
                };
            }
            return this._summary;
        },
        
        getEntitiesDataArray : function() {
        	return this.data.list;
        }
	
	});
	
	
    /**
     * ActivityStreamEntry class.
     * 
     * @class ActivityStreamEntry
     * @namespace sbt.connections
     */
    var ActivityStreamEntry = declare(BaseEntity, {

    	data:		null, 
    	
        /**
         * Get published date of activity stream entry
         * 
         * @method getPublishedDate
         */
    	getPublishedDate: function(){
			return this.dataHandler.data.published;
		},

		 /**
         * Get plain title of the activity stream entry. this represents the action that was done by actor
         * 
         * @method getPlainTitle
         */
    	getPlainTitle: function(){
			return this.dataHandler.data.connections.plainTitle;
		},

		 /**
         * Get actor name of the activity stream entry
         * 
         * @method getActorDisplayName
         */
    	getActorDisplayName: function(){
			return this.dataHandler.data.actor.displayName;
		},
		
		 /**
         * Get full actor object of the activity stream entry. Object holds all properties of actor.
				Here is an example of an actor object:
				{
					connections:{
						state:"active"
					},
					objectType:"person",
					id:"urn:lsid:lconn.ibm.com:profiles.person:0EE5A7FA-3434-9A59-4825-7A7000278DAA",
					displayName:"Frank Adams"
				}
         * 
         * @method getActor
         */
    	getActor: function(){
			return this.dataHandler.data.actor;
		},

		 /**
         * Get verb of activity stream entry, verb represents the type of action that was done
         * 
         * @method getVerb
         */
    	getVerb: function(){
			return this.dataHandler.data.verb;
		},

		 /**
         * Get id of activity stream entry
         * 
         * @method getId
         */
    	getId: function(){
			return this.dataHandler.data.id;
		}
    	
      
    });
    
    /**
     * Callbacks used when reading a feed that contains ActivityStream entries.
     */
    var getActivityStreamServiceCallbacks = {
        createEntities : function(service,data,response) {
            return new ActivityStreamsDataHandler({
                data : data
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new ActivityStreamsDataHandler({
                data : data
            });
            return new ActivityStreamEntry({
                service : service,
                dataHandler : entryHandler
            });
        }
    };

    /**
     * ActivityStreamService class.
     * 
     * @class ActivityStreamService
     * @namespace sbt.connections
     */
    var ActivityStreamService = declare(ConnectionsService, {
        
        contextRootMap: {
            connections: "connections"
        },
        
        serviceName : "connections",
        
        /**
         * Constructor for ActivityStreamService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Callbacks used when reading a feed that contains Activity Stream entries.
         */
        getActivityStreamCallbacks: function() {
            return getActivityStreamServiceCallbacks;
        },
        
        /**
         * Get activity stream for given user, group and application type
         * 
         * @method getStream
         * @param {String} [userType] user type for which activity stream is to be obtained.
         * 			  If null is passed for userType, then '@public' will be used as 
         * 			  default
         * @param {String} [groupType] group type for which activity stream is to be obtained
         * 			  If null is passed for userType, then '@all' will be used as 
         * 			  default
         * @param {String} [applicationType] application type for which activity stream is to be obtained
         *            If null is passed for userType, then '@all' will be used as 
         * 			  default
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getStream : function(userType, groupType, applicationType, args) {
        	var _userType = userType || consts.ASUser.PUBLIC; //Default is public updates
			var _groupType = groupType || consts.ASGroup.ALL; // Default is all groups
			var _applicationType = applicationType || consts.ASApplication.STATUS; // Default is all Applications
//			var url = consts.ActivityStreamUrls.activityStreamBaseUrl+this.endpoint.authType+consts.ActivityStreamUrls.activityStreamRestUrl+_userType+"/"+_groupType+"/"+_applicationType;
            var url = this.constructUrl(consts.ActivityStreamUrls.activityStreamBaseUrl+"{authType}"+consts.ActivityStreamUrls.activityStreamRestUrl+"{userType}/{groupType}/{appType}", 
                    {}, 
                    { authType : this.endpoint.authType, userType : _userType, groupType : _groupType, appType : _applicationType });
            var options = {
                method : "GET",
                handleAs : "json",
                query : args || {}
            };
            return this.getEntities(url, options, this.getActivityStreamCallbacks());
        },
        
        /**
         * Get all updates.
         * 
         * @method getAllUpdates
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getAllUpdates : function(args) {
			return this.getStream(consts.ASUser.PUBLIC, consts.ASGroup.ALL, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get my status updates.
         * 
         * @method getMyStatusUpdates
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getMyStatusUpdates : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.ALL, consts.ASApplication.STATUS, args);
        },
        
        /**
         * Get status updates from my network.
         * 
         * @method getStatusUpdatesFromMyNetwork
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getStatusUpdatesFromMyNetwork : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.FRIENDS, consts.ASApplication.STATUS, args);
        },

        /**
         * Get Updates from My Network
         * 
         * @method getUpdatesFromMyNetwork
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getUpdatesFromMyNetwork : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.FRIENDS, consts.ASApplication.ALL, args);
        },

        /**
         * Get Updates from People I Follow
         * 
         * @method getUpdatesFromPeopleIFollow
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getUpdatesFromPeopleIFollow : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.FOLLOWING, consts.ASApplication.STATUS, args);
        },

        /**
         * Get Updates from Communities I Follow
         * 
         * @method getUpdatesFromCommunitiesIFollow
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getUpdatesFromCommunitiesIFollow : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.ALL, consts.ASApplication.COMMUNITIES, args);
        },

        /**
         * Get Updates from a Community
         * 
         * @method getUpdatesFromCommunity
         * @param {String} communityID Community id Community id for which activity Stream
		 *			  is to be obtained
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getUpdatesFromCommunity : function(communityID, args) {
        	var promise = this._validateCommunityUuid(communityID);
            if (promise) {
                return promise;
            }
			return this.getStream(consts.ASUser.COMMUNITY+communityID, consts.ASGroup.ALL, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get Updates from a User
         * 
         * @method getUpdatesFromUser
         * @param {String} userId User id for which activity Stream
		 *	  		  is to be obtained
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getUpdatesFromUser : function(userId, args) {
        	var promise = this._validateUserId(userId);
            if (promise) {
                return promise;
            }
			return this.getStream(userId, consts.ASGroup.INVOLVED, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get Notifications for Me
         * 
         * @method getNotificationsForMe
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getNotificationsForMe : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.RESPONSES, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get Notifications from Me
         * 
         * @method getNotificationsFromMe
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getNotificationsFromMe : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.NOTESFROMME, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get Responses to My Content
         * 
         * @method getResponsesToMyContent
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getResponsesToMyContent : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.RESPONSES, consts.ASApplication.ALL, args);
        },

        /**
         * Get Actions pending on me
         * 
         * @method getMyActionableItems
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getMyActionableItems : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.ACTIONS, consts.ASApplication.ALL, args);
        },

        /**
         * Get Actions pending on me for an applications
         * 
         * @method getMyActionableItemsForApplication
         * @param {String} application name for which pending action items
		 *	  		  are to be obtained
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getMyActionableItemsForApplication : function(application, args) {
        	var promise = this._validateApplicationName(application);
            if (promise) {
                return promise;
            }
			return this.getStream(consts.ASUser.ME, consts.ASGroup.ACTIONS, application, args);
        },
        
        /**
         * Get Updates Saved by me
         * 
         * @method getMySavedItems
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getMySavedItems : function(args) {
			return this.getStream(consts.ASUser.ME, consts.ASGroup.SAVED, consts.ASApplication.ALL, args);
        },
        
        /**
         * Get Updates Saved by me
         * 
         * @method getMySavedItemsForApplication
         * @param {String} application name for which saved items
		 *	  		  are to be obtained
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        getMySavedItemsForApplication : function(application, args) {
        	var promise = this._validateApplicationName(application);
            if (promise) {
                return promise;
            }
			return this.getStream(consts.ASUser.ME, consts.ASGroup.SAVED, application, args);
        },
        
        /**
         * Get searched view by query
         * 
         * @method searchByQuery
         * @param {String} query string for which activity stream search is to be done.
         */
        searchByQuery : function(searchString) {
        	var promise = this._validateSearchQuery(searchString);
            if (promise) {
                return promise;
            }
        	var args = {
        			query : searchString
        	};
			return this.getStream(null, null, null, args);
        },
        
        /**
         * Get searched view by filters
         * 
         * @method searchByFilters
         * @param {String} query Filters can be passed to this method to get as activity stream
         * 		   filtered by them. here is a sample string of two filters:
		 *         "[{'type':'tag','values':['"+tags+"']},{'type':'tag','values':['test','mobile']}]"
         * @param {String} filters Filters can be passed to this method to get as activity stream
         * 		   filtered by them. here is a sample string of two filters:
		 *         "[{'type':'tag','values':['"+tags+"']},{'type':'tag','values':['test','mobile']}]"
         */
        searchByFilters : function(query, filters) {
        	var promise = this._validateSearchQuery(query);
            if (promise) {
                return promise;
            }
        	var promise = this._validateSearchFilters(filters);
            if (promise) {
                return promise;
            }
        	var args = {};
        	args.query = query;
        	args.filters = filters;
			return this.getStream(null, null, null, args);
        },
        
        /**
         * Get searched view by tags
         * 
         * @method searchByTags
         * @param {String} tags string containing tags separated by commas for which activity 
         * 			  stream search is to be done.
         */
        searchByTags : function(tags) {
        	var promise = this._validateSearchTags(tags);
            if (promise) {
                return promise;
            }
        	var args = {};
        	args.filters = "[{'type':'tag','values':['"+tags+"']}]";
			return this.getStream(null, null, null, args);
        },
        
        /**
         * Get searched view by pattern
         * 
         * @method searchByPattern
         * @param {String} pattern string containing tags separated by commas for which activity 
         * 			  stream search is to be done.
         */
        searchByPattern : function(pattern) {
        	var promise = this._validateSearchTags(pattern);
            if (promise) {
                return promise;
            }
        	var args = {};
        	args.custom = pattern;
			return this.getStream(null, null, null, args);
        },

        /**
         * post an Activity Stream entry
         * 
         * @method postEntry
         * @param {Object} postData a json object representing data to be posted
         * @param {String} [userType] user type for which activity stream is to be posted
         *            If null is passed for userType, then '@me' will be used as 
         * 			  default
         * @param {String} [groupType] group type for which activity stream is to be posted
         *            If null is passed for userType, then '@all' will be used as 
         * 			  default
         * @param {String} [applicationType] for which activity stream is to be posted
         *            If null is passed for userType, then '@all' will be used as 
         * 			  default
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        postEntry : function(postData, userType, groupType, applicationType, args) {
        	var _userType = userType || consts.ASUser.ME; //Default is public updates
			var _groupType = groupType || consts.ASGroup.ALL; // Default is all groups
			var _applicationType = applicationType || consts.ASApplication.ALL; // Default is all Applications
			var url = consts.ActivityStreamUrls.activityStreamBaseUrl+this.endpoint.authType+consts.ActivityStreamUrls.activityStreamRestUrl+_userType+"/"+_groupType+"/"+_applicationType;
			var headers = {"Content-Type" : "application/json"};
	   	    var options = {
	            method : "POST",
	            query : args || {},
	            handleAs : "json",
	            headers : headers,
	            data : json.stringify(postData)
	        };
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                return data;
            };	                
            return this.updateEntity(url, options, callbacks, args);
        },
        
        /**
         * post an Activity Stream microblog entry
         * 
         * @method postMicroblogEntry
         * @param {Object/String} postData a json object representing data to be posted
         * @param {String} [userType] user type for which activity stream is to be posted
         *            If null is passed for userType, then '@public' will be used as 
         * 			  default 
         * @param {String} [groupType] group type for which activity stream is to be posted
         *            If null is passed for userType, then '@all' will be used as 
         * 			  default 
         * @param {String} [applicationType] for which activity stream is to be posted
         *            If null is passed for userType, then '@all' will be used as 
         * 			  default 
         * @param {Object} [args] Object representing various parameters
         *            that can be passed to post an activity stream. 
         *            The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        postMicroblogEntry : function(postData, userType, groupType, applicationType, args) {
        	if (typeof postData == "string") {
				postData = {"content":postData};
			} else if (typeof postData == "object") {
				postData = postData;
			} else {
				return this.createBadRequestPromise("Invalid argument with postMicroblogEntry, expected String or Object");
			}
        	var _userType = userType || consts.ASUser.ME; //Default is public updates
			var _groupType = groupType || consts.ASGroup.ALL; // Default is all groups
			var _applicationType = applicationType || ""; // Default is all Applications
			var url = consts.ActivityStreamUrls.activityStreamBaseUrl+this.endpoint.authType+consts.ActivityStreamUrls.activityStreamUBlogRestUrl+_userType+"/"+_groupType+"/"+_applicationType;
			var headers = {"Content-Type" : "application/json"};
	   	    var options = {
	            method : "POST",
	            query : args || {},
	            handleAs : "json",
	            headers : headers,
	            data : json.stringify(postData)
	        };
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                return data;
            };	                
            return this.updateEntity(url, options, callbacks, args);
        },
        
        /*
         * Validate a community UUID, and return a Promise if invalid.
         */
        _validateCommunityUuid : function(communityUuid) {
            if (!communityUuid || communityUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate a search query, and return a Promise if invalid.
         */
        _validateSearchQuery : function(searchQuery) {
            if (!searchQuery || searchQuery.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate application name, and return a Promise if invalid.
         */
        _validateApplicationName : function(application) {
            if (!application || application.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected application name.");
            }
        },
        
        /*
         * Validate search tags, and return a Promise if invalid.
         */
        _validateSearchTags : function(searchTags) {
            if (!searchTags || searchTags.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate search filters, and return a Promise if invalid.
         */
        _validateSearchFilters : function(searchFilters) {
            if (!searchFilters || searchFilters.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate a user ID, and return a Promise if invalid.
         */
        _validateUserId : function(userId) {
            if (!userId || userId.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected userId.");
            }
        }

    });
    return ActivityStreamService;
});

},
'sbt/base/DataHandler':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Helpers for the base capabilities of data
 * handlers.
 * 
 * @module sbt.base.DataHandler
 */
define([ "../declare", "../lang" ], function(declare,lang) {

    /**
     * DataHandler class
     * 
     * @class DataHandler
     * @namespace sbt.base
     */
    var DataHandler = declare(null, {

        /**
         * Data type for this DataHandler
         */
        dataType : null,

        /**
         * Data for this DataHandler
         */
        data : null,

        /**
         * @constructor
         * @param {Object}
         *            args Arguments for this data handler.
         */
        constructor : function(args) {
            lang.mixin(this, args);
        },

        /**
         * Called to set the handler data.
         * 
         * @param data
         */
        setData : function(data) {
        	this.data = data;
        },
        
        /**
         * Called to get the handler data.
         * 
         * @param data
         */
        getData : function() {
        	return this.data;
        },
        
        /**
         * @method getAsString
         * @param data
         * @returns
         */
        getAsString : function(property) {
            return null;
        },

        /**
         * @method getAsNumber
         * @returns
         */
        getAsNumber : function(property) {
            return null;
        },

        /**
         * @method getAsDate
         * @returns
         */
        getAsDate : function(property) {
            return null;
        },

        /**
         * @method getAsBoolean
         * @returns
         */
        getAsBoolean : function(property) {
            return null;
        },

        /**
         * @method getAsArray
         * @returns
         */
        getAsArray : function(property) {
            return null;
        },

        /**
         * @method getEntityId
         * @returns
         */
        getEntityId : function(data) {
            return null;
        },

        /**
         * @param parent
         * @returns
         */
        getEntityData : function(parent) {
            return data;
        },

        /**
         * @method getSummary
         * @returns
         */
        getSummary : function() {
            return null;
        },

        /**
         * @method getEntitiesDataArray
         * @returns {Array}
         */
        getEntitiesDataArray : function() {
            return [];
        }, 
        
        /**
         * @method toJso
         * @returns {Object}
         */
        toJson : function() {
        }

    });
    return DataHandler;
});
},
'sbt/dom':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Definition of some DOM utilities.
 * 
 * @module sbt.dom
 */
define(['./_bridge/dom'],function(dom) {
	// The actual implementation is library dependent
	// NOTE: dom.byId returns either a DOM element or false (null/undefined) 
	return dom;
});

},
'sbt/authenticator/templates/messageSSO':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

function cancelOnClick() {
    var argsMap = getArgsMap();// get map of query string arguments
    var redirectURL = decodeURIComponent(argsMap.redirectURL);
    var loginUi = decodeURIComponent(argsMap.loginUi);
    if (loginUi == "popup") {
    	opener.location.reload();
        window.close();
    } else {
        window.location.href = redirectURL;
    }
}

function onLoginPageLoad() {
    var argsMap = getArgsMap();// get map of query string arguments
    if(argsMap.loginUi == "popup"){
        var ssoStrings = window.globalSSOStrings;
    	document.getElementById('reloginMessage').appendChild(document.createTextNode(decodeURIComponent(ssoStrings.message)));
    	document.getElementById('ssoLoginFormOK').value = decodeURIComponent(ssoStrings.relogin_button_text);
    }else{
    	document.getElementById('reloginMessage').appendChild(document.createTextNode(decodeURIComponent(argsMap.message)));
    	document.getElementById('ssoLoginFormOK').value = decodeURIComponent(argsMap.relogin_button_text);
    }

}

function getArgsMap() {
    try {
        var qString = location.search.substring(1);// getting query string args
        var qStringParams = qString.split("&");// getting array of all query
                                                // string arg key value pairs
        var argsMap = {};
        var i;
        for (i = 0; i < qStringParams.length; i++) {
            var argArray = qStringParams[i].split("=");
            argsMap[argArray[0]] = argArray[1];
        }
        return argsMap;
    } catch (err) {
        console.log("Error making agrs map in messageSSO.js " + err);
    }
}
},
'sbt/connections/ConnectionsService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Connections common APIs allow application programs to discover information about IBM� Connections as a whole.
 * 
 * @module sbt.connections.ConnectionsService
 */
define([ "../declare", "../config", "../Promise", "./ConnectionsConstants", "../base/BaseService",
         "../base/AtomEntity", "../base/XmlDataHandler", "../xpath" ], 
    function(declare,config,Promise,consts,BaseService,AtomEntity,XmlDataHandler,xpath) {
	
	var CategoryConnectionsBookmark = "<category term=\"bookmark\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>"; 
	var CategoryMember = "<category term=\"person\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	var CategoryServiceConfig = "<category term=\"service-config\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>"
	
    var ServiceConfigsDataHandler = declare(XmlDataHandler, {
        /**
         * @method getSummary
         * @returns
         */
    	getSummary : function() {
    		var languageTermsArray = this._selectArray("language");
    		var languageLabelsArray = this._selectArray("languageLabels");
    		var displayLanguagesMap = [];
    		for(var i=0;i<languageTermsArray.length;i++){
    			displayLanguagesMap.push({label: languageLabelsArray[i], term: languageTermsArray[i]});
    		}
    		if (!this._summary) {
                this._summary = {
                		isEmailExposed : (xpath.selectText(this.data, this._getXPath("emailConfig"), this.namespaces)=="email-exposed")?"true":"false",
                		displayLanguages : displayLanguagesMap
                };
            }
            return this._summary;
        }
    });
		
		
	 /**
     * ServiceConfig class represents an entry for a service config of a Connections server
     * 
     * @class ServiceConfig
     * @namespace sbt.connections
     */
    var ServiceConfig = declare(AtomEntity, {

    	xpath : consts.ServiceConfigXPath,
    	namespaces : consts.Namespaces,
    	categoryScheme : CategoryServiceConfig,
    	    	
        /**
         * Construct a ServiceConfig entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the value of IBM Connections service config alternate SSL URL from service config ATOM
         * entry document.
         * 
         * @method getAlternateSSLUrl
         * @return {String} Alternate SSL URL
         */
        getAlternateSSLUrl : function() {
            return this.getAsString("alternateSSLUrl");
        }
    });
    
    /**
     * Member class represents an entry for a member of a Connections Activity, Community or Forum
     * 
     * @class Member
     * @namespace sbt.connections
     */
    var Member = declare(AtomEntity, {

    	xpath : consts.MemberXPath,
    	namespaces : consts.Namespaces,
    	categoryScheme : CategoryMember,
    	    	
        /**
         * Construct a Member entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the value of IBM Connections bookmark URL from bookmark ATOM
         * entry document.
         * 
         * @method getUrl
         * @return {String} Bookmark URL of the bookmark
         */
        getRole : function() {
            return this.getAsString("role");
        }
    });
    
    /**
     * ReportEntry class represents the elements in a report created to flag inappropriate content. 
     * 
     * @class ReportEntry
     * @namespace sbt.connections
     */
    var ReportEntry = declare(AtomEntity, {

    	xpath : consts.ReportEntryXPath,
    	namespaces : consts.Namespaces,
    	    	
        /**
         * Construct a ReportEntry entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Returns the type of issue reported
         * The default values are:
		 *	001
		 *	Legal issue
		 *  002
		 *	Human resource issue
         * 
         * @method getCategoryIssue
         * @return {String} Issue type
         */
        getCategoryIssue : function() {
            return this.getAsString("categoryIssue");
        },
        
        /**
         * Return the related link url entry that you want to flag
         * 
         * @method getReportedItemLink
         * @return {String} Reported item link url
         */
        getReportedItemLink : function() {
            return this.getAsString("reportItemLink");
        },
        
        /**
         * Return the related link url of the ATOM entry document .Required when flagging blog posts or blog comnments
         * 
         * @method getRelatedLink
         * @return {String} Related link url
         */
        getRelatedLink : function() {
            return this.getAsString("relatedLink");
        },
        
        /**
         * Return the id of the concerned entry
         * 
         * @method getReferredEntryId
         * @return {String} Reported item id
         */
        getReferredEntryId : function() {
            return this.getAsString("inRefTo");
        }
    });
    
    /**
     * ReportEntry class represents the elements in a report created to flag inappropriate content. 
     * 
     * @class ReportEntry
     * @namespace sbt.connections
     */
    var ModerationActionEntry = declare(AtomEntity, {

    	xpath : consts.ModerationActionEntryXPath,
    	namespaces : consts.Namespaces,
    	    	
        /**
         * Construct a ModerationActionEntry entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Returns the type of moderation action to be taken
         * The options for premoderation are:
		 *	    approve
		 *	    reject
		 * The options for post-moderation are:
		 *	    dismiss
		 *	    quarantine
		 *	    restore
		 *	For Blogs, the option return is also supported for post-moderation of posts, but not comments.
         * 
         * @method getModerationAction
         * @return {String} Issue type
         */
        getModerationAction : function() {
            return this.getAsString("moderationAction");
        },
        
        /**
         * Return the related link url of the entry on which you want to take action using a link element.
         * This element is used in the Blogs API.
         * 
         * @method getRelatedLink
         * @return {String} Related link url
         */
        getRelatedLink : function() {
            return this.getAsString("relatedLink");
        },
        
        /**
         * Return the resource-id of the concerned entry
         * 
         * @method getReferredEntryId
         * @return {String} Moderated item id
         */
        getReferredEntryId : function() {
            return this.getAsString("inRefTo");
        }
    });
    
    /*
     * Callbacks used when reading a connections service configs feed.
     */
    var ConnectionsServiceConfigsCallbacks = {
        createEntities : function(service,data,response) {
            return new ServiceConfigsDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ConnectionsServiceDocsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new ServiceConfig({
            	service : service,
                data : data,
                response : response
            });
        }
    };

    /**
     * ConnectionService class.
     * 
     * @class ConnectionService
     * @namespace sbt.connections
     */
    var ConnectionsService = declare(BaseService, {

        /**
         * Constructor for ConnectionsService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        	if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },

        /**
         * Return the default endpoint name if client did not specify one.
         * @returns {String}
         */
        getDefaultEndpointName : function() {
            return "connections";
        },
        
        /**
         * Retrieve configuration information for the server.
         * 
         * @method getServiceConfigs
         * 
         */
        getServiceConfigEntries : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            url = this.constructUrl(consts.ServiceConfigs, null, {
            	service : this.serviceName
			});
            return this.getEntities(url, options, ConnectionsServiceConfigsCallbacks);
        }

    });
    return ConnectionsService;
});
},
'sbt/store/parameter':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * 
 */
define(["../stringUtil", "../config"], function(stringUtil, config) {
    var Formatter = {
        defaultFormat: function(param, val) {
            return param.key + "=" + val;
        },
        sortField: function(vals) {
            return function(param, val) {
                var v = vals[val] || "";
                return param.key + "=" + v;
            };
        },
        
        ascSortOrderBoolean: function(param, val) {
            var v = (val === "asc") ? true : false;
            return param.key + "=" + v;
        },
        
        sortOrder: function(param,val){
            return param.key + "=" + val;
        },
        
        oneBasedInteger: function(param, val) {
            var v = Math.floor(val);
            if(v < 1) {
                v = 1;
            }
            return param.key + "=" + v;
        },
        
        zeroBaseInteger: function(param, val) {
            var v = Math.floor(val);
            if(v < 0) {
                v = 0;
            }
            return param.key + "=" + v;
        }

    };
    
    
    var Parameter = function(args) {
        var self = this;
        this.key = args.key;
        var formatFunc = args.format || Formatter.defaultFormat;
        this.format = function(val) {
            return formatFunc(self, val);
        };
    };
    
   
    return {
    	 defaultFormat: function (key){
			 return new Parameter({key: key, format: Formatter.defaultFormat}); 
		 },
		 
		 sortField: function(key, sortVals){
			return new Parameter({key: key, format: Formatter.sortField(sortVals)}); 
		 },
		 
		 sortOrder: function(key){
			 return new Parameter({key: key, format: Formatter.sortOrder});
		 },
		 
		 booleanSortOrder: function (key){
			 return new Parameter({key: key, format: Formatter.ascSortOrderBoolean});
		 },
        
        /**
         * 
         * @param key
         * @returns
         */
        zeroBasedInteger :  function(key) {
        	return new Parameter({ key: key, format: Formatter.zeroBasedInteger });
        },
        
        /**
         * 
         * @param key
         * @returns
         */
        oneBasedInteger :  function(key) {
        	return new Parameter({ key: key, format: Formatter.oneBasedInteger });
        }
    };
});

},
'sbt/url':function(){
define(['./declare'], function(declare){
    // regexp    /^(?:(scheme)(:))?(\/\/)(?:(userna)(:)(passwo)(@))?(domain  )(?:(:)(port   ))?(path      )?(?:(\?)(query ))?(?:(#)(fr))?$/
    var URL_RE = /^(?:([A-z]+)(:))?(\/\/)(?:([^?#]*)(:)([^?#]*)(@))?([\w.\-]+)(?:(:)(\d{0,5}))?([\w.\/\-]+)?(?:(\?)([^?#]*))?(?:(#)(.*))?$/;
    var URL_RE_GROUPS = {
        'URL': 0,
        'SCHEME': 1,
        'SCHEME_COLON': 2,
        'SCHEME_SLASHES': 3,
        'USER': 4,
        'PASSWORD_COLON':5,
        'PASSWORD': 6,
        'USER_AT': 7,
        'HOSTNAME': 8,
        'PORT_COLON':9,
        'PORT': 10,
        'PATH': 11,
        'QUERY_QUESTION':12,
        'QUERY': 13,
        'FRAGMENT_HASH': 14,
        'FRAGMENT': 15
    };
    
    /**
    A class for representing urls.

    @class url 
    @constructor
    **/
    var url = declare(null, {
        /*
        Holds the parts of the url after URL_RE parses the url.

        @property _resultStore 
        @type Array
        **/
        _resultStore: [],
        
        /*
         * Ensures that, when setting a value, the required delimiter is before it, and when setting a value null, the relevant delimiter is not before it.
         * 
         * e.g. setQuery(query). If there was no ? in the url then the url will still not have one when you set the query. It needsto be set in this case. If there was one and you set it null, it needs to be removed.
         */
        _ensureDelimiter: function(urlPart, delimGroupNum, delim){
            if(!urlPart && this._resultStore[delimGroupNum]){// if we are setting port empty, ensure there is no : before the port.
                this._resultStore[delimGroupNum] = undefined;
            }else if(urlPart && !this._resultStore[delimGroupNum]){// if we are setting port not empty, ensure there is a : before the port.
                this._resultStore[delimGroupNum] = delim;
            } 
        },
        
        /*
        @method constructor
        **/
        constructor: function(url){
            this.setUrl(url);
        },
        
        /**
        @method getUrl
        @return {String} Returns the url in its current state.
        **/
        getUrl: function(){
            return this._resultStore.slice(1).join("");
        },
        
        /**
        @method setUrl
        @param url {String}
        **/
        setUrl: function(url){
            this._resultStore = URL_RE.exec(url);
        },
        
        /**
        @method getScheme
        @return {String} Returns the scheme in its current state.
        **/
        getScheme: function(){
            return this._resultStore[URL_RE_GROUPS.SCHEME];
        },
        
        /**
        @method setScheme
        @param scheme {String}
        @param keepSlashes {Boolean} If true, keep the // even if the scheme is set empty. e.g. //ibm.com is a valid url
        **/
        setScheme: function(scheme, keepSlashes){
            this._ensureDelimiter(scheme, URL_RE_GROUPS.SCHEME_COLON, ':');
            if(!keepSlashes || scheme){ // If they want to keep slashes and the scheme provided is empty, do not do the ensure part.
                this._ensureDelimiter(scheme, URL_RE_GROUPS.SCHEME_SLASHES, '//'); 
            }else{ // they want to keep slashes and the scheme provided is empty
                this._resultStore[URL_RE_GROUPS.SCHEME_SLASHES] = '//';
            }
            
            this._resultStore[URL_RE_GROUPS.SCHEME] = scheme;
        },
        
        /**
        @method getUser
        @return {String} Returns the username in its current state.
        **/
        getUser: function(){
            return this._resultStore[URL_RE_GROUPS.USER];
        },
        
        /**
        @method setUser
        @param user {String}
        **/
        setUser: function(user){
            this._ensureDelimiter(user, URL_RE_GROUPS.USER_AT, '@');
            this._resultStore[URL_RE_GROUPS.USER] = user;
        },
        
        /**
        @method getPassword
        @return {String} Returns the password (domain) in its current state.
        **/
        getPassword: function(){
            return this._resultStore[URL_RE_GROUPS.PASSWORD];
        },
        
        /**
        @method setPassword
        @param password {String}
        **/
        setPassword: function(password){
            this._ensureDelimiter(password, URL_RE_GROUPS.PASSWORD_COLON, ':');
            this._resultStore[URL_RE_GROUPS.PASSWORD] = password;
        },
        
        /**
        @method getHostName
        @return {String} Returns the hostname (domain) in its current state.
        **/
        getHostName: function(){
            return this._resultStore[URL_RE_GROUPS.HOSTNAME];
        },
        
        /**
        @method setHostName
        @param hostName {String}
        **/
        setHostName: function(hostName){
            this._resultStore[URL_RE_GROUPS.HOSTNAME] = hostName;
        },

        /**
        @method getPort
        @return {String} Returns the port in its current state.
        **/
        getPort: function(){
            return this._resultStore[URL_RE_GROUPS.PORT];
        },
        
        /**
        @method setPort
        @param port {Number}
        **/
        setPort: function(port){
            this._ensureDelimiter(port, URL_RE_GROUPS.PORT_COLON, ':');
            this._resultStore[URL_RE_GROUPS.PORT] = port;
        },
        
        /**
        @method getPath
        @return {String} Returns the path in its current state.
        **/
        getPath: function(){
            return this._resultStore[URL_RE_GROUPS.PATH];
        },
        
        /**
        @method setPath
        @param path {String}
        **/
        setPath: function(path){
            this._resultStore[URL_RE_GROUPS.PATH] = path;
        },
        
        /**
        @method getQuery
        @return {String} Returns the query in its current state.
        **/
        getQuery: function(){
            return this._resultStore[URL_RE_GROUPS.QUERY];
        },
        
        /**
        @method setQuery
        @param query {String}
        **/
        setQuery: function(query){
            this._ensureDelimiter(query, URL_RE_GROUPS.QUERY_QUESTION, '?');
            this._resultStore[URL_RE_GROUPS.QUERY] = query;
        },
        
        /**
        @method getFragment
        @return {String} Returns the fragment in its current state.
        **/
        getFragment: function(){
            return this._resultStore[URL_RE_GROUPS.FRAGMENT];
        },
        
        /**
        @method setFragment
        @param fragment {String}
        **/
        setFragment: function(fragment){
            this._ensureDelimiter(fragment, URL_RE_GROUPS.FRAGMENT_HASH, '#');
            this._resultStore[URL_RE_GROUPS.FRAGMENT] = fragment;
        },
        
        /**
        @method getBaseUrl
        @return {String} Utility method, returns the url up until before the query.
        **/
        getBaseUrl: function(){
            return this._resultStore.slice(1, URL_RE_GROUPS.QUERY).join("");
        }
    });
    return url;
});
},
'sbt/ErrorTransport':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Implementation of a transport that emits an error the first time it is invoked.
 * @module sbt.ErrorTransport
 */
define(['./declare','./lang','./Promise','./stringUtil','./log','sbt/i18n!sbt/nls/ErrorTransport'], function(declare,lang,Promise,stringUtil,log,nls) {
    return declare(null, {
        _called: false,
        _endpointName: null,
        _message: null,
        
        constructor: function(endpointName, message) {
            this._endpointName = endpointName;
            if (message) {
                this._message = message;
            } else {
            	this._message = stringUtil.substitute(nls.endpoint_not_available, [endpointName]);
            }
        },
        
        request : function(url,options) {
            if (!this._called) {
                alert(this._message);
                this._called = true;
            }
            var promise = new Promise();
            var error = new Error(this._message);
            error.status = 400;
            promise.rejected(error);
            return promise;
        },
        
        xhr: function(method, args, hasBody) {
            if (!this._called) {
                log.error(this._message);
                this._called = true;
            }
            var _handle = args.handle;
            var _error = args.error;
            if (lang.isFunction(_error) || lang.isFunction(_handle)) {
                var error = new Error(this._message);
                error.status = 400;
                if(lang.isFunction(_error)){
                	_error(error);
                }
                if(lang.isFunction(_handle)){
                	_handle(error);
                }                
            }
        }
    });
});
},
'sbt/_bridge/ready':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - ready() function.
 */
define(['dojo/ready'],function(ready) {
	return function(fct) {
		ready(fct);
	};
});
},
'sbt/base/core':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * Helpers for the core capabilities
 */
define(['../config'],function(sbt) {

	/**
	 * Global Namespaces Object.
	 */
	return {
		// Namespaces used when parsing Atom feeds
        namespaces : {
            o : "http://ns.opensocial.org/2008/opensocial",
            app : "http://www.w3.org/2007/app",
            thr : "http://purl.org/syndication/thread/1.0",
            fh : "http://purl.org/syndication/history/1.0",
            snx : "http://www.ibm.com/xmlns/prod/sn",
            opensearch : "http://a9.com/-/spec/opensearch/1.1/",
            a : "http://www.w3.org/2005/Atom",
            h : "http://www.w3.org/1999/xhtml",
            td: "urn:ibm.com/td",
            relevance: "http://a9.com/-/opensearch/extensions/relevance/1.0/",
            ibmsc: "http://www.ibm.com/search/content/2010",
            xhtml: "http://www.w3.org/1999/xhtml"
        },
        
        feedXPath : {
            "entry" : "/a:feed/a:entry",
            "entries" : "/a:feed/a:entry",
            "totalResults" : "/a:feed/opensearch:totalResults",
            "startIndex" : "/a:feed/opensearch:startIndex",
            "itemsPerPage" : "/a:feed/opensearch:itemsPerPage"
        },
                
        entryXPath : {
            "title" : "a:title",
            "summaryText" : "a:summary[@type='text']",
            "selfUrl" : "a:link[@rel='self']/@href",
            "terms" : "a:category/@term",
            "contentHtml" : "a:content[@type='html']",
            "published" : "a:published",
            "updated" : "a:updated",
            "authorId" : "a:author/snx:userid",
            "contributorId" : "a:contributor/snx:userid"
        }	
	};
});
},
'sbt/connections/ActivityStreamConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for ActivityStreamService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({}, conn, {
    	
		ASUser: {
			ME : "@me",
			PUBLIC : "@public",
			COMMUNITY : "urn:lsid:lconn.ibm.com:communities.community:",//Suffix Community with it id wherever this constant is used.
			UBLOG : "ublog"
		},
		ASGroup: {
			ALL : "@all",
			FOLLOWING : "@following",
			FRIENDS : "@friends",
			SELF : "@self",
			INVOLVED : "@involved",
			NOTESFORME : "@notesforme",
			NOTESFROMME : "@notesfromme",
			RESPONSES : "@responses",
			ACTIONS : "@actions",
			SAVED : "@saved"
		},
		ASApplication: {
			ALL : "@all",
			COMMUNITIES : "@communities",
			TAGS : "@tags",
			PEOPLE : "@people",
			STATUS : "@status",
			NOTESFORME : "@notesforme",
			NOTESFROMME : "@notesfromme",
			RESPONSES : "@responses",
			COMMENTS : "comments"
		},
		Verb: {
			 ACCEPT : "accept",
			 ACCESS : "access",
			 ACKNOWLEDGE : "acknowledge",
			 ADD : "add",
			 AGREE : "agree",
			 APPEND : "append",
			 APPROVE : "approve",
			 ARCHIVE : "archive",
			 ASSIGN : "assign",
			 AT : "at",
			 ATTACH : "attach",
			 ATTEND : "attend",
			 AUTHOR : "author",
			 AUTHORIZE : "authorize",
			 
			 BORROW	: "borrow",
			 BUILD : "build",
			 
			 CANCEL	: "cancel",
			 CLOSE : "close",
			 COMMENT : "comment",
			 COMPLETE : "complete",
			 CONFIRM : "confirm",
			 CONSUME : "consume",
			 CHECKIN : "checkin",
			 CREATE : "create",
			 
			 DELETE : "delete",
			 DELIVER : "deliver",
			 DENY : "deny",
			 DISAGREE : "disagree",
			 DISLIKE : "dislike",
			 
			 EXPERIENCE	: "experience",
			 
			 FAVORITE : "favorite",
			 FIND : "find",
			 FLAG_AS_INAPPROPRIATE : "flag-as-inappropriate",
			 FOLLOW	: "follow",
			 
			 GIVE : "give",
			 
			 HOST : "host",
			 
			 IGNORE	: "ignore",
			 INSERT	: "insert",
			 INSTALL : "install",
			 INTERACT : "interact",
			 INVITE	: "invite",
			 
			 JOIN : "join",
			 
			 LEAVE : "leave",
			 LIKE : "like",
			 LISTEN	: "listen",
			 LOSE : "lose",
			 
			 MAKE_FRIEND : "make-friend",
			 
			 OPEN : "open",
			 
			 POST : "post",
			 PLAY : "play",
			 PRESENT : "present",
			 PURCHASE : "purchase",
			 
			 QUALIFY : "qualify",
			 
			 READ : "read",
			 RECEIVE : "receive",
			 REJECT : "reject",
			 REMOVE : "remove",
			 REMOVE_FRIEND : "remove-friend",
			 REPLACE : "replace",
			 REQUEST : "request",
			 REQUEST_FRIEND : "request-friend",
			 RESOLVE : "resolve",
			 RETURN : "return",
			 RETRACT : "retract",
			 RSVP_MAYBE	: "rsvp-maybe",
			 RSVP_NO : "rsvp-no",
			 RSVP_YES : "rsvp-yes",
			 
			 SATISFY : "satisfy",
			 SAVE : "save",
			 SCHEDULE : "schedule",
			 SEARCH	: "search",
			 SELL : "sell",
			 SEND : "send",
			 SHARE : "share",
			 SPONSOR : "sponsor",
			 START : "start",
			 STOP_FOLLOWING : "stop-following",
			 SUBMIT : "submit",
			 
			 TAG : "tag",
			 TERMINATE : "terminate",
			 TIE : "tie",
			 
			 UNFAVORITE	: "unfavorite",
			 UNLIKE	: "unlike",
			 UNSAVE	: "unsave",
			 UNSATISFY : "unsatisfy",
			 UNSHARE : "unshare",
			 UPDATE : "update",
			 USE : "use",
			 
			 WATCH : "watch",
			 WIN : "win"
		},
		ActivityStreamUrls: {
			activityStreamBaseUrl : "/${connections}/opensocial/",
			activityStreamRestUrl : "/rest/activitystreams/",
			activityStreamUBlogRestUrl : "/rest/ublog/"
		},
		errorMessages:{
			args_object	: "argument passed to get stream should be an Object",
			required_communityid : "Community ID is required"
		}
    });
});
},
'sbt/_bridge/lang':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Some language utilities.
 */
define(['dojo/_base/lang', 'dojo/has', 'dojo/_base/sniff'],function(lang, has) {
	return {
		mixin: function(dest,sources) {
		    return lang.mixin.apply(this, arguments);
		},
		isArray: function(o) {
			return lang.isArray(o);
		},
		isString: function(o) {
			return lang.isString(o);
		},
        isFunction: function(o) {
            return typeof o == 'function';
        },
        isObject: function(o) {
            return typeof o == 'object';
        },
		clone: function(o) {
			return lang.clone(o);
		},
        concatPath: function() {
        	var a = arguments;
        	if(a.length==1 && this.isArray(a[0])) {
        		a = a[0];
        	}
        	var s = "";
        	for(var i=0; i<a.length; i++) {
        		var o = a[i].toString();
        		if(s) {
        			s = s + "/";
        		}
        		s = s + (o.charAt(0)=='/'?o.substring(1):o);
        	}
        	return s;
        },
        trim: function(str) {
            return lang.trim(str);
        },
        getObject: function(name, create, context) {
            return lang.getObject(name, create, context);
        },
        hitch: function(scope, method) {
        	return lang.hitch(scope, method);
        },
        isIE: function(){
            return has("ie");
        }
	};
});
},
'sbt/connections/nls/ProfileService':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for ProfileService
 */
define({
  root: ({
	  invalid_argument : "Invalid Argument"
  })
});
},
'sbt/connections/ForumService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Forums application of IBM� Connections enables a team to discuss issues that are pertinent to their work. 
 * The Forums API allows application programs to create new forums, and to read and modify existing forums.
 * 
 * @module sbt.connections.ForumService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./ForumConstants", "./ConnectionsService", "../base/AtomEntity", "../base/XmlDataHandler" ], 
    function(declare,config,lang,stringUtil,Promise,consts,ConnectionsService,AtomEntity,XmlDataHandler) {
	
	var CategoryForum = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"forum-forum\"></category>";
	var CategoryTopic = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"forum-topic\"></category>";
	var CategoryReply = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"forum-reply\"></category>";
	var CategoryRecommendation = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"recommendation\"></category>";
    
	var CommunityTmpl = "<snx:communityUuid xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\">${getCommunityUuid}</snx:communityUuid>";
	var TopicTmpl = "<thr:in-reply-to xmlns:thr=\"http://purl.org/syndication/thread/1.0\" ref=\"urn:lsid:ibm.com:forum:${getForumUuid}\" type=\"application/atom+xml\" href=\"\"></thr:in-reply-to>";
	var ReplyTmpl = "<thr:in-reply-to xmlns:thr=\"http://purl.org/syndication/thread/1.0\" ref=\"urn:lsid:ibm.com:forum:${getTopicUuid}\" type=\"application/atom+xml\" href=\"\"></thr:in-reply-to>";
	var FlagTmpl = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\" term=\"${flag}\"></category>";
	
    /**
     * Forum class represents an entry from a Forums feed returned by the
     * Connections REST API.
     * 
     * @class Forum
     * @namespace sbt.connections
     */
    var Forum = declare(AtomEntity, {
    	
    	xpath : consts.ForumXPath,
    	contentType : "html",
    	categoryScheme : CategoryForum,
    	
        /**
         * Construct a Forum entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	if (!this.getCommunityUuid()) {
        		return "";
        	}
            var transformer = function(value,key) {
                return value;
            };
            var postData = stringUtil.transform(CommunityTmpl, this, transformer, this);
            return stringUtil.trim(postData);
        },

        /**
         * Return the value of id from Forum ATOM
         * entry document.
         * 
         * @method getForumUuid
         * @return {String} ID of the Forum
         */
        getForumUuid : function() {
            var uid = this.getAsString("forumUuid");
            return extractForumUuid(uid);
        },

        /**
         * Sets id of IBM Connections forum.
         * 
         * @method setForumUuid
         * @param {String} forumUuid Id of the forum
         */
        setForumUuid : function(forumUuid) {
            return this.setAsString("forumUuid", forumUuid);
        },

        /**
         * Return the value of communityUuid from Forum ATOM
         * entry document.
         * 
         * @method getCommunityUuid
         * @return {String} Uuid of the Community
         */
        getCommunityUuid : function() {
            return this.getAsString("communityUuid");
        },

        /**
         * Sets communityUuid of IBM Connections forum.
         * 
         * @method setCommunityUuid
         * @param {String} communityUuid Community Uuid of the forum
         */
        setCommunityUuid : function(communityUuid) {
            return this.setAsString("communityUuid", communityUuid);
        },

        /**
         * Return the moderation of the IBM Connections forum from
         * forum ATOM entry document.
         * 
         * @method getModeration
         * @return {String} Moderation of the forum
         */
        getModeration : function() {
            return this.getAsDate("moderation");
        },
        
        /**
         * Return the thread count of the IBM Connections forum from
         * forum ATOM entry document.
         * 
         * @method getThreadCount
         * @return {Number} Thread count of the forum
         */
        getThreadCount : function() {
            return this.getAsNumber("threadCount");
        },
        
        /**
         * Return the url of the IBM Connections forum from
         * forum ATOM entry document.
         * 
         * @method getForumUrl
         * @return {String} Url of the forum
         */
        getForumUrl : function() {
            return this.getAlternateUrl();
        },
                
        /**
         * Get a list for forum topics that includes the topics in the specified forum.
         * 
         * @method getTopics
         * @param {Object} args
         */
        getTopics : function(args) {
        	return this.service.getTopics(this.getForumUuid(), args);
        },

        /**
         * Return an array containing the tags for this forum.
         * 
         * @method getTags
         * @return {Array}
         */
        getTags : function() {
        	return this.getAsArray("tags");
        },
        
        /**
         * Return an array containing the tags for this forum.
         * 
         * @method setTags
         * @param {Array}
         */
        setTags : function(tags) {
        	return this.setAsArray("tags", tags);
        },
        
        /**
         * Loads the forum object with the atom entry associated with the
         * forum. By default, a network call is made to load the atom entry
         * document in the forum object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var forumUuid = this.getForumUuid();
            var promise = this.service._validateForumUuid(forumUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setData(data);
                    return self;
                }
            };

            var requestArgs = lang.mixin({
                forumUuid : forumUuid
            }, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            return this.service.getEntity(consts.AtomForum, options, forumUuid, callbacks);
        },

        /**
         * Remove this forum
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteForum(this.getForumUuid(), args);
        },

        /**
         * Update this forum
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateForum(this, args);
        },
        
        /**
         * Save this forum
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getForumUuid()) {
                return this.service.updateForum(this, args);
            } else {
                return this.service.createForum(this, args);
            }
        }        
       
    });
    
    /**
     * ForumTopic class represents an entry for a forums topic feed returned by the
     * Connections REST API.
     * 
     * @class ForumTopic
     * @namespace sbt.connections
     */
    var ForumTopic = declare(AtomEntity, {

    	xpath : consts.ForumTopicXPath,
    	contentType : "html",
    	categoryScheme : CategoryTopic,
    	
        /**
         * Construct a ForumTopic entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	var entryData = "";
        	if (this.isPinned()) {
        		entryData += stringUtil.transform(FlagTmpl, this, function(v,k) { return consts.FlagPinned; }, this);
        	}
        	if (this.isLocked()) {
        		entryData += stringUtil.transform(FlagTmpl, this, function(v,k) { return consts.FlagLocked; }, this);
        	}
        	if (this.isQuestion()) {
        		entryData += stringUtil.transform(FlagTmpl, this, function(v,k) { return consts.FlagQuestion; }, this);
        	}
            return stringUtil.trim(entryData);
        },

        /**
         * Return the value of id from Forum Topic ATOM
         * entry document.
         * 
         * @method getTopicUuid
         * @return {String} ID of the Forum Topic
         */
        getTopicUuid : function() {
            var uid = this.getAsString("topicUuid");
            return extractForumUuid(uid);
        },

        /**
         * Sets id of IBM Connections Forum Topic.
         * 
         * @method setTopicUuid
         * @param {String} topicUuid Id of the forum topic
         */
        setTopicUuid : function(topicUuid) {
            return this.setAsString("topicUuid", topicUuid);
        },
        
        getTopicTitle: function(){
        	return this.getAsString("topicTitle");
        },
        
        setTopicTitle: function(title){
        	return this.setAsString("topicTitle", title);
        },

        /**
         * Return the value of IBM Connections forum ID from forum ATOM
         * entry document.
         * 
         * @method getForumUuid
         * @return {String} Forum ID of the forum
         */
        getForumUuid : function() {
            var uid = this.getAsString("forumUuid");
            return extractForumUuid(uid);
        },

        /**
         * Sets id of IBM Connections forum.
         * 
         * @method setForumUuid
         * @param {String} forumUuid Id of the forum
         */
        setForumUuid : function(forumUuid) {
            return this.setAsString("forumUuid", forumUuid);
        },

        /**
         * Return the value of communityUuid from Forum ATOM
         * entry document.
         * 
         * @method getCommunityUuid
         * @return {String} Uuid of the Community
         */
        getCommunityUuid : function() {
            return this.getAsString("communityUuid");
        },

        /**
         * Sets communityUuid of IBM Connections forum.
         * 
         * @method setCommunityUuid
         * @param {String} communityUuid Community Uuid of the forum
         * @return {ForumTopic}
         */
        setCommunityUuid : function(communityUuid) {
            return this.setAsString("communityUuid", communityUuid);
        },

        /**
         * Return the url of the IBM Connections forum from
         * forum ATOM entry document.
         * 
         * @method getTopicUrl
         * @return {String} Url of the forum
         */
        getTopicUrl : function() {
            return this.getAsString("alternateUrl");
        },
                
        /**
         * Return the permissions of the IBM Connections forum topic from
         * forum ATOM entry document.
         * 
         * @method getPermisisons
         * @return {String} Permissions of the forum topic
         */
        getPermisisons : function() {
            return this.getAsString("permissions");
        },
                
        /**
         * True if you want the topic to be added to the top of the forum thread.
         * 
         * @method isPinned
         * @return {Boolean} 
         */
        isPinned : function() {
        	var terms = this.getAsArray("categoryTerm");
        	var pinned = consts.FlagPinned;
        	
        	if(lang.isArray(terms)){
        		for(var i=0;i<terms.length;i++){
            		if(terms[i].indexOf(pinned) != -1){
            			return true;
            		}
            	}
        	}else if(lang.isString(terms)){
        		if(terms.indexOf(pinned) != -1){
        			return true;
        		}
        	}else{
        		return false;
        	}
        },
        
        /**
         * Set to true if you want the topic to be added to the top of the forum thread.
         * 
         * @method setPinned
         * @param pinned
         * @return {ForumTopic} 
         */
        setPinned : function(pinned) {
        	var terms = this.getAsArray("categoryTerm");
        	if(pinned){
        		if(terms){
        			terms.push(consts.setPinned);
        		}else{
        			this.setAsArray("categoryTerm",consts.setPinned );
        		}
        		
        	}else{
        		if(terms){
        			var pinned = consts.FlagPinned;
	        		for(var i=0;i<terms.length;i++){
	        			if(terms[i].indexOf(pinned) !=-1){
	        				terms.splice(i,1);
	        			}
	        		}
	        		this.setAsArray("categoryTerm",terms);
        		}
        		
        	}
        	
        },
        
        /**
         * If true, indicates that the topic is locked. 
         * 
         * @method isLocked
         * @return {Boolean} 
         */
        isLocked : function() {
        	var terms = this.getAsArray("categoryTerm");
        	var locked = consts.FlagLocked;
        	
        	if(lang.isArray(terms)){
        		for(var i=0;i<terms.length;i++){
            		if(terms[i].indexOf(locked) !=-1){
            			return true;
            		}
            	}
        	}else if(lang.isString(terms)){
        		if(terms.indexOf(locked) !=-1){
        			return true;
        		}
        	}else{
        		return false;
        	}

        },
        
        /**
         * Set to true, indicates that the topic is locked. 
         * 
         * @method isLocked
         * @param located
         * @return {ForumTopic} 
         */
        setLocked : function(locked) {
        	var terms = this.getAsArray("categoryTerm");
        	if(locked){
        		if(terms){
        			terms.push(consts.setLocked);
        		}else{
        			this.setAsArray("categoryTerm",consts.setLocked);
        		}
        		
        	}else{
        		if(terms){
        			var locked = consts.FlagLocked;
	        		for(var i=0;i<terms.length;i++){
	        			if(terms[i].indexOf(locked) !=-1){
	        				terms.splice(i,1);
	        			}
	        		}
	        		this.setAsArray("categoryTerm",terms);
        		}
        		
        	}
        },
        
        /**
         * If true, indicates that the topic is a question. 
         * 
         * @method isQuestion
         * @return {Boolean} 
         */
        isQuestion : function() {
        	var terms = this.getAsArray("categoryTerm");
        	var question = consts.FlagQuestion;
        	
        	if(lang.isArray(terms)){
        		for(var i=0;i<terms.length;i++){
            		if(terms[i].indexOf(question) != -1){
            			return true;
            		}
            	}
        	}else if(lang.isString(terms)){
        		if(terms.indexOf(question) != -1){
        			return true;
        		}
        	}else{
        		return false;
        	}
        },
        
        /**
         * Set to true, indicates that the topic is a question. 
         * 
         * @method setQuestion
         * @param question
         * @return {Boolean} 
         */
        setQuestion : function(question) {
        	var terms = this.getAsArray("categoryTerm");
        	if(question){
        		if(terms){
        			terms.push(consts.markAsQuestion);
        		}else{
        			this.setAsArray("categoryTerm",consts.markAsQuestion);
        		}
        		
        	}else{
        		var questionFlag = consts.FlagQuestion;
        		if(terms){
	        		for(var i=0;i<terms.length;i++){
	        			if(terms[i].indexOf(questionFlag) !=-1){
	        				terms.splice(i,1);
	        			}
	        		}
        		
        			this.setAsArray("categoryTerm",terms);
        		}
        		
        	}
        },
        
        /**
         * If true, indicates that the topic is a question that has been answered.
         * 
         * @method isAnswered
         * @return {Boolean} 
         */
        isAnswered : function() {
        	return this.getAsBoolean("answered");
        },
        
        /**
         * If true, this forum topic has not been recommended by the current user.
         * 
         * @method isNotRecommendedByCurrentUser
         * @returns {Boolean}
         */
        isNotRecommendedByCurrentUser : function() {
        	return this.getAsBoolean("notRecommendedByCurrentUser");
        },
        
        /**
         * Return an array containing the tags for this forum topic.
         * 
         * @method getTags
         * @return {Array}
         */
        getTags : function() {
        	return this.getAsArray("tags");
        },
        
        /**
         * Return an array containing the tags for this forum topic.
         * 
         * @method setTags
         * @param {Array}
         */
        setTags : function(tags) {
        	return this.setAsArray("tags", tags);
        },
        
        /**
         * Return the recommendations url of the forum topic.
         * 
         * @method getRecommendationsUrl
         * @return {String} Recommendations url
         */
        getRecommendationsUrl : function() {
            return this.getAsString("recommendationsUrl");
        },

        /**
         * Get a list for forum recommendations that includes the recommendations for this forum topic.
         * 
         * @method getRecommendations
         */
        getRecommendations : function(args) {
        	return this.service.getForumRecommendations(this.getTopicUuid(), args);
        },
        
        /**
         * Get a list for forum replies that includes the replies for this forum topic.
         * 
         * @method getReplies
         */
        getReplies : function(args) {
        	return this.service.getForumTopicReplies(this.getTopicUuid(), args);
        },
        
        /**
         * To like this topic in a stand-alone forum, create forum recommendation to the forum topic resources.
         * 
         * @method deleteRecommendation
         * @param args
         */
        createRecommendation : function(args) {
            return this.service.createForumRecommendation(this.getTopicUuid(), args);
        },
        
        /**
         * Delete a recommendation of this topic in the forum.
         * Only the user who have already recommended the post can delete it's own recommendation.
         * 
         * @method deleteRecommendation
         * @param args
         */
        deleteRecommendation : function(args) {
            return this.service.deleteForumRecommendation(this.getTopicUuid(), args);
        },
        
        /**
         * Loads the forum topic object with the atom entry associated with the
         * forum topic. By default, a network call is made to load the atom entry
         * document in the forum topic object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var topicUuid = this.getTopicUuid();
            var promise = this.service._validateTopicUuid(topicUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setData(data);
                    return self;
                }
            };

            var requestArgs = lang.mixin({
                topicUuid : topicUuid
            }, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            return this.service.getEntity(consts.AtomTopic, options, topicUuid, callbacks);
        },

        /**
         * Remove this forum topic
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteForumTopic(this.getTopicUuid(), args);
        },

        /**
         * Update this forum topic
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateForumTopic(this, args);
        },
        
        /**
         * Save this forum topic
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getTopicUuid()) {
                return this.service.updateForumTopic(this, args);
            } else {
                return this.service.createForumTopic(this, args);
            }
        }        
               
    });
    
    /**
     * ForumReply class represents an entry for a forums reply feed returned by the
     * Connections REST API.
     * 
     * @class ForumReply
     * @namespace sbt.connections
     */
    var ForumReply = declare(AtomEntity, {

    	xpath : consts.ForumReplyXPath,
    	contentType : "html",
    	categoryScheme : CategoryReply,
    	
        /**
         * Construct a ForumReply entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return extra entry data to be included in post data for this entity.
         * 
         * @returns {String}
         */
        createEntryData : function() {
        	if (!this.getTopicUuid()) {
        		return "";
        	}
        	var entryData = "";
        	if (this.isAnswer()) {
        		entryData += stringUtil.transform(FlagTmpl, this, function(v,k) { return consts.FlagAnswer; }, this);
        	}
        	entryData += stringUtil.transform(ReplyTmpl, this, function(v,k) { return v; }, this);
            return stringUtil.trim(entryData);
        },

        /**
         * Return the value of id from Forum Reply ATOM
         * entry document.
         * 
         * @method getReplyUuid
         * @return {String} ID of the Forum Reply
         */
        getReplyUuid : function() {
            var uid = this.getAsString("replyUuid");
            return extractForumUuid(uid);
        },

        /**
         * Sets id of IBM Connections Forum Reply.
         * 
         * @method setReplyUuid
         * @param {String} replyUuid Id of the forum reply
         */
        setReplyUuid : function(replyUuid) {
            return this.setAsString("replyUuid", replyUuid);
        },

        /**
         * Return the value of IBM Connections topic ID from forum ATOM
         * entry document.
         * 
         * @method getTopicUuid
         * @return {String} ID of the forum reply
         */
        getTopicUuid : function() {
            var uid = this.getAsString("topicUuid");
            return extractForumUuid(uid);
        },

        /**
         * Sets id of IBM Connections forum reply.
         * 
         * @method setTopicUuid
         * @param {String} topicUuid Id of the forum topic
         */
        setTopicUuid : function(topicUuid) {
            return this.setAsString("topicUuid", topicUuid);
        },
        
        /**
         * Return the value of id of the post that this is a repy to.
         * 
         * @method getReplyToPostUuid
         * @returns {String} postUuid Id of the forum post
         */
        getReplyToPostUuid : function() {
        	var uid = this.getAsString("replyTo");
        	return extractForumUuid(uid);
        },

        /**
         * Sets the value of id of the post that this is a repy to.
         * 
         * @method setReplyToPostUuid
         * @param {String} postUuid Id of the forum post
         */
        setReplyToPostUuid : function(postUuid) {
        	return this.setAsString("replyTo", postUuid);
        },

        /**
         * Return the url of the IBM Connections Forum Reply reply from
         * forum ATOM entry document.
         * 
         * @method getReplyUrl
         * @return {String} Url of the forum
         */
        getReplyUrl : function() {
            return this.getAlternateUrl();
        },
                
        /**
         * Return the permissions of the IBM Connections Forum Reply from
         * forum ATOM entry document.
         * 
         * @method getPermisisons
         * @return {String} Permissions of the Forum Reply
         */
        getPermisisons : function() {
            return this.getAsString("permissions");
        },
        
        /**
         * If true, indicates that the reply is an accepted answer.
         * 
         * @method isAnswered
         * @return {Boolean} 
         */
        isAnswer : function() {
        	return this.getAsBoolean("answer");
        },
        
        /**
         * Set to true, indicates that the reply is an accepted answer. 
         * 
         * @method setAnswer
         * @param answer
         * @return {Boolean} 
         */
        setAnswer : function(answer) {
        	return this.setAsBoolean("answer", answer);
        },
        
        /**
         * If true, this forum reply has not been recommended by the current user.
         * 
         * @method isNotRecommendedByCurrentUser
         * @returns {Boolean}
         */
        isNotRecommendedByCurrentUser : function() {
        	return this.getAsBoolean("notRecommendedByCurrentUser");
        },
        
        /**
         * Return the recommendations url of the forum reply.
         * 
         * @method getRecommendationsUrl
         * @return {String} Recommendations url
         */
        getRecommendationsUrl : function() {
            return this.getAsString("recommendationsUrl");
        },

        /**
         * Get a list for forum recommendations that includes the recommendations for this forum reply.
         * 
         * @method getRecommendations
         */
        getRecommendations : function(args) {
        	return this.service.getForumRecommendations(this.getReplyUuid(), args);
        },
        
        /**
         * Get a list for forum replies that includes the replies for this forum reply.
         * 
         * @method getReplies
         */
        getReplies : function(args) {
        	return this.service.getForumReplyReplies(this.getReplyUuid(), args);
        },
        
        /**
         * To like this reply in a stand-alone forum, create forum recommendation to the forum reply resources.
         * 
         * @method deleteRecommendation
         * @param args
         */
        createRecommendation : function(args) {
            return this.service.createForumRecommendation(this.getReplyUuid(), args);
        },
        
        /**
         * Delete a recommendation of this reply in the forum.
         * Only the user who have already recommended the post can delete it's own recommendation.
         * 
         * @method deleteRecommendation
         * @param args
         */
        deleteRecommendation : function(args) {
            return this.service.deleteForumRecommendation(this.getReplyUuid(), args);
        },
        
        /**
         * Loads the forum reply object with the atom entry associated with the
         * forum reply. By default, a network call is made to load the atom entry
         * document in the forum reply object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var replyUuid = this.getReplyUuid();
            var promise = this.service._validateReplyUuid(replyUuid);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setData(data);
                    return self;
                }
            };

            var requestArgs = lang.mixin({
                replyUuid : replyUuid
            }, args || {});
            var options = {
                handleAs : "text",
                query : requestArgs
            };
            
            return this.service.getEntity(consts.AtomReply, options, replyUuid, callbacks);
        },

        /**
         * Remove this forum reply
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteForumReply(this.getReplyUuid(), args);
        },

        /**
         * Update this forum reply
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateForumReply(this, args);
        },
        
        /**
         * Save this forum reply
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getReplyUuid()) {
                return this.service.updateForumReply(this, args);
            } else {
                return this.service.createForumReply(this, args);
            }
        }        
               
    });
    
    /**
     * ForumMember class represents an entry for a forums member feed returned by the
     * Connections REST API.
     * 
     * @class ForumMember
     * @namespace sbt.connections
     */
    var ForumMember = declare(AtomEntity, {

    	categoryScheme : null,
    	
        /**
         * Construct a Forum Tag entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        }
    
    });
    
    /**
     * ForumRecommendation class represents an entry for a forums recommendation feed returned by the
     * Connections REST API.
     * 
     * @class ForumTag
     * @namespace sbt.connections
     */
    var ForumRecommendation = declare(AtomEntity, {

    	xpath : consts.ForumRecommendationXPath,
    	contentType : "text",
    	categoryScheme : CategoryRecommendation,
    	
        /**
         * Construct a Forum Tag entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
    
        /**
         * Return the value of title from ATOM entry document.
         * 
         * @method getTitle
         * @return {String} ATOM entry title
         */
        getTitle : function() {
            return this.getAsString("title") || "liked";
        },

	    /**
	     * Return the value of IBM Connections recommendation ID from recommendation ATOM
	     * entry document.
	     * 
	     * @method getRecommendationUuid
	     * @return {String} ID of the recommendation topic
	     */
	    getRecommendationUuid : function() {
	        var uid = this.getAsString("id");
            return extractForumUuid(uid);
	    },

        /**
         * Return the value of IBM Connections post ID from recommendation ATOM
         * entry document.
         * 
         * @method getPostUuid
         * @return {String} ID of the forum post
         */
        getPostUuid : function() {
        	var postUuid = this.getAsString("postUuid");
            return this.service.getUrlParameter(postUuid, "postUuid") || postUuid;
        },
        
        /**
         * Set the value of IBM Connections post ID from recommendation ATOM
         * entry document.
         * 
         * @method setPostUuid
         * @return {String} ID of the forum post
         */
        setPostUuid : function(postUuid) {
            return this.setAsString("postUuid", postUuid);
        }        

    });
    
    /**
     * ForumTag class represents an entry for a forums tag feed returned by the
     * Connections REST API.
     * 
     * @class ForumTag
     * @namespace sbt.connections
     */
    var ForumTag = declare(AtomEntity, {

    	categoryScheme : null,
    	
        /**
         * Construct a Forum Tag entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        }
    
    });
    
    /*
     * Method used to extract the forum uuid for an id string.
     */
    var extractForumUuid = function(uid) {
        if (uid && uid.indexOf("urn:lsid:ibm.com:forum:") == 0) {
            return uid.substring("urn:lsid:ibm.com:forum:".length);
        } else {
            return uid;
        }
    }; 
    
    /*
     * Callbacks used when reading a feed that contains forum entries.
     */
    var ForumFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ForumsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Forum({
                service : service,
                data : data
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains forum topic entries.
     */
    var ForumTopicFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ForumsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new ForumTopic({
                service : service,
                data : data
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains forum topic reply entries.
     */
    var ForumReplyFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ForumsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new ForumReply({
                service : service,
                data : data
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains forum recommendation entries.
     */
    var ForumRecommendationFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service : service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.ForumsFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new ForumRecommendation({
                service : service,
                data : data
            });
        }
    };

    
    /**
     * ForumsService class.
     * 
     * @class ForumsService
     * @namespace sbt.connections
     */
    var ForumService = declare(ConnectionsService, {

        contextRootMap: {
            forums: "forums"
        },
        
        serviceName : "forums",
        
        /**
         * Constructor for ForumsService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Create a Forum object with the specified data.
         * 
         * @method newForum
         * @param {Object} args Object containing the fields for the 
         * new Forum 
         */
        newForum : function(args) {
            return this._toForum(args);
        },
        
        /**
         * Create a ForumTopic object with the specified data.
         * 
         * @method newForumTopic
         * @param {Object} args Object containing the fields for the 
         * new ForumTopic
         */
        newForumTopic : function(args) {
            return this._toForumTopic(args);
        },
        
        /**
         * Create a ForumReply object with the specified data.
         * 
         * @method newForumReply
         * @param {Object} args Object containing the fields for the 
         * new ForumReply 
         */
        newForumReply : function(args) {
            return this._toForumReply(args);
        },
        
        /**
         * Get a feed that includes forums created by the authenticated user or associated with communities to which the user belongs.
         * 
         * @method getMyForums
         * @param args
         */
        getMyForums: function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomForumsMy, options, ForumFeedCallbacks);
        },      
        
        /**
         * Get a feed that includes the topics that the authenticated user created in stand-alone forums and in forums associated 
         * with communities to which the user belongs.
         * 
         * @method getMyTopics
         * @param requestArgs
         */
        getMyTopics: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.AtomTopicsMy, options, ForumTopicFeedCallbacks);
        },      
        
        /**
         * Get a feed that includes all stand-alone and forum forums created in the enterprise.
         * 
         * @method getAllForums
         * @param requestArgs
         */
        getAllForums: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.AtomForums, options, ForumFeedCallbacks);
        },      
        
        /**
         * Get a feed that includes all stand-alone and forum forums created in the enterprise.
         * 
         * @method getPublicForums
         * @param args
         */
        getPublicForums: function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomForumsPublic, options, ForumFeedCallbacks);
        },
        
        /**
         * Get a list for forum topics that includes the topics in the specified forum.
         * 
         * @method getForumTopics
         * @param forumUuid
         * @param args
         * @returns
         */
        getForumTopics: function(forumUuid, args) {
            var promise = this._validateForumUuid(forumUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({ forumUuid : forumUuid }, args || {});
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomTopics, options, ForumTopicFeedCallbacks);
        },
        
        /**
         * Get a list for forum topics that includes the topics in the specified community.
         * 
         * @method getCommunityForumTopics
         * @param forumUuid
         * @param args
         * @returns
         */
        getCommunityForumTopics: function(communityUuid, args) {
            var promise = this._validateCommunityUuid(communityUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({ communityUuid : communityUuid }, args || {});
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomTopics, options, ForumTopicFeedCallbacks);
        },
        
        /**
         * Get a list for forum recommendations that includes the recommendations in the specified post.
         * 
         * @method getForumRecommendations
         * @param postUuid
         * @param args
         * @returns
         */
        getForumRecommendations: function(postUuid, args) {
            var promise = this._validatePostUuid(postUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({ postUuid : postUuid }, args || {});
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomRecommendationEntries, options, ForumRecommendationFeedCallbacks);
        },
        
        /**
         * Get a list for forum replies that includes the replies in the specified topic.
         * 
         * @method getForumTopicReplies
         * @param topicUuid
         * @param args
         * @returns
         */
        getForumTopicReplies: function(topicUuid, args) {
            var promise = this._validateTopicUuid(topicUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({ topicUuid : topicUuid }, args || {});
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomReplies, options, ForumReplyFeedCallbacks);
        },
        
        /**
         * Get a list for forum replies that includes the replies in the specified reply.
         * 
         * @method getForumReplyReplies
         * @param replyUuid
         * @param args
         * @returns
         */
        getForumReplyReplies: function(replyUuid, args) {
            var promise = this._validateReplyUuid(replyUuid);
            if (promise) {
                return promise;
            }
            
            var requestArgs = lang.mixin({ replyUuid : replyUuid }, args || {});
            
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs
            };
            
            return this.getEntities(consts.AtomReplies, options, ForumReplyFeedCallbacks);
        },
        
        /**
         * Get a list for forum replies that includes the replies in the specified post.
         * The post uuid must be specified in the args as either:
         *     { topicUuid : "<topicUuid>" } or { replyUuid : "<replyUuid>" } 
         * 
         * @method getForumReplies
         * @param topicUuid
         * @param args
         * @returns
         */
        getForumReplies: function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args
            };
            
            return this.getEntities(consts.AtomReplies, options, ForumReplyFeedCallbacks);
        },
        
        /**
         * Retrieve a list of all forum entries, add communityUuid to the requestArgs object to get the forums related to a specific community.
         * 
         * @method getForums
         * @param {Object} requestArgs Object containing the query arguments to be 
         * sent (defined in IBM Connections Communities REST API) 
         */
        getForums : function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
                
            return this.getEntities(consts.AtomForums, options, ForumFeedCallbacks);
        },

        /**
         * Retrieve a forum entry, use the edit link for the forum entry 
         * which can be found in the my communities feed.
         * 
         * @method getForum
         * @param {String } forumUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Communities REST API) 
         */
        getForum : function(forumUuid, args) {
            var forum = new Forum({
                service : this,
                _fields : { forumUuid : forumUuid }
            });
            return forum.load(args);
        },
        
        /**
         * Create a forum by sending an Atom entry document containing the 
         * new forum to the My Forums resource.
         * 
         * @method createForum
         * @param {Object} forum Forum object which denotes the forum to be created.
         * @param {Object} [args] Argument object
         */
        createForum : function(forumOrJson,args) {
            var forum = this._toForum(forumOrJson);
            var promise = this._validateForum(forum, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                forum.setData(data);
                var forumUuid = this.getLocationParameter(response, "forumUuid");
                forum.setForumUuid(forumUuid);
                return forum;
            };

            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : forum.createPostData()
            };
            
            return this.updateEntity(consts.AtomForumsMy, options, callbacks, args);
        },

        /**
         * Update a forum by sending a replacement forum entry document in Atom format 
         * to the existing forum's edit web address.
         * All existing forum entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a forum entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateForum
         * @param {Object} forum Forum object
         * @param {Object} [args] Argument object
         */
        updateForum : function(forumOrJson,args) {
            var forum = this._toForum(forumOrJson);
            var promise = this._validateForum(forum, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	// preserve the forumUuid
            	var forumUuid = forum.getForumUuid();
                forum.setData(data);
                forum.setForumUuid(forumUuid);
                return forum;
            };

            var requestArgs = lang.mixin({
                forumUuid : forum.getForumUuid()
            }, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : forum.createPostData()
            };
            
            return this.updateEntity(consts.AtomForum, options, callbacks, args);
        },

        /**
         * Delete a forum, use the HTTP DELETE method.
         * Only the owner of a forum can delete it. Deleted communities cannot be restored
         * 
         * @method deleteForum
         * @param {String/Object} forum id of the forum or the forum object (of the forum to be deleted)
         * @param {Object} [args] Argument object
         */
        deleteForum : function(forumUuid,args) {
            var promise = this._validateForumUuid(forumUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
                forumUuid : forumUuid
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomForum, options, forumUuid);
        },
        
        /**
         * Retrieve a forum topic entry, use the edit link for the forum topic entry 
         * which can be found in the My Forums feed.
         * 
         * @method getForumTopic
         * @param {String } topicUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Communities REST API) 
         */
        getForumTopic : function(topicUuid, args) {
            var forumTopic = new ForumTopic({
                service : this,
                _fields : { topicUuid : topicUuid }
            });
            return forumTopic.load(args);
        },

        /**
         * Create a forum topc by sending an Atom entry document containing the 
         * new forum to the forum replies resource.
         * 
         * @method createForumTopic
         * @param {Object} forumTopic Forum topic object which denotes the forum topic to be created.
         * @param {Object} [args] Argument object
         */
        createForumTopic : function(topicOrJson,args) {
            var forumTopic = this._toForumTopic(topicOrJson);
            var promise = this._validateForumTopic(forumTopic, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                var topicUuid = this.getLocationParameter(response, "topicUuid");
                forumTopic.setTopicUuid(topicUuid);
                forumTopic.setData(data);
                return forumTopic;
            };

            var requestArgs = lang.mixin({
                forumUuid : forumTopic.getForumUuid()
            }, args || {});
            
            var options = {
                method : "POST",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : forumTopic.createPostData()
            };
            
            return this.updateEntity(consts.AtomTopics, options, callbacks, args);
        },

        /**
         * Update a forum topic by sending a replacement forum entry document in Atom format 
         * to the existing forum topic's edit web address.
         * All existing forum entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a forum entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateForumTopic
         * @param {Object} topicOrJson Forum topic object
         * @param {Object} [args] Argument object
         */
        updateForumTopic : function(topicOrJson,args) {
            var forumTopic = this._toForumTopic(topicOrJson);
            var promise = this._validateForumTopic(forumTopic, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	// preserve the topicUuid
            	var topicUuid = forumTopic.getTopicUuid();
            	forumTopic.setData(data);
            	forumTopic.setTopicUuid(topicUuid);
                return forumTopic;
            };

            var requestArgs = lang.mixin({
                topicUuid : forumTopic.getTopicUuid()
            }, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : forumTopic.createPostData()
            };
            
            return this.updateEntity(consts.AtomTopic, options, callbacks, args);
        },

        /**
         * Delete a forum topic, use the HTTP DELETE method.
         * Only the owner of a forum topic can delete it. Deleted forum topics cannot be restored
         * 
         * @method deleteForumTopic
         * @param {String/Object} id of the forum topic to be deleted
         * @param {Object} [args] Argument object
         */
        deleteForumTopic : function(topicUuid,args) {
            var promise = this._validateTopicUuid(topicUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
                topicUuid : topicUuid
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomTopic, options, topicUuid);
        },
        
        /**
         * Retrieve a forum reply entry, use the edit link for the forum reply entry 
         * which can be found in the my communities feed.
         * 
         * @method getForumReply
         * @param {String } replyUuid
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Communities REST API) 
         */
        getForumReply : function(replyUuid, args) {
            var forumReply = new ForumReply({
                service : this,
                _fields : { replyUuid : replyUuid }
            });
            return forumReply.load(args);
        },

        /**
         * Create a forum reply by sending an Atom entry document containing the 
         * new forum reply to the My Communities resource.
         * 
         * @method createForumReply
         * @param {Object} reply ForumReply object which denotes the forum to be created.
         * @param {Object} [args] Argument object
         */
        createForumReply : function(replyOrJson,args) {
            var forumReply = this._toForumReply(replyOrJson);
            var promise = this._validateForumReply(forumReply, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                var replyUuid = this.getLocationParameter(response, "replyUuid");
                forumReply.setReplyUuid(replyUuid);
                forumReply.setData(data);
                return forumReply;
            };

            var options = {
                method : "POST",
                query : args || { topicUuid : forumReply.getTopicUuid() },
                headers : consts.AtomXmlHeaders,
                data : forumReply.createPostData()
            };
            
            return this.updateEntity(consts.AtomReplies, options, callbacks, args);
        },

        /**
         * Update a forum by sending a replacement forum entry document in Atom format 
         * to the existing forum's edit web address.
         * All existing forum entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a forum entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateForumReply
         * @param {Object} replyOrJson Forum reply object
         * @param {Object} [args] Argument object
         */
        updateForumReply : function(replyOrJson,args) {
            var forumReply = this._toForumReply(replyOrJson);
            var promise = this._validateForumReply(forumReply, true, args);
            if (promise) {
                return promise;
            }
            
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	// preserve the replyUuid
            	var replyUuid = forumReply.getReplyUuid();
            	forumReply.setData(data);
            	forumReply.setReplyUuid(replyUuid);
                return forumReply;
            };

            var requestArgs = lang.mixin({
            	replyUuid : forumReply.getReplyUuid()
            }, args || {});
            
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : forumReply.createPostData()
            };
            
            return this.updateEntity(consts.AtomReply, options, callbacks, args);
        },

        /**
         * Delete a forum reply, use the HTTP DELETE method.
         * Only the owner of a forum reply can delete it. Deleted forum replies cannot be restored
         * 
         * @method deleteForumReply
         * @param {String/Object} Id of the forum reply to be deleted
         * @param {Object} [args] Argument object
         */
        deleteForumReply : function(replyUuid,args) {
            var promise = this._validateReplyUuid(replyUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
            	replyUuid : replyUuid
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomReply, options, replyUuid);
        },

        /**
         * Retrieve complete information about recommendations to a post(topic/reply) in a stand-alone forum.
         * 
         * @method getForumRecommendation
         * @param postUuid
         * @param args
         */
        getForumRecommendation : function(postUuid, args) {
            var forumRecommendation = new ForumRecommendation({
                service : this,
                _fields : { postUuid : postUuid }
            });
            return forumRecommendation.load(args);
        },
        
        /**
         * To like a post(topic/reply) in a stand-alone forum, create forum recommendation to the forum topic/reply resources.
         * 
         * @method createForumRecommendation
         * @param recommendationOrJson
         * @param args
         */
        createForumRecommendation : function(recommendationOrJson, args) {
            var forumRecommendation = this._toForumRecommendation(recommendationOrJson);
            var promise = this._validateForumRecommendation(forumRecommendation, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
                forumRecommendation.setData(data);
                return forumRecommendation;
            };

            var options = {
                method : "POST",
                query : args || { postUuid : forumRecommendation.getPostUuid() },
                headers : consts.AtomXmlHeaders,
                data : forumRecommendation.createPostData()
            };
            
            return this.updateEntity(consts.AtomRecommendationEntries, options, callbacks, args);
        },
        
        /**
         * Delete a recommendation of a post(topic or reply) in a forum.
         * Only the user who have already recommended the post can delete it's own recommendation.
         * 
         * @method deleteForumRecommendation
         * @param postUuid
         * @param args
         */
        deleteForumRecommendation : function(postUuid, args) {
            var promise = this._validatePostUuid(postUuid);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
            	postUuid : postUuid
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomRecommendationEntries, options, postUuid);
        },

        //
        // Internals
        //
        
        /*
         * Validate a forum and return a Promise if invalid.
         */
        _validateForum : function(forum,checkUuid) {
            if (!forum || !forum.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, forum with title must be specified.");
            }
            if (checkUuid && !forum.getForumUuid()) {
                return this.createBadRequestPromise("Invalid argument, forum with UUID must be specified.");
            }
        },
        
        /*
         * Validate a forum topic and return a Promise if invalid.
         */
        _validateForumTopic : function(forumTopic,checkUuid) {
            if (!forumTopic || !forumTopic.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, forum topic with title must be specified.");
            }
            if (checkUuid && !forumTopic.getTopicUuid()) {
                return this.createBadRequestPromise("Invalid argument, forum topic with UUID must be specified.");
            }
        },
        
        /*
         * Validate a forum reply and return a Promise if invalid.
         */
        _validateForumReply : function(forumReply,checkUuid) {
            if (!forumReply || !forumReply.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, forum reply with title must be specified.");
            }
            if (checkUuid && !forumReply.getReplyUuid()) {
                return this.createBadRequestPromise("Invalid argument, forum reply with UUID must be specified.");
            }
        },
        
        /*
         * Validate a forum recommendation and return a Promise if invalid.
         */
        _validateForumRecommendation : function(forumRecommendation,checkUuid) {
            if (!forumRecommendation || !forumRecommendation.getPostUuid()) {
                return this.createBadRequestPromise("Invalid argument, forum recommendation with postUuid must be specified.");
            }
            if (checkUuid && !forumRecommendation.getRecommendationUuid()) {
                return this.createBadRequestPromise("Invalid argument, forum recommendation with UUID must be specified.");
            }
        },
        
        /*
         * Validate a forum UUID, and return a Promise if invalid.
         */
        _validateForumUuid : function(forumUuid) {
            if (!forumUuid || forumUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected forumUuid.");
            }
        },
        
        /*
         * Validate a community UUID, and return a Promise if invalid.
         */
        _validateCommunityUuid : function(communityUuid) {
            if (!communityUuid || communityUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected communityUuid.");
            }
        },
        
        /*
         * Validate a post UUID, and return a Promise if invalid.
         */
        _validatePostUuid : function(postUuid) {
            if (!postUuid || postUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected postUuid.");
            }
        },
        
        /*
         * Validate a topic UUID, and return a Promise if invalid.
         */
        _validateTopicUuid : function(topicUuid) {
            if (!topicUuid || topicUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected topicUuid.");
            }
        },
        
        /*
         * Validate a reply UUID, and return a Promise if invalid.
         */
        _validateReplyUuid : function(replyUuid) {
            if (!replyUuid || replyUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected replyUuid.");
            }
        },
        
        /*
         * Return a Forum instance from Forum or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toForum : function(forumOrJsonOrString) {
            if (forumOrJsonOrString instanceof Forum) {
                return forumOrJsonOrString;
            } else {
                if (lang.isString(forumOrJsonOrString)) {
                    forumOrJsonOrString = {
                        forumUuid : forumOrJsonOrString
                    };
                }
                return new Forum({
                    service : this,
                    _fields : lang.mixin({}, forumOrJsonOrString)
                });
            }
        },

        /*
         * Return a ForumTopic instance from Forum or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toForumTopic : function(topicOrJsonOrString) {
            if (topicOrJsonOrString instanceof ForumTopic) {
                return topicOrJsonOrString;
            } else {
                if (lang.isString(topicOrJsonOrString)) {
                    topicOrJsonOrString = {
                        forumTopicUuid : topicOrJsonOrString
                    };
                }
                return new ForumTopic({
                    service : this,
                    _fields : lang.mixin({}, topicOrJsonOrString)
                });
            }
        },

        /*
         * Return a Forum instance from ForumReply or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toForumReply : function(replyOrJsonOrString) {
            if (replyOrJsonOrString instanceof ForumReply) {
                return replyOrJsonOrString;
            } else {
                if (lang.isString(replyOrJsonOrString)) {
                	replyOrJsonOrString = {
                        forumReplyUuid : replyOrJsonOrString
                    };
                }
                return new ForumReply({
                    service : this,
                    _fields : lang.mixin({}, replyOrJsonOrString)
                });
            }
        },
        
        /*
         * Return a ForumRecommendation instance from ForumRecommendation, ForumTopic, 
         * ForumReply or JSON or String. Throws an error if the argument was neither.
         */
        _toForumRecommendation : function(entityOrJsonOrString) {
            if (entityOrJsonOrString instanceof ForumRecommendation) {
                return entityOrJsonOrString;
            } else {
                if (lang.isString(entityOrJsonOrString)) {
                	entityOrJsonOrString = {
                        postUuid : entityOrJsonOrString
                    };
                }
                if (entityOrJsonOrString instanceof ForumTopic) {
                	entityOrJsonOrString = {
                        postUuid : entityOrJsonOrString.getTopicUuid()
                    };
                }
                if (entityOrJsonOrString instanceof ForumReply) {
                	entityOrJsonOrString = {
                        postUuid : entityOrJsonOrString.getReplyUuid()
                    };
                }
                return new ForumRecommendation({
                    service : this,
                    _fields : lang.mixin({}, entityOrJsonOrString)
                });
            }
        }
        
    });
    return ForumService;
});

},
'sbt/connections/nls/CommunityService':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for CommunityService
 */
define({
  root: ({
	  invalid_argument : "Invalid Argument"
  })
});
},
'sbt/nls/messageSSO':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */ 

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  message_title: "ReAuthenticate",
	  message:"Authentication expired, Please login again.",
	  relogin_button_text: "Re-Login"
  })
});
},
'sbt/connections/BlogConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for BlogService.
 * 
 * @module sbt.connections.BlogConstants
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({}, conn, {
    	
    	/**
         * XPath expressions used when parsing a Connections Blogs ATOM feed
         * 
         * @property BlogFeedXPath
         * @type Object
         * @for sbt.connections.BlogService
         */
        BlogFeedXPath : conn.ConnectionsFeedXPath,
        
        RecommendersFeedXpath : {
            entries : "/a:feed/a:entry",
            totalResults : "/a:feed/os:totalResults"
        },
        
        /**
         * Namespaces to be used when reading the Blogs ATOM entry or feed
         */
        BlogNamespaces : {
			a : "http://www.w3.org/2005/Atom",
			app : "http://www.w3.org/2007/app",
			snx : "http://www.ibm.com/xmlns/prod/sn"
		},
        
        /**
         * XPath expressions to be used when reading a Blog
         * 
         * @property BlogXPath
         * @type Object
         * @for sbt.connections.BlogService
         */
        BlogXPath : lang.mixin({}, conn.AtomEntryXPath, {
            blogUuid : "a:id",
            handle : "snx:handle",
            timezone : "snx:timezone",
            rank : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']",
            categoryupdates : "a:category[@term='updates']",
            categoryfaq : "a:category[@term='faq']",
            categorywith : "a:category[@term='with']",
            categoryshared : "a:category[@term='shared']",
            communityUuid : "snx:communityUuid",
            containerUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container']/@href",
            containerType : "snx:containertype",
            categoryFlags : "a:link[@scheme='http://www.ibm.com/xmlns/prod/sn/flags']/@term",
            summary : "a:summary[@type='html']"
        }),
        
        /**
         * XPath expressions to be used when reading a Blog Post
         * 
         * @property BlogPostXPath
         * @type Object
         * @for sbt.connections.BlogService
         */
        BlogPostXPath : lang.mixin({}, conn.AtomEntryXPath, {
            postUuid : "a:id",
            replies : "a:link[@rel='replies']/@href",
            recommendationsUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/recommendations']/@href",
            rankRecommendations : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']",
            rankComment : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment']",
            rankHit : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/hit']",
            repliesUrl : "a:link[@rel='replies']/@href",
            sourceId : "a:source/a:id",
            sourceTitle  : "a:source/a:title ",
            sourceLink : "a:source/a:link[@rel='self']/@href",
            sourceLinkAlternate : "a:source/a:link[@rel='alternate']/@href",
            sourceUpdated : "a:source/a:updated",
            sourceCategory : "a:source/a:link[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
            blogHandle : "blogHandle",
            summary : "a:summary[@type='html']"
        }),
        
        /**
         * XPath expressions to be used when reading a Blog Post Comment
         * 
         * @property CommentXPath
         * @type Object
         * @for sbt.connections.BlogService
         */
        CommentXPath : lang.mixin({}, conn.AtomEntryXPath, {
            commentUuid : "a:id",
            commentUrl : "a:link[@rel='self']/@href",
            recommendationsUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/recommendations']/@href",
            trackbacktitle : "snx:trackbacktitle",
            replyTo : "thr:in-reply-to/@ref",
            replyToSource : "thr:in-reply-to/@source",
            rankRecommendations : "snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']",
            sourceId : "a:source/a:id",
            sourceTitle  : "a:source/a:title ",
            sourceLink : "a:source/a:link[@rel='self']/@href",
            sourceLinkAlternate : "a:source/a:link[@rel='alternate']/@href",
            blogHandle : "blogHandle",
            blogPostUuid : "blogPostUuid"
        }),
        
        /**
         * XPath expressions to be used when reading a Blog Post Recommenders feed
         * 
         * @property RecommendersXPath
         * @type Object
         * @for sbt.connections.BlogService
         */
        RecommendersXPath : lang.mixin({}, conn.AtomEntryXPath, {
            recommenderUuid : "a:id",
            category : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term"            
        }),

        /**
         * page  Page number. Specifies the page to be returned. The default value is 1, which returns the first page. 
         * ps  Page size. Specify the number of entries to return per page.
         * search  Well-formed full text search query. Performs a text search on community titles and descriptions.
         * since  Includes in the resulting feed all communities updated after a specified date. Specify the date using a date-time value that conforms to RFC3339. Use an upper case "T" to separate the date and time, and an uppercase "Z" in the absence of a numeric time zone offset. For example: 2009-01-04T20:32:31.171Z.
         * sortBy  Specifies what value to use as the basis for organizing the entries returned in the feed. The options are:
         *                                          modified � Sorts the results by last modified date.
         *                                          commented - Sorts the entries by the number of comments or replies an item has received.
         *                                          popularity - Sorts the entries by how popular the item is.
         *                                          recommended - Sorts the entries by the number of times the item was recommended.
		 *									        title - Sorts the entries alphabetically by title. The title used is the text that is displayed in the <title> element of each entry in the feed.
         * sortOrder  Specifies the order in which to sort the results. The options are:
         *                                          asc - Sorts the results in ascending order.
		 *                                          desc - Sorts the results in descending order.
		 * communityUuid  Returns community blog and community ideation blog in the specified community.
         * ps  Page size. Specify the number of entries to return per page.
         * blogType  Returns only specific Blogs type:
		 *											blog - regular blogs and community blogs
		 *	    									communityblog - community blogs only
		 *  										communityideationblog - community ideation blogs only
         * tags  Returns blog entries with the specified tags. Separate multiple tags with a plus sign (+).
         */
        
        /**
         * A feed of all blogs.
         *  
         * Get the Blogs feed to see a list of all blogs
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since, communityUuid, blogType, sortField, tag
         * 
         * @property AtomBlogsAll
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsAll : "/${blogs}/{blogHomepageHandle}/feed/blogs/atom",
        
        /**
         * A feed of my blogs.
         *  
         * Get the Blogs feed to see a list of Blogs created by logged in user
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since, communityUuid, blogType, sortField, tag
         * 
         * @property AtomBlogsMy
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsMy : "/${blogs}/{blogHomepageHandle}/api/blogs",
        
        /**
         * A blog instance.
         * 
         * @property AtomBlogInstance
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogInstance : "/${blogs}/{blogHomepageHandle}/api/blogs/{blogUuid}",
        
        /**
         * A blog post entry.
         * 
         * @property AtomBlogPostInstance
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogPostInstance : "/${blogs}/{blogHomepageHandle}/api/entries/{postUuid}",
        
        /**
         * A feed of all blogs posts.
         *  
         * Get the Blogs posts feed to see a list of posts from all Blogs
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomEntriesAll
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomEntriesAll : "/${blogs}/{blogHomepageHandle}/feed/entries/atom",
        
        /**
         * A feed of a blog's posts.
         *  
         * Get the Blog posts feed to see a list of posts from a Blog
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogEntries
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogEntries : "/${blogs}/{blogHandle}/feed/entries/atom",
        	
        /**
         * A feed of a blog's comments.
         *  
         * Get the Blog Comments feed to see a list of comments from a blog post
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogComments
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogComments : "/${blogs}/{blogHandle}/feed/comments/atom",

        /**
         * A feed of a blog's comments.
         *  
         * Get the Blog Comments feed to see a list of comments from all blog post
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogCommentsAll
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogCommentsAll : "/${blogs}/{blogHomepageHandle}/feed/comments/atom",
        
        /**
         * A feed of featured blogs.
         *  
         * Get the featured blogs feed to find the blogs that have had the most activity across
         * all of the blogs hosted by the Blogs application in the past two weeks. 
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogsFeatured
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsFeatured : "/${blogs}/{blogHomepageHandle}/feed/featuredblogs/atom",
        	
        /**
         * A feed of featured blogs posts.
         *  
         * Get the featured posts feed to find the blog posts that have had the most activity across 
         * all of the blogs hosted by the Blogs application within the past two weeks
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogsPostsFeatured
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsPostsFeatured : "/${blogs}/{blogHomepageHandle}/feed/featured/atom",
        
        /**
         * A feed of featured blogs posts.
         *  
         * Get a feed that includes all of the recommended blog posts 
         * in all of the blogs hosted by the Blogs application. 
         * 
         * Supports: page, ps, sortBy, sortOrder, search, since
         * 
         * @property AtomBlogsPostsRecommended
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsPostsRecommended : "/${blogs}/{blogHomepageHandle}/feed/recommended/atom",
        
        /**
         * A feed of blogs tags.
         *  
         * Get a feed that includes all of the tags 
         * in all of the blogs hosted by the Blogs application. 
         * 
         * @property AtomBlogsTags
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogsTags : "/${blogs}/{blogHomepageHandle}/feed/tags/atom",

        /**
         * A feed of blog tags.
         *  
         * Get a feed that includes all of the tags 
         * in a perticular Blog. 
         * 
         * @property AtomBlogTags
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogTags : "/${blogs}/{blogHandle}/feed/tags/atom",
        
        /**
         * Create a Blog. 
         * 
         * @property AtomBlogCreate
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogCreate : "/${blogs}/{blogHomepageHandle}/api/blogs",
        
        /**
         * Edit or remove a Blog. 
         * 
         * @property AtomBlogEditDelete
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogEditDelete : "/${blogs}/{blogHomepageHandle}/api/blogs/{blogUuid}",
        /**
         * Create, Edit or remove a Blog Post. 
         * 
         * @property AtomBlogPostCreate
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogPostCreate : "/${blogs}/{blogHandle}/api/entries",
        
        /**
         * Edit or remove a Blog Post. 
         * 
         * @property AtomBlogPostEditDelete
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogPostEditDelete : "/${blogs}/{blogHandle}/api/entries/{postUuid}",
        /**
         * Create, Edit or remove a Blog Comment. 
         * 
         * @property AtomBlogCommentCreate
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogCommentCreate : "/${blogs}/{blogHandle}/api/entrycomments/{postUuid}",
        
        /**
         * Edit or remove a Blog Comment. 
         * 
         * @property AtomBlogCommentEditRemove
         * @type String
         * @for sbt.connections.BlogService
         */        
        AtomBlogCommentEditRemove : "/${blogs}/{blogHandle}/api/comments/{commentUuid}",
        
        /**
         * Recommend or Unrecommend a Blog Post. 
         * 
         * @property AtomRecommendBlogPost
         * @type String
         * @for sbt.connections.BlogService
         */ 
        AtomRecommendBlogPost : "/${blogs}/{blogHandle}/api/recommend/entries/{postUuid}",
        
        /**
         * Get list of voted Ideas by user. 
         * 
         * @property AtomVotedIdeas
         * @type String
         * @for sbt.connections.IdeationBlogService
         */ 
        AtomVotedIdeas : "/${blogs}/{blogHomepageHandle}/feed/myvotes/atom",
        
        /**
         * Get list of comments to the specified blog entry.
         * 
         * @property AtomBlogEntryComments
         * @type String
         * @for sbt.connections.BlogService
         */
        AtomBlogEntryComments : "/${blogs}/{blogHandle}/feed/entrycomments/{entryAnchor}/atom"
    });
});
},
'sbt/connections/ConnectionsConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for IBM Connections.
 * 
 * @module sbt.connections.ConnectionsConstants
 */
define([ "../lang", "../base/BaseConstants" ], function(lang, base) {

    return lang.mixin(base, {

        /**
         * Error code used for a bad request
         */
        BadRequest : 400,

        /**
		 * XPath expressions used when parsing a Connections ATOM feed
		 */
        ConnectionsFeedXPath : {
            // used by getEntitiesDataArray
            entries : "/a:feed/a:entry",
            // used by getSummary
            totalResults : "/a:feed/opensearch:totalResults",
            startIndex : "/a:feed/opensearch:startIndex",
            itemsPerPage : "/a:feed/opensearch:itemsPerPage"
        },
        
        /**
		 * XPath expressions used when parsing a Connections service document ATOM feeds
		 */
        ConnectionsServiceDocsFeedXPath : {
            // used by getEntitiesDataArray
            entries : "/a:feed/a:entry",
            // used by getSummary
    		emailConfig : "/a:feed/a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/configuration']/@term",
    		language : "/a:feed/a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/language']/@term",       
    		languageLabels : "/a:feed/a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/language']/@label"
        },

        /**
         * AuthType variable values for endpoint
         * 
         * @property AuthTypes
         * @type Object
         */
        AuthTypes : {
        	OAuth : "oauth",
        	Basic : "basic"
        },
        
        /**
         * XPath expressions to be used when reading a Connections entity
         * 
         * @property TagsXPath
         * @type Object
         */
        TagsXPath : {
        	entries : "app:categories/a:category",
			term : "@term",
			frequency : "@snx:frequency",
			uid : "@term"
		},
		
		/**
         * XPath expressions to be used when reading a Blog
         * 
         * @property BlogXPath
         * @type Object
         */
        ServiceConfigXPath : lang.mixin({}, base.AtomEntryXPath, {
        	alternateSSLUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/alternate-ssl']/@href"
        }),
        
        /**
         * XPath expressions to be used when reading a Member Entry
         * 
         * @property MemberXPath
         * @type Object
         */
        MemberXPath : lang.mixin({}, base.AtomEntryXPath, {
            role : "snx:role"
        }),
        
        /**
         * XPath expressions to be used when reading a Report Entry
         * 
         * @property MemberXPath
         * @type Object
         */
        ReportEntryXPath : lang.mixin({}, base.AtomEntryXPath, {
            categoryIssue : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/issue']/@term",
            reportItemLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/report-item']/@href",
            relatedLink : "a:link[@rel='related']/@href",
            inRefTo : "snx:in-ref-to[@rel='http://www.ibm.com/xmlns/prod/sn/report-item']/@ref"	
        }),
        
        /**
         * XPath expressions to be used when reading a Moderation Action Entry
         * 
         * @property MemberXPath
         * @type Object
         */
        ModerationActionEntryXPath : lang.mixin({}, base.AtomEntryXPath, {
            moderationAction : "snx:moderation/action",
            relatedLink : "a:link[@rel='related']/@href",
            inRefTo : "snx:in-ref-to[@rel='http://www.ibm.com/xmlns/prod/sn/report-item']/@ref"	
        }),

		/**
	     * Get service configs
	     */
	    ServiceConfigs : "/{service}/serviceconfigs"
	
	});
});
},
'sbt/authenticator/Basic':function(){
/*
 * ©  Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * Definition of an authentication mechanism.
 */
define(["../declare", "../lang", "../util", "../i18n!../nls/loginForm"],function(declare, lang, util, loginForm) {
/**
 * Proxy basic authentication.
 * 
 * This class triggers the authentication for a service.
 */
return declare(null, {
	loginUi:		"",
	loginPage:		"/sbt/authenticator/templates/login.html",
	dialogLoginPage:"authenticator/templates/loginDialog.html",
	url: "",
	actionUrl: "",
	
	/**
	 * Constructor, necessary so that this.url is not empty. 
	 * It may also mixin loginUi, loginPage or dialogLoginPage if they are present in sbt.properties.
	 */
	constructor: function(args){
	    lang.mixin(this, args || {});
	},
	
	/**
	 * Method that authenticate the current user . 
	 * 
	 * This is a working version. But this is work in progress with following todos
	 * 
	 * todos:
	 *  Internationalization
	 */
	authenticate: function(options) {
	    var self = this;
	    require(['sbt/config'], function(config){
	        var mode =  options.loginUi || config.Properties["loginUi"] || self.loginUi;
	        var loginPage = options.loginPage || config.Properties["loginPage"] || self.loginPage;
	        var dialogLoginPage = options.dialogLoginPage || config.Properties["dialogLoginPage"] || self.dialogLoginPage;
	        if(mode=="popup") {
	            self._authPopup(options, loginPage, config, self.url);
	        } else if(mode=="dialog") {
	            self._authDialog(options, dialogLoginPage, config);
	        } else {
	            self._authMainWindow(options, loginPage, self.url);
	        }
	    });

	    return true;
	},	
	
	_authDialog: function(options, dialogLoginPage, sbtConfig) {
		var self = this;
		require(["sbt/_bridge/ui/BasicAuth_Dialog", "sbt/dom"], function(dialog, dom) {
		    if(options.cancel){
	            sbtConfig.cancel = options.cancel;
	        }
		    
		    options.actionUrl = self._computeActionURL(options);
	        
			dialog.show(options, dialogLoginPage);
			dom.setText('wrongCredsMessage', loginForm.wrong_creds_message);
			dom.setText('basicLoginFormUsername', loginForm.username);
			dom.setText('basicLoginFormPassword', loginForm.password);
			dom.setAttr(dom.byId('basicLoginFormOK'), "value", loginForm.login_ok);
			dom.setAttr(dom.byId('basicLoginFormCancel'), "value", loginForm.login_cancel);
		});
		return true;
	},
	
	_authPopup: function(options, loginPage, sbtConfig, sbtUrl) {
        var actionURL = this._computeActionURL(options);
        var urlParamsMap = {
            actionURL: actionURL,
            redirectURL: 'empty',
            loginUi: 'popup',
            showWrongCredsMessage: 'false'
        };
        var urlParams = util.createQuery(urlParamsMap, "&");
        var url = sbtUrl+loginPage + '?' + urlParams;
                                         
        var windowParamsMap = {
            width: window.screen.availWidth / 2,
            height: window.screen.availHeight / 2,
            left: window.screen.availWidth / 4,
            top: window.screen.availHeight / 4,
            menubar: 0,
            toolbar: 0,
            status: 0,
            location: 0,
            scrollbars: 1,
            resizable: 1
        };
        var windowParams = util.createQuery(windowParamsMap, ",");
        var loginWindow = window.open(url,'Authentication', windowParams);
        if(options.callback){
            sbtConfig.callback = options.callback;
            loginWindow.callback = options.callback;
        }
        if(options.cancel){
            sbtConfig.cancel = options.cancel;
            loginWindow.cancel = options.cancel;
        }
        globalLoginFormStrings = loginForm;
        globalEndpointAlias = options.name;
        loginWindow.focus();
        
        return true;
	},
	
	_authMainWindow: function(options, loginPage, sbtUrl) {
		var actionURL = this._computeActionURL(options);
		var urlParamsMap = {
            actionURL: actionURL,
            redirectURL: document.URL,
            loginUi: 'mainWindow',
            showWrongCredsMessage: 'false',
		      	username: loginForm.username,
		    	password: loginForm.password,
		    	login_ok: loginForm.login_ok,
		    	login_cancel: loginForm.login_cancel,
		    	wrong_creds_message: loginForm.wrong_creds_message
        };
		
        var urlParams = util.createQuery(urlParamsMap, "&");
		var url = sbtUrl+loginPage + '?' + urlParams;
		window.location.href = url;
		
		return true;
	},
	
	_computeActionURL: function(options) {
		if (!this.actionUrl) {
			var proxy = options.proxy.proxyUrl;
			return proxy.substring(0,proxy.lastIndexOf("/"))+"/basicAuth/"+options.proxyPath+"/JSApp";
		}
		return this.actionUrl;
	}
	
}
);
});

},
'sbt/connections/BookmarkConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for BookmarkService.
 * 
 * @module sbt.connections.BookmarkConstants
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({}, conn, {
    	
    	BookmarkFeedXPath : conn.ConnectionsFeedXPath,
    	
        /**
         * XPath expressions
         * 
         * @property BookmarkXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        BookmarkXPath : lang.mixin({}, conn.AtomEntryXPath, {
            BookmarkUuid: "a:id",
            privateFlag: "a:category[@term='private' and @scheme='http://www.ibm.com/xmlns/prod/sn/flags']",
            categoryType: "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
            link: "a:link[not(@rel)]/@href",
            linkSame: "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/same']/@href",
            url: "a:link[1]/@href",
            authorId:"a:author/snx:userid",
            authorName: "a:author/a:name",
            authorEmail: "a:author/a:email",
            authorUri: "a:author/a:uri",
            tags : "a:category[not(@scheme)]/@term",
            clickcount: "snx:clickcount"
        }),
        
        /**
         * Namespaces to be used when reading the Bookmarks ATOM entry or feed
         */
        BookmarkNamespaces : {
			a : "http://www.w3.org/2005/Atom",
			snx : "http://www.ibm.com/xmlns/prod/sn"
		},

        /**
         * A feed of all bookmarks.
         *  
         * @property AtomBookmarkssAll
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarksAll : "/${dogear}/atom",

        /**
         * A feed of popular bookmarks.
         *  
         * @property AtomBookmarkssAll
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarksPopular : "/${dogear}/atom/popular",

        /**
         * A feed of bookmarks that others notified me about.
         *  
         * @property AtomBookmarkssAll
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarksMyNotifications : "/${dogear}/atom/mynotifications",

        /**
         * A feed of bookmarks about which I notified others.
         *  
         * @property AtomBookmarkssAll
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarksINotifiedMySentNotifications : "/${dogear}/atom/mysentnotifications",

        /**
         * A feed of all bookmark tags.
         *  
         * @property AtomBookmarksTags
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarksTags : "/${dogear}/tags",

        /**
         * create delete or update a bookmark.
         *  
         * @property AtomBookmarkCreateUpdateDelete
         * @type String
         * @for sbt.connections.BoomarkService
         */
        AtomBookmarkCreateUpdateDelete : "/${dogear}/api/app"

    });
});
},
'sbt/log':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Logging Utilities
 * @module sbt.log
 */
define(['./stringUtil'], function(stringUtil) {

	var loggingEnabled = function isLoggingEnabled(){
		return sbt.Properties["js.logging.enabled"] ? sbt.Properties["js.logging.enabled"].toLowerCase() == "true" : true;
	};

	var Level = {
		DEBUG : 1,
		INFO : 2,
		WARN : 3,
		ERROR : 4
	};
	
	var loggingLevel = function getLoggingLevel(){
		 return Level[sbt.Properties["js.logging.level"] ? sbt.Properties["js.logging.level"] : "DEBUG"];
	};

	return {
		/**
		 * Sets the logging level.
		 * @param {String} [l ]logging level. Possible values are DEBUG, INFO, WARN, ERROR
		 * @static
		 * @method setLevel
		 */
		setLevel : function(l) {
			loggingLevel = Level[l];
		},
		/**
		 * Enables/disables logging.
		 * @param {Boolean} [enabled] logging enabled true or false
		 * @static
		 * @method setEnabled
		 */
		setEnabled : function(enabled) {
			loggingEnabled = enabled;
		},
		/**
		 * log a debug statement.
		 * @static
		 * @method debug
		 */
		debug : function() {
			if (!loggingEnabled) {
				return;
			}
			if (loggingLevel > 1) {
				return;
			}
			if (console && arguments.length > 0) {
				var args = Array.prototype.slice.call(arguments);
				var text = args[0];
				args = args.slice(1);
				var formattedText = stringUtil.substitute(text, args);
				if (console.debug) {
					console.debug(formattedText);
				} else {
					console.log("DEBUG : " + formattedText);
				}
			}
		},
		/**
		 * log an info statement.
		 * @static
		 * @method info
		 */
		info : function() {
			if (!loggingEnabled) {
				return;
			}
			if (loggingLevel > 2) {
				return;
			}
			if (console && arguments.length > 0) {
				var args = Array.prototype.slice.call(arguments);
				var text = args[0];
				args = args.slice(1);
				var formattedText = stringUtil.substitute(text, args);
				if (console.info) {
					console.info(formattedText);
				} else {
					console.log("INFO : " + formattedText);
				}
			}
		},
		/**
		 * log a warning statement.
		 * @static
		 * @method warn
		 */
		warn : function() {
			if (!loggingEnabled) {
				return;
			}
			if (loggingLevel > 3) {
				return;
			}
			if (console && arguments.length > 0) {
				var args = Array.prototype.slice.call(arguments);
				var text = args[0];
				args = args.slice(1);
				var formattedText = stringUtil.substitute(text, args);
				if (console.warn) {
					console.warn(formattedText);
				} else {
					console.log("WARN : " + formattedText);
				}
			}
		},
		/**
		 * log an error statement.
		 * @static
		 * @method error
		 */
		error : function() {
			if (!loggingEnabled) {
				return;
			}
			if (console && arguments.length > 0) {
				var args = Array.prototype.slice.call(arguments);
				var text = args[0];
				args = args.slice(1);
				var formattedText = stringUtil.substitute(text, args);
				if (console.error) {
					console.error(formattedText);
				} else {
					console.log("ERROR : " + formattedText);
				}
			}
		},
		/**
		 * log an exception
		 * @static
		 * @method error
		 */
		exception : function() {
			if (!loggingEnabled) {
				return;
			}
			if (console && arguments.length > 0) {
				var args = Array.prototype.slice.call(arguments);
				var text = args[0];				
				args = args.slice(1);
				var formattedText = stringUtil.substitute(text, args);
				if (console.error) {
					console.error("EXCEPTION : " + formattedText);
				} else {
					console.log("EXCEPTION : " + formattedText);
				}
			}
		}
	};
});
},
'sbt/connections/SearchService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Use the Search API to perform searches across the installed Connections applications.
 * 
 * Returns a list of results with the specified text in the title, description, or content. Encode the strings. By default, spaces are treated as an AND operator. The following operators are supported:
 *
 *  AND or &&: Searches for items that contain both words. For example: query=red%20AND%20test returns items that contain both the word red and the word test. AND is the default operator.
 *  NOT or !: Excludes the word that follows the operator from the search. For example: query=test%20NOT%20red returns items that contain the word test, but not the word red.
 *  OR: Searches for items that contain either of the words. For example: query=test%20OR%20red
 *  To search for a phrase, enclose the phrase in quotation marks (" ").
 *  +: The plus sign indicates that the word must be present in the result. For example: query=+test%20red returns only items that contain the word test and many that also contain red, but none that contain only the word red.
 *  ?: Use a question mark to match individual characters. For example: query=te%3Ft returns items that contain the words test, text, tent, and others that begin with te.
 *  -: The dash prohibits the return of a given word. This operator is similar to NOT. For example: query=test%20-red returns items that contains the word test, but not the word red.
 *
 * Note: Wildcard searches are permitted, but wildcard only searches (*) are not.
 * For more details about supported operators, see Advanced search options in the Using section of the product documentation.
 * 
 * @module sbt.connections.SearchService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "../json", "./SearchConstants", 
         "./ConnectionsService", "../base/BaseEntity", "../base/AtomEntity", "../base/XmlDataHandler" ], 
    function(declare,config,lang,stringUtil,Promise,json,consts,ConnectionsService,BaseEntity,AtomEntity,XmlDataHandler) {

    /**
     * Scope class represents an entry for a scopes feed returned by the
     * Connections REST API.
     * 
     * @class Scope
     * @namespace sbt.connections
     */
    var Scope = declare(AtomEntity, {

        /**
         * Construct a Scope entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the scope search link.
         * 
         * @method getLink
         * @return {String} Scope link
         */
        getLink : function() {
        	return this.getAsString("link");
        }

    });
    
    /**
     * Result class represents an entry for a search feed returned by the
     * Connections REST API.
     * 
     * @class Result
     * @namespace sbt.connections
     */
    var Result = declare(AtomEntity, {

        /**
         * Construct a Scope entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
        
        /**
         * Return the primary component for a particular search 
         * result with respect to the search query.
         * 
         * @method getPrimaryComponent
         * @return {String} Primary component
         */
        getPrimaryComponent : function() {
            return this.getAsString("primaryComponent");
        },

        /**
         * Indicates a relative assessment of relevance for a particular search 
         * result with respect to the search query.
         * 
         * @method getRelevance
         * @return {String} Relative assessment of relevance
         */
        getRelevance : function() {
            return this.getAsNumber("relevance");
        }

    });
    
    /**
     * FacetValue class represents an entry for a search facet returned by the
     * Connections REST API.
     * 
     * @class FacetValue
     * @namespace sbt.connections
     */
    var FacetValue = declare(BaseEntity, {

        /**
         * Construct an FacetValue.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        	// create XML data handler
        	this.dataHandler = new XmlDataHandler({
                service : args.service,
                data : args.data,
                namespaces : lang.mixin(consts.Namespaces, args.namespaces || {}),
                xpath : lang.mixin(consts.FacetValueXPath, args.xpath || this.xpath || {})
            });
        	this.id = this.getAsString("uid");
        },
        
        /**
         * Return the value of id from facet entry.
         * 
         * @method getId
         * @return {String} ID of the facet entry
         */
        getId : function() {
            var id = this.getAsString("id");
            var parts = id.split("/");
            return (parts.length == 1) ? parts[0] : parts[1];
        },

        /**
         * Return the value of label from facet entry.
         * 
         * @method getLabel
         * @return {String} Facet entry label
         */
        getLabel : function() {
            return this.getAsString("label");
        },

        /**
         * Return the value of weigth from facet entry.
         * 
         * @method getWeight
         * @return {Number} Facet entry weight
         */
        getWeight : function() {
            return this.getAsNumber("weight");
        }

    });
    
    /*
     * Callbacks used when reading a feed that contains scope entries.
     */
    var ScopeFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                namespaces : consts.Namespaces,
                xpath : consts.SearchFeedXPath,
                service : service,
                data : data
            });
        },
        createEntity : function(service,data,response) {
            return new Scope({
            	namespaces : consts.Namespaces,
                service : service,
                data : data
            });
        }
    };

    /*
     * Callbacks used when reading a feed that contains search entries.
     */
    var ResultFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                namespaces : consts.Namespaces,
                xpath : consts.SearchFeedXPath,
                service : service,
                data : data
            });
        },
        createEntity : function(service,data,response) {
            return new Result({
            	namespaces : consts.Namespaces,
                xpath : consts.SearchXPath,
                service : service,
                data : data
            });
        }
    };
    
    /*
     * Callbacks used when reading a feed that contains search facets.
     */
    var FacetsCallbacks = {
        createEntities : function(service,data,response) {
        	var xpathExprs = lang.mixin({}, consts.SingleFacetXPath);
        	// facet param looks like this "{"id": "Person"}"
        	var facet = json.parse(response.options.query.facet);
        	xpathExprs.entries = xpathExprs.entries.replace("{facet.id}", facet.id);
            return new XmlDataHandler({
                namespaces : consts.Namespaces,
                xpath : xpathExprs,
                service : service,
                data : data
            });
        },
        createEntity : function(service,data,response) {
            return new FacetValue({
            	namespaces : consts.Namespaces,
                xpath : consts.FacetValueXPath,
                service : service,
                data : data
            });
        }
    };
    
    /**
     * SearchService class.
     * 
     * @class SearchService
     * @namespace sbt.connections
     */
    var SearchService = declare(ConnectionsService, {
        
        contextRootMap: {
            search: "search"
        },
        
        serviceName : "search",

        /**
         * Constructor for SearchService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Returns the set of supported values that can be passed to the "scope" parameter of the Search API. 
         * Scopes relating to Connections applications that have not been installed will not be returned.
         * 
         * @method getScopes
         * @param requestArgs
         */
        getScopes: function(requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : requestArgs || {}
            };
            
            return this.getEntities(consts.AtomScopes, options, ScopeFeedCallbacks);
        },
        
        /**
         * Search Lotus Connection for public information.
         * 
         * @method getResults
         * @param query Text to search for
         * @param requestArgs
         */
        getResults: function(queryArg, requestArgs) {
        	requestArgs = this._stringifyRequestArgs(requestArgs);
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ query : queryArg } , requestArgs || {})
            };
            
            return this.getEntities(consts.AtomSearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search Lotus Connections for both public information and 
         * private information that you have access to. You must provide 
         * authentication information in the request to retrieve this 
         * resource.
         * 
         * @method getMyResults
         * @param query Text to search for
         * @param requestArgs
         */
        getMyResults: function(queryArg, requestArgs) {
        	requestArgs = this._stringifyRequestArgs(requestArgs);
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ query : queryArg } , requestArgs || {})
            };
            
            return this.getEntities(consts.AtomMySearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search Lotus Connection for public information.
         * 
         * @method getResultsWithConstraint
         * @param query Text to search for
         * @param constraint Constraint(s) to be used while searching
         * @param requestArgs
         */
        getResultsWithConstraint: function(queryArg, constraint, requestArgs) {
        	requestArgs = this._stringifyRequestArgs(requestArgs);
        	
        	var query = {
        		query : queryArg,
        		constraint : json.stringify(constraint)
        	};
        	
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin(query, requestArgs || {})
            };
            
            return this.getEntities(consts.AtomSearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search Lotus Connections for both public information and 
         * private information that you have access to. You must provide 
         * authentication information in the request to retrieve this 
         * resource.
         * 
         * @method getMyResultsWithConstraint
         * @param query Text to search for
         * @param constraint Constraint(s) to be used while searching
         * @param requestArgs
         */
        getMyResultsWithConstraint: function(queryArg, constraint, requestArgs) {
        	requestArgs = this._stringifyRequestArgs(requestArgs);
        	
        	var query = {
        		query : queryArg,
        		constraint : json.stringify(constraint)
        	};
        	
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin(query, requestArgs || {})
            };
            
            return this.getEntities(consts.AtomMySearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search IBM Connections for public information, tagged 
         * with the specified tags.
         * 
         * @method getTagged
         * @param tags tags to search for
         * @param requestArgs
         */
        getResultsByTag: function(tags, requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ 
                		constraint : this._createTagConstraint(tags)
                	} , 
                	requestArgs || {})
            };
                
            return this.getEntities(consts.AtomSearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search IBM Connections for both public information and private 
         * information that you have access to, tagged 
         * with the specified tags.
         * 
         * @method getMyResultsByTag
         * @param tags Tags to search for
         * @param requestArgs
         */
        getMyResultsByTag: function(tags, requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ 
            			constraint : this._createTagConstraint(tags)
                	} , 
                	requestArgs || {})
            };
                
            return this.getEntities(consts.AtomMySearch, options, ResultFeedCallbacks);
        },
        
        /**
         * Search IBM Connections Profiles for people using the specified 
         * query string and return public information.
         * 
         * @method getPeople
         * @param query Text to search for
         * @param requestArgs
         */
        getPeople: function(queryArg, requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ 
                		query : queryArg,
                		pageSize : "0",
                		facet : "{\"id\": \"Person\"}"
                	} , 
                	requestArgs || {})
            };
            
            return this.getEntities(consts.AtomSearch, options, FacetsCallbacks);
        },
        
        /**
         * Search IBM Connections Profiles for people using the specified 
         * query string and return public information.
         * 
         * @method getMyPeople
         * @param query Text to search for
         * @param requestArgs
         */
        getMyPeople: function(queryArg, requestArgs) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : lang.mixin({ 
                		query : queryArg,
                		pageSize : "0",
                		facet : "{\"id\": \"Person\"}"
                	} , 
                	requestArgs || {})
            };
                
            return this.getEntities(consts.AtomMySearch, options, FacetsCallbacks);
        },
        
        //
        // Internals
        //
        
        /*
         * 
         */
        _stringifyRequestArgs: function(requestArgs) {
            if (!requestArgs) {
                return null;
            }
            var _requestArgs = {};
            for(var name in requestArgs){
                var value = requestArgs[name];
                if (lang.isObject(value)) {
                	_requestArgs[name] = json.stringify(value);
                } else {
                	_requestArgs[name] = value;
                }
            }
            return _requestArgs;
        },
        
        /*
         * Create a contraint JSON string for the specified tags
         */
        _createTagConstraint: function(tags) {
        	var jsonObj = { "type" : "category", "values" : new Array() };
        	if (lang.isArray(tags)) {
        		for (var i=0;i<tags.length;i++) {
        			jsonObj.values[i] = "Tag/" + tags[i];
        		}
        	} else {
        		jsonObj.values[0] = "Tag/" + tags;
        	}
        	return json.stringify(jsonObj);
        }
    });
    return SearchService;
});

},
'sbt/util':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * @module sbt.util
 */
define(['./lang','sbt/i18n!sbt/nls/util','./log','./stringUtil','./pathUtil'],function(lang, nls, log, stringUtil, pathUtil) {
	var errorCode = 400;	
	function _notifyError(error, args){	
		if (args && (args.error || args.handle)) {
			if (args.error) {
				try {
					args.error(error);
				} catch (error1) {
					log.error(nls.notifyError_catchError, error1);
				}
			}
			if (args.handle) {
				try {
					args.handle(error);
				} catch (error2) {
					log.error(nls.notifyError_catchError, error2);
				}
			}
		} else {
			log.error(nls.notifyError_console, error.code, error.message);
		}
	}	
	return {
		notifyError: _notifyError,	
		isEmptyObject: function(obj){
            var isEmpty = true;
            for( var key in obj ){
                if(obj.hasOwnProperty(key)){
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        },
		checkObjectClass: function(object, className, message, args){
			if(object.declaredClass != className){
				if(args){
					_notifyError({code:errorCode,message:message},args);
				}else{
					log(message);
				}
				return false;
			}else{
				return true;
			}
		},
		checkNullValue: function(object, message, args){
			if(!object){
				if(args){
					_notifyError({code:errorCode,message:message},args);
				}else{
					log(message);
				}
				return false;
			}else{
				return true;
			}
		},
		minVersion: function(required, used) {
		    var reqParts = required.split('.');
		    var usedParts = used.split('.');
		    
		    for (var i = 0; i < reqParts.length; ++i) {
		        if (usedParts.length == i) {
		            return false;
		        }
		        
		        if (reqParts[i] == usedParts[i]) {
		            continue;
		        }
		        else if (reqParts[i] > usedParts[i]) {
		            return false;
		        }
		        else {
		            return true;
		        }
		    }
		    
		    if (reqParts.length != usedParts.length) {
		        return true;
		    }
		    
		    return true;
		},
        getAllResponseHeaders: function(xhr) {
            var headers = {};
            try {
                var headersStr = xhr.getAllResponseHeaders();
                if (headersStr) {
                    var headersStrs = headersStr.split('\n');
                    for (var i=0; i<headersStrs.length; i++) {
                        var index = headersStrs[i].indexOf(':');
                        var key = lang.trim(headersStrs[i].substring(0, index));
                        var value = lang.trim(headersStrs[i].substring(index+1));
                        if (key.length > 0) {
                            headers[key] = value;
                        }
                    }
                }
            } catch(ex) {
                console.log(ex);
            }
            return headers;
        },
        
        /**
         * Takes an object mapping query names to values, and formats them into a query string separated by the delimiter.
         * e.g.
         * createQuery({height: 100, width: 200}, ",")
         * 
         * returns "height=100,width=200"
         * 
         * @method createQuery
         * 
         * @param {Object} queryMap An object mapping query names to values, e.g. {height:100,width:200...}
         * @param {String} delimiter The string to delimit the queries
         */
		createQuery: function(queryMap, delimiter){
	        if(!queryMap){
	            return null;
	        }
	        var delim = delimiter;
	        if(!delim){
	            delim = ",";
	        }
	        var pairs = [];
	        for(var name in queryMap){
	            var value = queryMap[name];
	            pairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
	        }
	        return pairs.join(delim);
	    },
	    
	    /**
         * Takes a query string and returns an equivalent object mapping.
         * e.g.
         * splitQuery("height=100,width=200", ",")
         * 
         * returns {height: 100, width: 200}
         * 
         * @method splitQuery
         * 
         * @param {String} query A query string, e.g. "height=100,width=200"
         * @param {String} delimiter The string which delimits the queries
         */
	    splitQuery: function(query, delimiter){
	        var i;
	        var result = {};
	        var part;
	        var parts;
	        var length;
	        
	        query = query.replace("?", "");
	        parts = query.split(delimiter);
	        length = parts.length;
	        
	        for (i = 0; i < length; i++) {
	            if(!parts[i]){
	                continue;
	            }
                part = parts[i].split('=');
                result[part[0]] = part[1];
            }
	        
	        return result;
	    },
	    
	    /**
	     * Returns the JavaScript Library and version used
	     * @returns {String} JavaScript Library with version
	     */
	    getJavaScriptLibrary : function(){
	    	var jsLib = "Unknown";
	    	if(window.dojo) {
	    		if(dojo.version) {
	    			jsLib = "Dojo "+dojo.version;
	    		}
	    	} else if(define && define.amd && define.amd.vendor && define.amd.vendor === "dojotoolkit.org") {
	    		require(["dojo/_base/kernel"], function(kernel){ 
	    			jsLib = "Dojo AMD "+kernel.version;
	    		});
	    	} else if(window.jQuery) {
	    		jsLib = "JQuery "+jQuery.fn.jquery;
	    	} 
	    	return jsLib;
	    },
	    
	    /**
	     * Return san absolute version of the specified url
	     * @param {String} URL to convert
	     * @returns {String} Absolute version of the url
	     */
	    makeAbsoluteUrl : function(url) {
	    	if (stringUtil.startsWith(url, "http")) {
	    		return url;
	    	}
	    	var loc = window.location;
	    	var baseUrl = loc.protocol+'//'+loc.hostname+(loc.port ? ':'+loc.port: '');
	    	return pathUtil.concat(baseUrl, url);
	    }
	};
});
},
'sbt/nls/loginForm':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  username:"User name :",
	  password:"Password :",
	  authentication_dialog_title: "Authentication",
	  login_ok: "Log in",
	  login_cancel: "Cancel",
	  wrong_creds_message:"Wrong Credentials"
  })
  
});
},
'sbt/connections/BookmarkService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * The Bookmarks API can be used to save, organize, and share Internet and intranet bookmarks. The Bookmarks API allows
 * application programs to read and write to the collections of bookmarks stored in the Bookmarks application..
 * 
 * @module sbt.connections.BookmarkService
 */
define([ "../declare", "../config", "../lang", "../stringUtil", "../Promise", "./BookmarkConstants", "./ConnectionsService",
         "../base/AtomEntity", "../base/XmlDataHandler",  "./Tag"], 
    function(declare,config,lang,stringUtil,Promise,consts,ConnectionsService,AtomEntity,XmlDataHandler, Tag) {
    
	var BookmarkTmpl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><title type=\"text\">${getTitle}</title><category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"bookmark\"/><link href='${getUrl}'/>${isPrivate}<content type=\"html\">${getContent}</content>${getTags}</entry>";
	var CategoryPrivateFlag = "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/flags\" term=\"private\" />"
	CategoryTmpl = "<category term=\"${tag}\"></category>";
	var CategoryBookmark = "<category term=\"bookmark\" scheme=\"http://www.ibm.com/xmlns/prod/sn/type\"></category>";
	
    /**
     * Bookmark class represents an entry for a Bookmarks feed returned by the
     * Connections REST API.
     * 
     * @class Bookmark
     * @namespace sbt.connections
     */
    var Bookmark = declare(AtomEntity, {

    	xpath : consts.BookmarkXPath,
    	namespaces : consts.BookmarkNamespaces,
        categoryScheme : CategoryBookmark,
        /**
         * Construct a Bookmark entity.
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },

        /**
         * Return the value of IBM Connections bookmark ID from bookmark ATOM
         * entry document.
         * 
         * @method getBookmarkUuid
         * @return {String} ID of the bookmark
         */
        getBookmarkUuid : function() {
        	return this.getAsString("BookmarkUuid");
        },

        /**
         * Sets id of IBM Connections bookmark.
         * 
         * @method setBookmarkUuid
         * @param {String} bookmarkUuid of the bookmark
         */
        setBookmarkUuid : function(BookmarkUuid) {
            return this.setAsString("BookmarkUuid", BookmarkUuid);
        },

        /**
         * Return the value of private flag
         * 
         * @method isPrivate
         * @return {String} accessibility flag of the bookmark 
         */
        isPrivate : function() {
            return this.getAsBoolean("privateFlag");
        },

        /**
         * Sets the value of private flag
         * 
         * @method setPrivate
         * @param {String} accessibility flag of the bookmark 
         */
        setPrivate : function(privateFlag) {
            return this.setAsBoolean("privateFlag", privateFlag);
        },

        /**
         * Return the value of IBM Connections bookmark URL from bookmark ATOM
         * entry document.
         * 
         * @method getUrl
         * @return {String} Bookmark URL of the bookmark
         */
        getUrl : function() {
            return this.getAsString("link");
        },

        /**
         * Sets title of IBM Connections bookmark.
         * 
         * @method setUrl
         * @param {String} title Title of the bookmark
         */
        setUrl : function(link) {
            return this.setAsString("link", link);
        },
        
        /**
         * Return the click count of the IBM Connections bookmark.
         * 
         * @method getClickCount
         * @return {String} click count of the bookmark
         */
        getClickCount : function() {
            return this.getAsString("clickcount");
        },
        
        /**
         * Return the category type of the IBM Connections bookmark.
         * 
         * @method getCategoryType
         * @return {String} content of the bookmark
         */
        getCategoryType : function() {
            return this.getAsString("categoryType");
        },
        
        /**
         * Return the edit link for IBM Connections bookmark.
         * 
         * @method getEditLink
         * @return {String} edit link of the bookmark
         */
        getEditLink : function() {
            return this.getAsString("linkEdit");
        },
        
        /**
         * Return the same link for IBM Connections bookmark.
         * 
         * @method getSameLink
         * @return {String} same link of the bookmark
         */
        getSameLink : function() {
            return this.getAsString("linkSame");
        },

        /**
         * Gets an author of IBM Connections Bookmark.
         * 
         * @method getAuthor
         * @return {Member} Author of the bookmark
         */
        getAuthor : function() {
            return this.getAsObject([ "authorId", "authorName", "authorEmail", "authorUri" ]);
        },

        /**
         * Return tags of IBM Connections bookmark
         * document.
         * 
         * @method getTags
         * @return {Object} Array of tags of the bookmark
         */
        getTags : function() {
            return this.getAsArray("tags");
        },

        /**
         * Set new tags to be associated with this IBM Connections bookmark.
         * 
         * @method setTags
         * @param {Object} Array of tags to be added to the bookmark
         */

        setTags : function(tags) {
            return this.setAsArray("tags", tags);
        },

        /**
         * Loads the bookmark object with the atom entry associated with the
         * bookmark. By default, a network call is made to load the atom entry
         * document in the bookmark object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         */
        load : function(args) {
            // detect a bad request by validating required arguments
            var bookmarkUrl = this.getUrl();
            var promise = this.service._validateBookmarkUrl(bookmarkUrl);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    self.setDataHandler(new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BookmarkXPath
                    }));
                    return self;
                }
            };
            var requestArgs = lang.mixin({
            	url : bookmarkUrl
            }, args || {});

            var options = {
                handleAs : "text",
                query : requestArgs
            };
            return this.service.getEntity(consts.AtomBookmarkCreateUpdateDelete, options, bookmarkUrl, callbacks);
        },

        /**
         * Remove this bookmark
         * 
         * @method remove
         * @param {Object} [args] Argument object
         */
        remove : function(args) {
            return this.service.deleteBookmark(this.getUrl(), args);
        },

        /**
         * Update this bookmark
         * 
         * @method update
         * @param {Object} [args] Argument object
         */
        update : function(args) {
            return this.service.updateBookmark(this, args);
        },
        
        /**
         * Save this bookmark
         * 
         * @method save
         * @param {Object} [args] Argument object
         */
        save : function(args) {
            if (this.getBookmarkUuid()) {
                return this.service.updateBookmark(this, args);
            } else {
                return this.service.createBookmark(this, args);
            }
        }

    });
    
    /*
     * Callbacks used when reading a feed that contains bookmark entries.
     */
    var ConnectionsBookmarkFeedCallbacks = {
        createEntities : function(service,data,response) {
            return new XmlDataHandler({
                service :  service,
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.BookmarkFeedXPath
            });
        },
        createEntity : function(service,data,response) {
            return new Bookmark({
                service : service,
                data : data
            });
       }
    };
    
    /*
     * Callbacks used when reading a feed that contains bookmark entries.
     */
    var ConnectionsTagsFeedCallbacks = {
		createEntities : function(service,data,response) {
            return new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.TagsXPath
            });
        },
        createEntity : function(service,data,response) {
            var entryHandler = new XmlDataHandler({
                data : data,
                namespaces : consts.Namespaces,
                xpath : consts.TagsXPath
            });
            return new Tag({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    /**
     * BookmarkService class.
     * 
     * @class BookmarkService
     * @namespace sbt.connections
     */
    var BookmarkService = declare(ConnectionsService, {
    	
    	contextRootMap: {
        	dogear : "dogear"
        },
        
        serviceName : "dogear",
    	
        /**
         * Constructor for BookmarkService
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
        },
        
        /**
         * Get the All Bookmarks feed to see a list of all bookmarks to which the 
         * authenticated user has access.
         * 
         * @method getAllBookmarks
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all bookmarks. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getAllBookmarks : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            return this.getEntities(consts.AtomBookmarksAll, options, this.getBookmarkFeedCallbacks());
        },
        
        /**
         * Get the popular Bookmarks feed.
         * 
         * @method getPopularBookmarks
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all bookmarks. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getPopularBookmarks : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomBookmarksPopular, options, this.getBookmarkFeedCallbacks());
        },
        
        /**
         * A feed of bookmarks that others notified me about.
         * 
         * @method getBookmarksMyNotifications
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all bookmarks. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getBookmarksMyNotifications : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomBookmarksMyNotifications, options, this.getBookmarkFeedCallbacks());
        },
        
        /**
         * A feed of bookmarks about which I notified others..
         * 
         * @method getBookmarksMySentNotifications
         * 
         * @param {Object} [args] Object representing various parameters
         * that can be passed to get a feed of all bookmarks. The
         * parameters must be exactly as they are supported by IBM
         * Connections like ps, sortBy etc.
         */
        getBookmarksMySentNotifications : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomBookmarksINotifiedMySentNotifications, options, this.getBookmarkFeedCallbacks());
        },
        
        /**
         * Retrieve a bookmark instance.
         * 
         * @method getBookmark
         * @param {String } bookmarkUrl
         * @param {Object} args Object containing the query arguments to be 
         * sent (defined in IBM Connections Bookmarks REST API) 
         */
        getBookmark : function(bookmarkUrl, args) {
            var bookmark = new Bookmark({
                service : this,
                _fields : { link : bookmarkUrl }
            });
            return bookmark.load(args);
        },

        /**
         * Create a bookmark by sending an Atom entry document containing the 
         * new bookmark.
         * 
         * @method createBookmark
         * @param {String} url Url to post to when creating the bookmark.
         * @param {String/Object} bookmarkOrJson Bookmark object which denotes the bookmark to be created.
         * @param {Object} [args] Argument object
         */
        createBookmark : function(bookmarkOrJson, args) {
            var bookmark = this._toBookmark(bookmarkOrJson);
            var promise = this._validateBookmark(bookmark, false, args);
            if (promise) {
                return promise;
            }

            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
        		if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BookmarkXPath
                    });
                	bookmark.setDataHandler(dataHandler);
                	bookmark.setData(data);
            	} else {
                	bookmark.setData(data);
            		var referenceId = this.getLocationParameter(response, "referenceId");
            		bookmark.setBookmarkUuid(referenceId);
            	}
                return bookmark;
            };

            var url = consts.AtomBookmarkCreateUpdateDelete;

            if (args && args.url) {
            	url = args.url;
            	delete args.url;
            }
            
            var options = {
                method : "POST",
                query : args || {},
                headers : consts.AtomXmlHeaders,
                data : this._constructBookmarkPostData(bookmark)
            };
            
            return this.updateEntity(url, options, callbacks, args);
        },

        /**
         * Update a bookmark by sending a replacement bookmark entry document 
         * to the existing bookmark's edit web address.
         * All existing bookmark entry information will be replaced with the new data. To avoid 
         * deleting all existing data, retrieve any data you want to retain first, and send it back 
         * with this request. For example, if you want to add a new tag to a bookmark entry, retrieve 
         * the existing tags, and send them all back with the new tag in the update request.
         * 
         * @method updateBookmark
         * @param {String/Object} bookmarkOrJson Bookmark object
         * @param {Object} [args] Argument object
         */
        updateBookmark : function(bookmarkOrJson,args) {
            var bookmark = this._toBookmark(bookmarkOrJson);
            var promise = this._validateBookmark(bookmark, true, args);
            if (promise) {
                return promise;
            }
            var callbacks = {};
            callbacks.createEntity = function(service,data,response) {
            	var bookmarkUuid = bookmark.getBookmarkUuid();
            	if (data) {
            		var dataHandler = new XmlDataHandler({
                        service :  service,
                        data : data,
                        namespaces : consts.Namespaces,
                        xpath : consts.BookmarkXPath
                    });
            		bookmark.setDataHandler(dataHandler);
            	}
            	bookmark.setBookmarkUuid(bookmarkUuid);
                return bookmark;
            };

            var requestArgs = lang.mixin({
            	url : bookmark.getUrl()
            }, args || {});
            var options = {
                method : "PUT",
                query : requestArgs,
                headers : consts.AtomXmlHeaders,
                data : this._constructBookmarkPostData(bookmark)
            };
            return this.updateEntity(consts.AtomBookmarkCreateUpdateDelete, options, callbacks, args);
        },

        /**
         * Delete a bookmark, use the HTTP DELETE method.
         * 
         * @method deleteBookmark
         * @param {String} bookmarkUuid bookmark id of the bookmark or the bookmark object (of the bookmark to be deleted)
         * @param {Object} [args] Argument object
         */
        deleteBookmark : function(bookmarkUrl,args) {
            var promise = this._validateBookmarkUrl(bookmarkUrl);
            if (promise) {
                return promise;
            }            
           
            var requestArgs = lang.mixin({
            	url : bookmarkUrl
            }, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AtomBookmarkCreateUpdateDelete, options, bookmarkUrl);
        },

        /**
         * Get the tags feed to see a list of the tags for all bookmarks.
         * 
         * @method getBookmarksTags
         * @param {Object} [args] Object representing various parameters. 
         * The parameters must be exactly as they are supported by IBM
         * Connections.
         */
        getBookmarksTags : function(args) {
            var options = {
                method : "GET",
                handleAs : "text",
                query : args || {}
            };
            
            return this.getEntities(consts.AtomBookmarksTags, options, this.getTagsFeedCallbacks(), args);
        },
        
        /**
         * Create a Bookmark object with the specified data.
         * 
         * @method newBookmark
         * @param {Object} args Object containing the fields for the 
         * new bookmark 
         */
        newBookmark : function(args) {
            return this._toBookmark(args);
        },
        
        /*
         * Callbacks used when reading a feed that contains Bookmark entries.
         */
        getBookmarkFeedCallbacks: function() {
            return ConnectionsBookmarkFeedCallbacks;
        },
        
        /*
         * Callbacks used when reading a feed that contains Bookmark entries.
         */
        getTagsFeedCallbacks: function() {
            return ConnectionsTagsFeedCallbacks;
        },
        
        /*
         * Return a Bookmark instance from Bookmark or JSON or String. Throws
         * an error if the argument was neither.
         */
        _toBookmark : function(bookmarkOrJsonOrString) {
            if (bookmarkOrJsonOrString instanceof Bookmark) {
                return bookmarkOrJsonOrString;
            } else {
                if (lang.isString(bookmarkOrJsonOrString)) {
                    bookmarkOrJsonOrString = {
                        bookmarkUuid : bookmarkOrJsonOrString
                    };
                }
                return new Bookmark({
                    service : this,
                    _fields : lang.mixin({}, bookmarkOrJsonOrString)
                });
            }
        },

        /*
         * Validate a bookmark UUID, and return a Promise if invalid.
         */
        _validateBookmarkUuid : function(bookmarkUuid) {
            if (!bookmarkUuid || bookmarkUuid.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected bookmarkUuid.");
            }
        },
        
        /*
         * Validate a bookmark UUID, and return a Promise if invalid.
         */
        _validateBookmarkUrl : function(bookmarkUrl) {
            if (!bookmarkUrl || bookmarkUrl.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected bookmarkUrl.");
            }
        },

        /*
         * Validate a bookmark, and return a Promise if invalid.
         */
        _validateBookmark : function(bookmark,checkUuid) {
            if (!bookmark || !bookmark.getTitle()) {
                return this.createBadRequestPromise("Invalid argument, bookmark with title must be specified.");
            }
            if (checkUuid && !bookmark.getBookmarkUuid()) {
                return this.createBadRequestPromise("Invalid argument, bookmark with UUID must be specified.");
            }
        },
        
        /*
         * Construct a post data for a Bookmark
         */
        _constructBookmarkPostData : function(bookmark) {
            var transformer = function(value,key) {
                if (key == "getTags") {
                    var tags = value;
                    value = "";
                    for (var tag in tags) {
                        value += stringUtil.transform(CategoryTmpl, {
                            "tag" : tags[tag]
                        });
                    }
                } else if (key == "getTitle" && !value) {
					value = bookmark.getTitle();
				} else if (key == "getUrl" && !value) {
					value = bookmark.getUrl();
				} else if (key == "getContent" && !value) {
					value = bookmark.getContent();
				} else if (key == "isPrivate" && !value) {
					if(bookmark.isPrivate()){
						value = CategoryPrivateFlag;
					}else{
						value = "";
					}
				}
                return value;
            };
            var postData = stringUtil.transform(BookmarkTmpl, bookmark, transformer, bookmark);
            return stringUtil.trim(postData);
        }
        
    });
    return BookmarkService;
});

},
'sbt/connections/CommunityConstants':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. Definition of constants for CommunityService.
 * 
 * @module sbt.connections.CommunityConstants
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang,conn) {

    return lang.mixin({}, conn, {
        
        /**
         * Public community
         * 
         * @property Public
         * @type String
         * @for sbt.connections.Community
         */
        Public : "public",

        /**
         * Moderated community
         * 
         * @property Moderated
         * @type String
         * @for sbt.connections.Community
         */
        Moderated : "publicInviteOnly",

        /**
         * Restricted community
         * 
         * @property Restricted
         * @type String
         * @for sbt.connections.Community
         */
        Restricted : "private",

        /**
         * Community owner
         * 
         * @property Owner
         * @type String
         * @for sbt.connections.Member
         */
        Owner : "owner",
        
        /**
         * Community member
         * 
         * @property Member
         * @type String
         * @for sbt.connections.Member
         */
        Member : "member",
        
        /**
         * Namespaces to be used when reading the Communities ATOM entry or feed
         */
        CommunityNamespaces : {
			a : "http://www.w3.org/2005/Atom",
			app : "http://www.w3.org/2007/app",
			snx : "http://www.ibm.com/xmlns/prod/sn"
		},
        
        /**
         * XPath expressions used when parsing a Connections Communities ATOM feed
         * 
         * @property CommunityFeedXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        CommunityFeedXPath : conn.ConnectionsFeedXPath,

        /**
         * XPath expressions to be used when reading a Community Entry
         * 
         * @property CommunityXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        CommunityXPath : lang.mixin({}, conn.AtomEntryXPath, {
            communityUuid : "a:id",
            communityTheme : "snx:communityTheme",
            logoUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/logo']/@href",
            tags : "a:category[not(@scheme)]/@term",
            memberCount : "snx:membercount",
            communityType : "snx:communityType",
            communityUrl : "a:link[@rel='alternate']/@href",
            isExternal : "snx:isExternal"
        }),
        
        /**
         * XPath expressions to be used when reading a Community Member Entry
         * 
         * @property MemberXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        MemberXPath : lang.mixin({}, conn.AtomEntryXPath, {
        	id : "a:contributor/snx:userid",
            uid : "a:contributor/snx:userid",
            role : "snx:role"
        }),

        /**
         * XPath expressions to be used when reading a Community Invite Entry
         * 
         * @property InviteXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        InviteXPath : lang.mixin({}, conn.AtomEntryXPath, {
            inviteUuid : "a:id",
            communityUuid : "snx:communityUuid",
            communityUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/community']/@href"
        }),
        
        /**
         * XPath expressions to be used when reading a Community Event Entry
         * 
         * @property EventXPath
         * @type Object
         * @for sbt.connections.CommunityService
         */
        EventXPath : lang.mixin({}, conn.AtomEntryXPath, {
            eventUuid : "snx:eventUuid",
            eventInstUuid : "snx:eventInstUuid",
            location : "snx:location",
            allDay : "snx:allday",
            selfLink : "a:link[@rel='self']/@href",
            sourceId : "a:source/a:id",
            sourceTitle : "a:source/a:title",
            sourceLink : "a:source/a:link[@rel='self']/@href",
            attendLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/attend']/@href",
            followLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/follow']/@href",
            followed : "snx:followed",
            attended : "snx:attended",
            attendeesAtomUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/attendees']/@href",
            containerLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container']/@href",
            instStartDate : "snx:startDate",
            instEndDate : "snx:endDate",
            repeats : "snx:repeats",
            parentEventId : "snx:parentEvent",
            parentEventLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/parentevent']/@href",
            communityLink : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container']/@href",
            communityUuid : "snx:communityUuid",
            eventAtomInstances : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/instances']/@href",
            eventAtomAttendees : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/attend']/@href",
            eventAtomFollowers : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/calendar/event/follow']/@href",
            frequency : "snx:recurrence/@frequency",
            interval : "snx:recurrence/@interval",
            until : "snx:recurrence/snx:until",
            byDay : "snx:recurrence/snx:byDay",
            startDate : "snx:recurrence/snx:startDate",
            endDate : "snx:recurrence/snx:endDate"
        }),

        /**
         * A feed of all public communities.
         *  
         * Get the All Communities feed to see a list of all public communities to which the authenticated user has access or pass in parameters to search for communities that match a specific criteria.
         * 
         * Supports: asc, email, ps, search, since, sortField, tag, userid
         * 
         * @property AtomCommunitiesAll
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunitiesAll : "/${communities}/service/atom/communities/all",

        /**
         * A feed of communities of which the authenticated user is a member.
         * 
         * Get the My Communities feed to see a list of the communities to which the authenticated user is a member or pass in parameters to search for a subset of those communities that match a specific criteria.
         * 
         * Supports: asc, email, ps, search, since, sortField, tag, userid
         * 
         * @property AtomCommunitiesMy
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunitiesMy : "/${communities}/service/atom/communities/my",
        
        /**
         * A feed of invitations.
         * 
         * Get a list of the outstanding community invitations of the currently authenticated user or provide parameters to search for a subset of those invitations.
         * 
         * Supports: asc, ps, search, since, sortField
         * 
         * @property AtomCommunityInvitesMy
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityInvitesMy : "/${communities}/service/atom/community/invites/my",
        
        /**
         * URL to delete/create Community Invites
         * 
         * @property AtomCommunityInvites
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityInvites : "${communities}/service/atom/community/invites",
        
        /**
         * A feed of subcommunities.
         * 
         * Get a list of subcommunities associated with a community.
         * 
         * Supports: asc, page, ps, since, sortBy, sortOrder, sortField
         * 
         * @property AtomCommunitySubCommunities
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunitySubCommunities : "${communities}/service/atom/community/subcommunities",
            
        /**
         * A feed of members.
         * 
         * Retrieve the members feed to view a list of the members who belong to a given community.
         * 
         * Supports: asc, email, page, ps, role, since, sortField, userid
         * 
         * @property AtomCommunityMembers
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityMembers : "${communities}/service/atom/community/members",
        
        /**
         * A community entry.
         * 
         * @property AtomCommunityInstance
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityInstance : "${communities}/service/atom/community/instance",
        
        /**
         * Get a feed that includes the topics in a specific community forum.
         * 
         * @property AtomCommunityForumTopics
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityForumTopics : "/${communities}/service/atom/community/forum/topics",
        
        /**
         * Get a feed of a Community's bookmarks. Requires a url parameter of the form communityUuid=xxx
         * @property AtomCommunityBookmarks
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityBookmarks : "/${communities}/service/atom/community/bookmarks",
        
        /**
         * Get a feed of a Community's Events or EventInsts. 
         * @property AtomCommunityEvents
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityEvents : "/${communities}/calendar/atom/calendar/event",
        
        /**
         * Get a feed of a Community's Event Attendess. 
         * @property AtomCommunityEventAttend
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityEventAttend : "/${communities}/calendar/atom/calendar/event/attendees",
        
        /**
         * Get a feed of a Community's Event Comments. 
         * @property AtomCommunityEventComments
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityEventComments : "/${communities}/calendar/atom/calendar/event/comment",
        
        /**
         * Get a feed of a Community's Invites. 
         * @property AtomCommunityInvites
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityInvites : "/${communities}/service/atom/community/invites",
        
        /**
         * Get a feed of a Community's Bookmarks. 
         * @property AtomCommunityInvites
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomCommunityBookmarks : "/${communities}/service/atom/community/bookmarks",
        
        /**
         * File Proxy URL for update community logo
         * @property AtomUpdateCommunityLogo
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomUpdateCommunityLogo : "/${files}/{endpointName}/connections/UpdateCommunityLogo/{fileName}",
        
        /**
         * File Proxy URL for uploading a community file
         * @property AtomUploadCommunityFile
         * @type String
         * @for sbt.connections.CommunityService
         */
        AtomUploadCommunityFile : "/${files}/{endpointName}/connections/UploadCommunityFile/{communityUuid}"
        
    });
});
},
'sbt/connections/ActivityConstants':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for ActivityService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang, conn) {

	return lang.mixin({}, conn, {

		/**
		* Namespaces to be used when reading the Activities ATOM entry or feed
		*/
		ActivityNamespaces : {	
			a 	:  conn.Namespaces.a,
			app : conn.Namespaces.app,
			thr :  conn.Namespaces.thr,			
			snx :  conn.Namespaces.snx			
		},

		/**
		 * Map to store all possible types of activity node entry types
		 */
		ActivityNodeTypes : {
			Activity : "activity",
			Chat : "chat",
			Email : "email",
			Entry : "entry",
			EntryTemplate : "entrytemplate",
			Reply : "reply",
			Section : "section",
			ToDo : "todo"
		},

		/**
		 * XPath expressions used when parsing a Connections Activities ATOM feed
		 */
		ActivitiesFeedXPath : conn.ConnectionsFeedXPath,

		/**
		 * XPath expressions for Person Fields
		 */
		PersonFieldXPath : {
			name : "a:name",
			userId : "snx:userid",
			email : "a:email"

		},

		/**
		 * XPath expressions for File Fields
		 */
		FileFieldXPath : {
			url : "a:link[@rel='enclosure']/@href",
			type : "a:link[@rel='enclosure']/@type",
			size : "a:link[@rel='enclosure']/@size",
			length : "a:link/@length"
		},

		/**
		 * XPath expressions for Link Fields
		 */
		LinkFieldXPath : {
			url : "a:link/@href",
			title : "a:link/@title"
		},

		/**
		 * XPath expressions for Text Fields
		 */
		TextFieldXPath : {
			summary : "a:summary"
		},

		
		/**
		 * XPath expressions to be used when reading an activity Node entry
		 * 
		 */
		ActivityNodeXPath :  lang.mixin({}, conn.AtomEntryXPath, {

			activityUuid : "snx:activity",

			categoryFlagCompleted : "a:category[@term='completed']/@label",
			categoryFlagTemplate : "a:category[@term='template']/@label",
			categoryFlagDelete : "a:category[@term='deleted']/@label",

			authorLdapid : "a:author/snx:ldapid",
			contributorLdapid : "a:contributor/snx:ldapid",

			type : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term",
			priority : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@label",

			coummunityUuid : "snx:communityUuid",
			communityUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container']/@href",

			dueDate : "snx:duedate",
			membersUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/member-list']/@href",
			historyUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/history']/@href",
			templatesUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/templates']/@href",

			position : "snx:position",
			depth : "snx:depth",
			permissions : "snx:permissions",
			iconUrl : "snx:icon",

			tags : "a:category[not(@scheme)]/@term",

			inReplyToId : "thr:in-reply-to/@ref",
			inReplyToUrl : "thr:in-reply-to/@href",
			inReplyToActivity : "thr:in-reply-to/snx:activity",

			assignedToName : "snx:assignedto/@name",
			assignedToUserId : "snx:assignedto/@userid",
			assignedToEmail : "snx:assignedto",

			textFields : "snx:field[@type='text']",
			linkFields : "snx:field[@type='link']",
			personFields : "snx:field[@type='person']",
			dateFields : "snx:field[@type='date']",
			fileFields : "snx:field[@type='file']"

		}),

		/**
		 * XPath expressions to be used when reading an Tag Node entry
		 */
		TagXPath : {
			term : "@term",
			frequency : "@snx:frequency",
			entries : "app:categories/a:category",
			uid : "@term",
			bin : "@snx:bin"
		},
		
		/**
         * XPath expressions to be used when reading a Community Member Entry
         * 
         * @property MemberXPath
         * @type Object
         * @for sbt.connections.ActivityService
         */
        MemberXPath : lang.mixin({}, conn.AtomEntryXPath, {
        	entry : "a:feed/a:entry",
        	id : "a:id",
            uid : "a:id",
            role : "snx:role",
            permissions : "snx:permissions",
            category : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term"
        }),

		/**
		 * Search for content in all of the activities, both completed and active, that matches a specific criteria.
		 */
		AtomActivitiesEverything : "/${activities}/service/atom2/everything",

		/**
		 * Get a feed of all active activities that match a specific criteria.
		 */
		AtomActivitiesMy : "${activities}/service/atom2/activities",

		/**
		 * Get a feed of all active activities in trash
		 */
		AtomActivitiesTrash : "${activities}/service/atom2/trash",

		/**
		 * Search for a set of completed activities that match a specific criteria.
		 */
		AtomActivitiesCompleted : "${activities}/service/atom2/completed",

		/**
		 * Get Activity node feed
		 */
		AtomActivityNode : "${activities}/service/atom2/activitynode",

		/**
		 * Get feed of all Activity Nodes in an Activity
		 */
		AtomActivityNodes : "${activities}/service/atom2/descendants", // ?nodeUuid="

		/**
		 * Get Activity Node feed from Trash
		 */
		AtomActivityNodeTrash : "${activities}/service/atom2/trashednode",

		/**
		 * Create a new Activity
		 */
		AtomCreateActivityNode : "${activities}/service/atom2/activity",

		/**
		 * Get a Feeds of all ToDo Entries in an activity
		 */
		AtomActivitiesToDos : "${activities}/service/atom2/todos",

		/**
		 * Get a feed of Activity Members
		 */
		AtomActivitiesMembers : "${activities}/service/atom2/acl",

		/**
		 * Get a member for an activity
		 */
		AtomActivitiesMember : "${activities}/service/atom2/acl?activityUuid={activityUuid}&amp;memberid={memberId}",

		/**
		 * Get all tags for an activity
		 */
		AtomActivitiesTags : "${activities}/service/atom2/tags"

	});
});
},
'sbt/text':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 * @module sbt.text
 */
define(['./_bridge/text'],function(text) {
	    return text;
});



},
'sbt/xsl':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.

 * Social Business Toolkit SDK - XSL utilities.
 * Borrowed from the Connections source code, for now
 */

/**
 * @module sbt.xsl
 */
define(['./Cache','./xml','./lang'],function(cache,sbtml,lang) {
	return {
	
		/**
		 * Transform an XML document using an XSL stylesheet.
		 * The XML document can be either a string or an actual DOM document. In case of a
		 * string, if it starts with "http", then the string is read from the URL. Then, it
		 * is parsed to a DOM document.
		 * The XSL must be a string
		 */
		xsltTransform: function(xml,xsl) {
			if(!xml) return null;
			
			// Resolve the XML if it is a URL
			if(lang.isString(xml)) {
				xml = sbtml.parse(sbt.cache.get(xml));
			}
	
			// Resolve the XSL if it is a URL
			if(!xsl) return lang.clone(xml);
			xsl = sbt.cache.get(xsl);
			
			// Run the transformation
			if(window.ActiveXObject) {
				return xml.transformNode(xsl);
			} else if(document.implementation && document.implementation.createDocument) {
				var xslt = new XSLTProcessor();
				xslt.importStyleSheet(xsl);
				return xslt.transformToFragment(xml,document);
			}
			
			// No XSLT engine is available, just return the document as is
			return lang.clone(xml);
		}
	};
});
},
'sbt/xpath':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - XPath utilities.
 * 
 * @module sbt.xpath
 */
define(['./declare'],function(declare) {
	/*
	 * @class sbt.xpath.XPathExpr
	 */
	var XPathExpr = declare(null, {
		ie:		false,
		constructor: function(xpath, nsArray){
		     this.xpath = xpath;    
		     this.nsArray = nsArray || {};
		     if (!document.evaluate) {
		    	 this.ie = true;
		         this.nsString = "";
		         if (this.nsArray) {
		             for(var ns in this.nsArray) {
		                 this.nsString += ' xmlns:' + ns + '="' + this.nsArray[ns] + '"';
		             }
		         }
		     }
		},
	
		selectSingleNode : function(xmlDomCtx) {
			var doc = xmlDomCtx.ownerDocument || xmlDomCtx;
			if (this.ie) {
				try {
					doc.setProperty("SelectionLanguage", "XPath");
					doc.setProperty("SelectionNamespaces", this.nsString);
					if (xmlDomCtx === doc) xmlDomCtx = doc.documentElement;
					return xmlDomCtx.selectSingleNode(this.xpath);
				} catch (ex) {
					throw "XPath is not supported";
				}
			} else {
				var _this = this;
				if (xmlDomCtx.documentElement) xmlDomCtx = xmlDomCtx.documentElement;

				var result = doc.evaluate(this.xpath, xmlDomCtx,
					function(prefix) {
						return _this.nsArray[prefix];
					}, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				return result.singleNodeValue;
			}
		},	
		
        selectNumber : function(xmlDomCtx){
            var doc = xmlDomCtx.ownerDocument || xmlDomCtx;
            if (this.ie) {
            	return this.selectText(xmlDomCtx);
            } else {
                var _this = this;
                var result = doc.evaluate(this.xpath, xmlDomCtx,
                    function(prefix) {
                        return _this.nsArray[prefix];
                    }, XPathResult.NUMBER_TYPE, null);
                return result.numberValue;
            }
        },
		
		selectNodes : function(xmlDomCtx) {
			var doc = xmlDomCtx.ownerDocument || xmlDomCtx;
			if (this.ie) {
				try {
					doc.setProperty("SelectionLanguage", "XPath");
					doc.setProperty("SelectionNamespaces", this.nsString);
					if (xmlDomCtx === doc) xmlDomCtx = doc.documentElement;
					return xmlDomCtx.selectNodes(this.xpath);
				} catch (ex) {
					throw "XPath is not supported";
				}
			} else {
				var _this = this;
				var result = doc.evaluate(this.xpath, xmlDomCtx, 
					function(prefix) {
						return _this.nsArray[prefix];
					}, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var r = [];
				for(var i = 0; i < result.snapshotLength; i++) {
					r.push(result.snapshotItem(i));
				}
				return r;
			}
		},
		
		selectText : function(node) {
			var result = this.selectSingleNode(node);
			return result ? (result.text || result.textContent) : null;
		}
	});
	
	return {
		/**
		 * Selects nodes from XML data object
		 * 
		 * @method selectNodes
		 * @param {Object}
		 *            node xml data to be parsed
		 * @param {String}
		 *            xpath xpath expression
		 * @param {Array}
		 *            nsArray Array of namespaces for the xml.
		 * @return {Array} Array of nodes
		 * @static
		 */
		selectNodes : function(node, xpath, nsArray) {
			var expr = new XPathExpr(xpath, nsArray);
			return expr.selectNodes(node);
		},

		/**
		 * Selects single node from XML data object
		 * 
		 * @method selectSingleNode
		 * @param {Object}
		 *            node xml data to be parsed
		 * @param {String}
		 *            xpath xpath expression
		 * @param {Array}
		 *            nsArray Array of namespaces for the xml.
		 * @return {Object} selected node object
		 * @static
		 */
		selectSingleNode : function(node, xpath, nsArray) {
			var expr = new XPathExpr(xpath, nsArray);
			return expr.selectSingleNode(node);
		},
		

		/**
		 * Selects text from a single node from XML data object
		 * 
		 * @method selectText
		 * @param {Object}
		 *            node xml data to be parsed
		 * @param {String}
		 *            xpath xpath expression
		 * @param {Array}
		 *            nsArray Array of namespaces for the xml.
		 * @return {String} inner text of the node object
		 * @static
		 */
		selectText : function(node, xpath, nsArray) {
			var expr = new XPathExpr(xpath, nsArray);
			return expr.selectText(node);
		},
		
		/**
		 * 
		 * @param node
		 * @param xpath
		 * @param nsArray
		 * @returns
		 */
		selectNumber : function(node, xpath, nsArray){
		    var expr = new XPathExpr(xpath, nsArray);
		    return expr.selectNumber(node);
		}
	};
});
},
'sbt/WPSProxy':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK to be used with WebSphere Portal server
 * Definition of a proxy re-writer.
 * 
 * @module sbt.Proxy
 */
define(['./declare','./lang','./pathUtil'],function(declare,lang,pathUtil) {

    /**
     * Definition of the proxy module
     * 
     * @class sbt.Proxy
     * 
     */
    var Proxy = declare(null, {
    	
    	proxyUrl		: null, 
    	
    	constructor: function(args){
    		lang.mixin(this, args);	
    	},
    	
    	rewriteUrl: function(baseUrl,serviceUrl,proxyPath) {
    		var u = serviceUrl;
    		if(this.proxyUrl) {
    			if(u.indexOf("http://")==0) {
    				u = "/http/"+u.substring(7);
    			} else if(u.indexOf("https://")==0) {
    				u = "/https/"+u.substring(8);
    			}

    				if(baseUrl.indexOf("http://")==0) {
    					baseUrl = "/http/"+baseUrl.substring(7);
        			} else if(baseUrl.indexOf("https://")==0) {
        				baseUrl = "/https/"+baseUrl.substring(8);
        			}
    				var networkUrl = pathUtil.concat(this.proxyUrl, baseUrl);
    				networkUrl = pathUtil.concat(networkUrl, serviceUrl);
    				return networkUrl;
    		}
    		return u;
    	}
    });
    
    return Proxy;

});
},
'sbt/config':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Definition of config module.
 * This module needs a _config module to be defined at runtime.
 * 
	 * @module sbt.config
 */
define(['./defer!./_config'],function(cfg){
    return cfg;
});
},
'sbt/base/BaseConstants':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK. Definition of constants for BaseService.
 */
define([ "../config" ], function(sbt) {
    return {
    	/**
    	 * Error codes used by the SBT based service implementations.
    	 */
        sbtErrorCodes : {
            badRequest : 400
        },
    
        /**
         * Namespaces to be used when reading the Connections ATOM entry or feed
         */
		Namespaces : {
			o : "http://ns.opensocial.org/2008/opensocial",
			app : "http://www.w3.org/2007/app",
			thr : "http://purl.org/syndication/thread/1.0",
			fh : "http://purl.org/syndication/history/1.0",
			snx : "http://www.ibm.com/xmlns/prod/sn",
			opensearch : "http://a9.com/-/spec/opensearch/1.1/",
			a : "http://www.w3.org/2005/Atom",
			h : "http://www.w3.org/1999/xhtml",
			td : "urn:ibm.com/td",
			relevance : "http://a9.com/-/opensearch/extensions/relevance/1.0/",
			ibmsc : "http://www.ibm.com/search/content/2010",
			xhtml : "http://www.w3.org/1999/xhtml",
			spelling : "http://a9.com/-/opensearch/extensions/spelling/1.0/",
			ca : "http://www.ibm.com/xmlns/prod/composite-applications/v1.0 namespace"
		},
        
	    /**
		 * XPath expressions used when parsing an ATOM feed
		 */
	    AtomFeedXPath : {
	        // used by getEntitiesDataArray
	        entries : "/a:feed/a:entry",
	        // used by getSummary
	        totalResults : "/a:feed/opensearch:totalResults",
	        startIndex : "/a:feed/opensearch:startIndex",
	        itemsPerPage : "/a:feed/opensearch:itemsPerPage"
	    },
	
        /**
         * XPath expressions to be used when reading an forum topic entry
         */
        AtomEntryXPath : {
            // used by getEntityData
            entry : "/a:entry",
            // used by getEntityId
            uid : "a:id",
            // used by getters
            id : "a:id",
            title : "a:title",
            updated : "a:updated",
            published : "a:published",
            authorName : "a:author/a:name",
            authorEmail : "a:author/a:email",
            authorUserid : "a:author/snx:userid",
            authorUserState : "a:author/snx:userState",
            contributorName : "a:contributor/a:name",
            contributorEmail : "a:contributor/a:email",
            contributorUserid : "a:contributor/snx:userid",
            contributorUserState : "a:contributor/snx:userState",
    		content : "a:content[@type='html']",
    		summary : "a:summary[@type='text']",
    		categoryTerm : "a:category/@term",
            editUrl : "a:link[@rel='edit']/@href",
            selfUrl : "a:link[@rel='self']/@href",
            alternateUrl : "a:link[@rel='alternate']/@href"
        },
        
	    /**
	     * 
	     */
	    AtomXmlHeaders : {
	        "Content-Type" : "application/atom+xml"
	    }
	    
    };
});
},
'sbt/xml':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - XML utilities.
 */
define(['./lang'], function(lang) {
	var xml_to_encoded = {
		'&': '&amp;',
		'"': '&quot;',
		'<': '&lt;',
		'>': '&gt;'
	};

	var encoded_to_xml = {
		'&amp;': '&',
		'&quot;': '"',
		'&lt;': '<',
		'&gt;': '>'
	};
		
	return {
		/**
		 * XML Parser.
		 * This function parses an XML string and returns a DOM.
		 */
		parse: function(xml) {
			var xmlDoc=null;
			try {
				if(!document.evaluate){
					xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async="false";
					xmlDoc.loadXML(xml);
				}else{
					if(window.DOMParser){
						parser=new DOMParser();
						xmlDoc=parser.parseFromString(xml,"text/xml");
					}
				}
			}catch(ex){
				console.log(ex.message);
			}
			return xmlDoc;
		},
		asString: function(xmlDoc) {
			if (xmlDoc==null) {
				return "";
			} else if(window.ActiveXObject){
				return xmlDoc.xml;
			} else {
				return (new XMLSerializer()).serializeToString(xmlDoc);
			}
		},
		getText : function (xmlElement){
			if(!document.evaluate){
				return xmlElement.text;
			}else{
				return xmlElement.textContent;
			}
		},
		encodeXmlEntry: function(string) {
		    if (lang.isArray(string)) {
		        string = string.join();
		    }
		    if (!lang.isString(string)) {
		        string = string.toString();
		    }
			return string.replace(/([\&"<>])/g, function(str, item) {
				return xml_to_encoded[item];
			});
		},
		decodeXmlEntry: function (string) {
			return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,function(str, item) {
				return encoded_to_xml[item];
			});
		}
	};
});
},
'sbt/entities':function(){
// The entities class from dojox/html/entities.
define(["./lang"], function(lang) {
    //      Entity characters for HTML, represented as an array of
    //      character code, entity name (minus & and ; wrapping.
    //      The function wrapper is to fix global leaking with the build tools.
    var dhe = {};
    
    var _applyEncodingMap = function(str, map){
        // summary:
        //      Private internal function for performing encoding of entity characters.
        // tags:
        //      private
    
        // Check to see if we have genned and cached a regexp for this map yet
        // If we have, use it, if not, gen it, cache, then use.
        var mapper, regexp;
        if(map._encCache &&
            map._encCache.regexp &&
            map._encCache.mapper &&
            map.length == map._encCache.length){
            mapper = map._encCache.mapper;
            regexp = map._encCache.regexp;
        }else{
            mapper = {};
            regexp = ["["];
            var i;
            for(i = 0; i < map.length; i++){
                mapper[map[i][0]] = "&" + map[i][1] + ";";
                regexp.push(map[i][0]);
            }
            regexp.push("]");
            regexp = new RegExp(regexp.join(""), "g");
            map._encCache = {
                mapper: mapper,
                regexp: regexp,
                length: map.length
            };
        }
        str = str.replace(regexp, function(c){
            return mapper[c];
        });
        return str;
    };
    
    var _applyDecodingMap = function(str, map){
        // summary:
        //      Private internal function for performing decoding of entity characters.
        // tags:
        //      private
        var mapper, regexp;
        if(map._decCache &&
            map._decCache.regexp &&
            map._decCache.mapper &&
            map.length == map._decCache.length){
            mapper = map._decCache.mapper;
            regexp = map._decCache.regexp;
        }else{
            mapper = {};
            regexp = ["("];
            var i;
            for(i = 0; i < map.length; i++){
                var e = "&" + map[i][1] + ";";
                if(i){regexp.push("|");}
                mapper[e] = map[i][0];
                regexp.push(e);
            }
            regexp.push(")");
            regexp = new RegExp(regexp.join(""), "g");
            map._decCache = {
                mapper: mapper,
                regexp: regexp,
                length: map.length
            };
        }
        str = str.replace(regexp, function(c){
            return mapper[c];
        });
        return str;
    };

    dhe.html = [
        ["\u0026","amp"], ["\u0022","quot"],["\u003C","lt"], ["\u003E","gt"],
        ["\u00A0","nbsp"]
    ];
    
    //      Entity characters for Latin characters and similar, represented as an array of
    //      character code, entity name (minus & and ; wrapping.
    dhe.latin = [
        ["\u00A1","iexcl"],["\u00A2","cent"],["\u00A3","pound"],["\u20AC","euro"],
        ["\u00A4","curren"],["\u00A5","yen"],["\u00A6","brvbar"],["\u00A7","sect"],
        ["\u00A8","uml"],["\u00A9","copy"],["\u00AA","ordf"],["\u00AB","laquo"],
        ["\u00AC","not"],["\u00AD","shy"],["\u00AE","reg"],["\u00AF","macr"],
        ["\u00B0","deg"],["\u00B1","plusmn"],["\u00B2","sup2"],["\u00B3","sup3"],
        ["\u00B4","acute"],["\u00B5","micro"],["\u00B6","para"],["\u00B7","middot"],
        ["\u00B8","cedil"],["\u00B9","sup1"],["\u00BA","ordm"],["\u00BB","raquo"],
        ["\u00BC","frac14"],["\u00BD","frac12"],["\u00BE","frac34"],["\u00BF","iquest"],
        ["\u00C0","Agrave"],["\u00C1","Aacute"],["\u00C2","Acirc"],["\u00C3","Atilde"],
        ["\u00C4","Auml"],["\u00C5","Aring"],["\u00C6","AElig"],["\u00C7","Ccedil"],
        ["\u00C8","Egrave"],["\u00C9","Eacute"],["\u00CA","Ecirc"],["\u00CB","Euml"],
        ["\u00CC","Igrave"],["\u00CD","Iacute"],["\u00CE","Icirc"],["\u00CF","Iuml"],
        ["\u00D0","ETH"],["\u00D1","Ntilde"],["\u00D2","Ograve"],["\u00D3","Oacute"],
        ["\u00D4","Ocirc"],["\u00D5","Otilde"],["\u00D6","Ouml"],["\u00D7","times"],
        ["\u00D8","Oslash"],["\u00D9","Ugrave"],["\u00DA","Uacute"],["\u00DB","Ucirc"],
        ["\u00DC","Uuml"],["\u00DD","Yacute"],["\u00DE","THORN"],["\u00DF","szlig"],
        ["\u00E0","agrave"],["\u00E1","aacute"],["\u00E2","acirc"],["\u00E3","atilde"],
        ["\u00E4","auml"],["\u00E5","aring"],["\u00E6","aelig"],["\u00E7","ccedil"],
        ["\u00E8","egrave"],["\u00E9","eacute"],["\u00EA","ecirc"],["\u00EB","euml"],
        ["\u00EC","igrave"],["\u00ED","iacute"],["\u00EE","icirc"],["\u00EF","iuml"],
        ["\u00F0","eth"],["\u00F1","ntilde"],["\u00F2","ograve"],["\u00F3","oacute"],
        ["\u00F4","ocirc"],["\u00F5","otilde"],["\u00F6","ouml"],["\u00F7","divide"],
        ["\u00F8","oslash"],["\u00F9","ugrave"],["\u00FA","uacute"],["\u00FB","ucirc"],
        ["\u00FC","uuml"],["\u00FD","yacute"],["\u00FE","thorn"],["\u00FF","yuml"],
        ["\u0192","fnof"],["\u0391","Alpha"],["\u0392","Beta"],["\u0393","Gamma"],
        ["\u0394","Delta"],["\u0395","Epsilon"],["\u0396","Zeta"],["\u0397","Eta"],
        ["\u0398","Theta"], ["\u0399","Iota"],["\u039A","Kappa"],["\u039B","Lambda"],
        ["\u039C","Mu"],["\u039D","Nu"],["\u039E","Xi"],["\u039F","Omicron"],
        ["\u03A0","Pi"],["\u03A1","Rho"],["\u03A3","Sigma"],["\u03A4","Tau"],
        ["\u03A5","Upsilon"],["\u03A6","Phi"],["\u03A7","Chi"],["\u03A8","Psi"],
        ["\u03A9","Omega"],["\u03B1","alpha"],["\u03B2","beta"],["\u03B3","gamma"],
        ["\u03B4","delta"],["\u03B5","epsilon"],["\u03B6","zeta"],["\u03B7","eta"],
        ["\u03B8","theta"],["\u03B9","iota"],["\u03BA","kappa"],["\u03BB","lambda"],
        ["\u03BC","mu"],["\u03BD","nu"],["\u03BE","xi"],["\u03BF","omicron"],
        ["\u03C0","pi"],["\u03C1","rho"],["\u03C2","sigmaf"],["\u03C3","sigma"],
        ["\u03C4","tau"],["\u03C5","upsilon"],["\u03C6","phi"],["\u03C7","chi"],
        ["\u03C8","psi"],["\u03C9","omega"],["\u03D1","thetasym"],["\u03D2","upsih"],
        ["\u03D6","piv"],["\u2022","bull"],["\u2026","hellip"],["\u2032","prime"],
        ["\u2033","Prime"],["\u203E","oline"],["\u2044","frasl"],["\u2118","weierp"],
        ["\u2111","image"],["\u211C","real"],["\u2122","trade"],["\u2135","alefsym"],
        ["\u2190","larr"],["\u2191","uarr"],["\u2192","rarr"],["\u2193","darr"],
        ["\u2194","harr"],["\u21B5","crarr"],["\u21D0","lArr"],["\u21D1","uArr"],
        ["\u21D2","rArr"],["\u21D3","dArr"],["\u21D4","hArr"],["\u2200","forall"],
        ["\u2202","part"],["\u2203","exist"],["\u2205","empty"],["\u2207","nabla"],
        ["\u2208","isin"],["\u2209","notin"],["\u220B","ni"],["\u220F","prod"],
        ["\u2211","sum"],["\u2212","minus"],["\u2217","lowast"],["\u221A","radic"],
        ["\u221D","prop"],["\u221E","infin"],["\u2220","ang"],["\u2227","and"],
        ["\u2228","or"],["\u2229","cap"],["\u222A","cup"],["\u222B","int"],
        ["\u2234","there4"],["\u223C","sim"],["\u2245","cong"],["\u2248","asymp"],
        ["\u2260","ne"],["\u2261","equiv"],["\u2264","le"],["\u2265","ge"],
        ["\u2282","sub"],["\u2283","sup"],["\u2284","nsub"],["\u2286","sube"],
        ["\u2287","supe"],["\u2295","oplus"],["\u2297","otimes"],["\u22A5","perp"],
        ["\u22C5","sdot"],["\u2308","lceil"],["\u2309","rceil"],["\u230A","lfloor"],
        ["\u230B","rfloor"],["\u2329","lang"],["\u232A","rang"],["\u25CA","loz"],
        ["\u2660","spades"],["\u2663","clubs"],["\u2665","hearts"],["\u2666","diams"],
        ["\u0152","Elig"],["\u0153","oelig"],["\u0160","Scaron"],["\u0161","scaron"],
        ["\u0178","Yuml"],["\u02C6","circ"],["\u02DC","tilde"],["\u2002","ensp"],
        ["\u2003","emsp"],["\u2009","thinsp"],["\u200C","zwnj"],["\u200D","zwj"],
        ["\u200E","lrm"],["\u200F","rlm"],["\u2013","ndash"],["\u2014","mdash"],
        ["\u2018","lsquo"],["\u2019","rsquo"],["\u201A","sbquo"],["\u201C","ldquo"],
        ["\u201D","rdquo"],["\u201E","bdquo"],["\u2020","dagger"],["\u2021","Dagger"],
        ["\u2030","permil"],["\u2039","lsaquo"],["\u203A","rsaquo"]
    ];
    
    dhe.encode = function(str/*string*/, m /*array?*/){
        // summary:
        //      Function to obtain an entity encoding for a specified character
        // str:
        //      The string to process for possible entity encoding.
        // m:
        //      An optional list of character to entity name mappings (array of
        //      arrays).  If not provided, it uses the and Latin entities as the
        //      set to map and escape.
        // tags:
        //      public
        if(str){
            if(!m){
                // Apply the basic mappings.  HTML should always come first when decoding
                // as well.
                str = _applyEncodingMap(str, dhe.html);
                str = _applyEncodingMap(str, dhe.latin);
    
            }else{
                str = _applyEncodingMap(str, m);
            }
        }
        return str;
    };
    
    dhe.decode = function(str/*string*/, m /*array?*/){
        // summary:
        //      Function to obtain an entity encoding for a specified character
        // str:
        //      The string to process for possible entity encoding to decode.
        // m:
        //      An optional list of character to entity name mappings (array of
        //      arrays).  If not provided, it uses the HTML and Latin entities as the
        //      set to map and decode.
        // tags:
        //      public
        if(str){
            if(!m){
                // Apply the basic mappings.  HTML should always come first when decoding
                // as well.
                str = _applyDecodingMap(str, dhe.html);
                str = _applyDecodingMap(str, dhe.latin);
    
            }else{
                str = _applyDecodingMap(str, m);
            }
        }
        return str;
    };
    return dhe;
});


},
'sbt/smartcloud/ProfileService':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 *	Social Business Toolkit SDK.
 *	@author Vimal Dhupar
 *
 *	Javascript APIs for IBM SmartCloud Profiles Service.
 *	@module sbt.smartcloud.ProfileService
**/

define(["../declare","../lang", "../config","../stringUtil","../Cache","./Subscriber","../Jsonpath","../base/BaseService", "../base/JsonDataHandler", "./ProfileConstants", "../base/BaseEntity","../Promise"],
		function(declare, lang, config, StringUtil, Cache, Subscriber, JsonPath, BaseService, JsonDataHandler, Consts, BaseEntity, Promise) {
	/**
     * Profile class representing the Smartcloud User Profile.
     * 
     * @class Profile
     * @namespace sbt.smartcloud
     */
	var Profile = declare(BaseEntity, {
		/**
		 * Profile Class Constructor
         * 
         * @constructor
         * @param args
         */
        constructor : function(args) {
        },
		
        /**
         * Loads the profile object with the profile entry document associated
         * with the profile. By default, a network call is made to load the
         * profile entry document in the profile object.
         * 
         * @method load
         * @param {Object} [args] Argument object
         * 
         */
		load: function(args) {
			var profileId = this.getId();
            var promise = this.service._validateProfileId(profileId);
            if (promise) {
                return promise;
            }

            var self = this;
            var callbacks = {
                createEntity : function(service,data,response) {
                    return new JsonDataHandler({
                        data : data,
                        jsonpath : Consts.ProfileJsonPath
                    });
                }
            };
            var requestArgs = {};
            requestArgs.userid = profileId;
            lang.mixin(requestArgs, args || {format:"json"});            
            var options = {
                handleAs : "json",
                query : requestArgs
            };
            return this.service.getEntity(consts.GetProfile, options, profileId, callbacks, args);
		},
		
		/**
		 * Returns the id of the User
		 * @method getId
		 * @return {String} id of the User	
		**/
		getId: function () {
			return this.getAsString("id");
		},
		
		/**
		 * Returns the id of the User
		 * @method getUserid
		 * @return {String} id of the User	
		**/
		getUserid: function () {
			return this.getAsString("id");
		},
		
		/**
		 * Returns the object id of the User
		 * @method getObjectId
		 * @return {String} id of the User	
		 */
		getObjectId: function () {
			return this.getAsString("objectId");
		},
		
		/**
		 * Get display name of the User
		 * @method getDisplayName
		 * @return {String} display name of the User	
		 */
		getDisplayName: function () {
			return this.getAsString("displayName");
		},
		
		/**
		 * Get display name of the User
		 * @method getName
		 * @return {String} display name of the User	
		 */
		getName: function () {
			return this.getAsString("displayName");
		},
		
		/**
		 * Get email of the User
		 * @method getEmail
		 * @return {String} email of the User	
		 */
		getEmail: function () {
			return this.getAsString("emailAddress");
		},
		
		/**
		 * Get thumbnail URL of the User
		 * @method getThumbnailUrl
		 * @return {String} thumbnail URL of the User
		 */
		getThumbnailUrl: function () {
			var image = this.getAsString("thumbnailUrl");
			if(image)
				image = this.service.endpoint.baseUrl+"/contacts/img/photos/"+ image;  // TODO : work in making this generic
			return image;
		},
		
		/**
		 * Get address of the profile
		 * @method getAddress
		 * @return {String} Address object of the profile
		 */
		getAddress: function () { 
			var address = this.getAsArray("address");
			address = this.dataHandler.extractFirstElement(address);
			return address;
		},
		
		/**
		 * Get department of the profile
		 * @method getDepartment
		 * @return {String} department of the profile
		 */
		getDepartment: function () {
			return this.getAsString("department"); 
		},
		
		/**
		 * Get job title of the profile
		 * @method getJobTitle
		 * @return {String} job title of the profile
		 */
		getJobTitle: function () {
			return this.getAsString("jobTitle");
		},
		
		/**
		 * Get profile URL of the profile
		 * @method getProfileUrl
		 * @return {String} profile URL of the profile
		 */
		getProfileUrl: function () {
			return this.getAsString("profileUrl");
		},
		
		/**
		 * Get telephone number of the profile
		 * @method getTelehoneNumber
		 * @return {String} Telephone number object of the profile
		 */
		getTelephoneNumber: function () {
			return this.getAsString("telephone"); 
		},
		
		/**
		 * Get Country of the profile
		 * @method getCountry
		 * @return {String} country of the profile
		 */
		getCountry: function () { 
			return this.getAsString("country"); 
		},
		
		/**
		 * Get Organization Id of the profile
		 * @method getOrgId
		 * @return {String} Organization Id of the profile
		 */
		getOrgId: function () { 
			return this.getAsString("orgId"); 
		},
		
		/**
		 * Get Organization of the profile
		 * @method getOrg
		 * @return {String} Organization of the profile
		 */
		getOrg: function () { 
			return this.getAsString("org"); 
		},
		
		/**
		 * Get "About Me"/description of the profile
		 * @method getAbout
		 * @return {String} description of the profile
		 */
		getAbout: function () { 
			return this.getAsString("about"); 
		}
	});
	
	/**
     * Callbacks used when reading an entry that contains a Profile.
     */
    var ProfileCallbacks = {
        createEntity : function(service,data,response) {
        	var entryHandler = new JsonDataHandler({
                    data : data,
                    jsonpath : Consts.ProfileJsonPath
                });

            return new Profile({
                service : service,
                id : entryHandler.getEntityId(),
                dataHandler : entryHandler
            });
        }
    };
    
    /**
     * Callbacks used when reading a feed that contains multiple Profiles.
     */
    var ProfileFeedCallbacks = {
        createEntities : function(service,data,response) {
        	return new JsonDataHandler({
                    data : data,
                    jsonpath : Consts.ProfileJsonPath
                });
        }, 
        
        createEntity : function(service,data,response) {
        	var entryHandler = new JsonDataHandler({
                data : data,
                jsonpath : Consts.ProfileJsonPath
            });

        return new Profile({
            service : service,
            id : entryHandler.getEntityId(),
            dataHandler : entryHandler
        });
        }
    };
	
	/**
	 * 	Profile service class associated with a profile service of IBM SmartCloud.
     * 
     * @class ProfileService
     * @namespace sbt.smartcloud
     */
	var ProfileService = declare(BaseService, {		
		_profiles: null,

		 /**
         * 
         * @constructor
         * @param args
         */
		constructor : function(args) {
            if (!this.endpoint) {
                this.endpoint = config.findEndpoint(this.getDefaultEndpointName());
            }
            if(!this._cache){
        		if(config.Properties.ProfileCacheSize || Consts.DefaultCacheSize){
        			this._cache = new Cache(config.Properties.ProfileCacheSize || Consts.DefaultCacheSize);
        		}        		
        	}     
        },

        /**
         * Return the default endpoint name if client did not specify one.
         * @returns {String}
         */
        getDefaultEndpointName: function() {
            return "smartcloud";
        },
		
        /**
         * Get the profile of a user.
         * 
         * @method getProfile
         * @param {String} userId Userid of the profile
         * @param {Object} args Argument object
         */
        getProfile : function(userId, args) {
            var idObject = this._toIdObject(userId);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin(idObject, args || {format:"json"});
            var options = {
                method : "GET",
                handleAs : "json", 
                query : args || { format: "json" }
            };
            var entityId = encodeURIComponent(idObject.userid);
            var url = this.constructUrl(Consts.GetProfileByGUID, {}, {idToBeReplaced : entityId});
            return this.getEntity(url, options, entityId, this.getProfileCallbacks());
        },
        
        /**
         * Get the profile of a user.
         * 
         * @method getProfileByGUID
         * @param {String} userId Userid of the profile
         * @param {Object} args Argument object
         * @deprecated Use getProfile instead.
         */
        getProfileByGUID : function(userId, args) {
            return this.getProfile(userId, args);
        },
        
        /**
         * Get the profile of a logged in user.
         * 
         * @method getMyProfile
         * @param {Object} args Argument object
         */
        getMyProfile : function(args) {
            var self = this;
        	var url = Consts.GetUserIdentity;
        	
        	var promise = new Promise();
        	this.endpoint.request(url, { handleAs : "json" }).then(function(response) {
        		
        		var idObject = self._toIdObject(response.subscriberid);
	            var promise1 = self._validateIdObject(idObject);
	            if (promise1) {
	                return promise1;
	            }
	
	            var requestArgs = lang.mixin(idObject, args || {format:"json"});
	            var options = {
	                method : "GET",
	                handleAs : "json", 
	                query : requestArgs
	            };
	            var entityId = encodeURIComponent(idObject.userid);
	            var url = self.constructUrl(Consts.GetProfileByGUID, {}, {idToBeReplaced : entityId});
	            (self.getEntity(url, options, entityId, self.getProfileCallbacks())).then(function(response) {
	            	promise.fulfilled(response);
				},
				function(error) {
					promise.rejected(error);
				});
        	},
        	function(error) {
        		promise.rejected(error);
        	}
        );
        return promise;
        },
        
        /**
         * Get the contact details of a user.
         * 
         * @method getContact
         * @param {String} userId Userid of the profile
         * @param {Object} args Argument object
         */
        getContact : function(userId, args) {
            var idObject = this._toIdObject(userId);
            var promise = this._validateIdObject(idObject);
            if (promise) {
                return promise;
            }

            var requestArgs = lang.mixin(idObject, args || {format:"json"});
            var options = {
                method : "GET",
                handleAs : "json", 
                query : requestArgs
            };
            var entityId = idObject.userid;
            var url = this.constructUrl(Consts.GetContactByGUID, {}, {idToBeReplaced : entityId});
            return this.getEntity(url, options, entityId, this.getProfileCallbacks());
        },
        
        /**
         * Get the contact details of a user.
         * 
         * @method getContactByGUID
         * @param {String} userId Userid of the profile
         * @param {Object} args Argument object
         * @deprecated Use getContact instead.
         */
        getContactByGUID : function(userId, args) {
           return this.getContact(userId, args);
        },
        
        /**
         * Get logged in user's Connections
         * 
         * @method getMyConnections
         * @param {Object} args Argument object
         */
        getMyConnections : function(args) {
        	var options = {
        		method : "GET",
                handleAs : "json",
                 query : args || {format:"json"}
        	};
            return this.getEntities(Consts.GetMyConnections, options, this.getProfileFeedCallbacks());
        },
        
        /**
         * Get logged in user's Contacts
         * 
         * @method getMyContacts
         * @param {Object} args Argument object
         */
        getMyContacts : function(args) {
        	var options = {
            		method : "GET",
                    handleAs : "json",
                    query : args || {format:"json"}
        	};
        	return this.getEntities(Consts.GetMyContacts, options, this.getProfileFeedCallbacks());
        },
        
        /**
         * Get logged in user's Contacts considering the startIndex and count as provided by the user
         * 
         * @method getMyContactsByIndex
         * @param startIndex
         * @param count
         * @param {Object} args Argument object
         */
        getMyContactsByIndex : function(startIndex, count, args) {
        	var requestArgs = { "startIndex" : startIndex, "count" : count };
        	var options = {
            		method : "GET",
                    handleAs : "json",
                    query : lang.mixin(requestArgs , args || {format:"json"}) 
        	};
        	return this.getEntities(Consts.GetMyContacts, options, this.getProfileFeedCallbacks());
        },
        
        /**
         * Return callbacks for a profile entry
        **/
        getProfileCallbacks : function() {
            return ProfileCallbacks;
        },
        
        /**
         * Return callbacks for a profile feed
        **/
        getProfileFeedCallbacks : function() {
            return ProfileFeedCallbacks;
        },
        
        _toIdObject : function(profileOrId) {
            var idObject = {};
            if (lang.isString(profileOrId)) {
            	idObject.userid = profileOrId;
            } else if (profileOrId instanceof Profile) {
            	idObject.userid = profileOrId.getUserid();
            }
            return idObject;
        },
       
        _validateIdObject : function(idObject) {
            if (!idObject.userid) {
                return this.createBadRequestPromise("Invalid argument, userid must be specified.");
            }
        },
        _validateProfileId : function(profileId) {
            if (!profileId || profileId.length == 0) {
                return this.createBadRequestPromise("Invalid argument, expected userid");
            }
        }
   	});
	return ProfileService;
});

},
'sbt/connections/ProfileAdminService':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * JavaScript API for IBM Connections Profile Service.
 * 
 * @module sbt.connections.ProfileService
 */
define([ "../declare", "../lang", "../config", "../stringUtil", "./ProfileConstants", "../base/BaseService", "../base/XmlDataHandler", "./ProfileService" ], function(
        declare,lang,config,stringUtil,consts,BaseService,XmlDataHandler, ProfileService) { 
    
    /**
     * ProfileAdminService class.
     * 
     * @class ProfileAdminService
     * @namespace sbt.connections
     */
    var ProfileAdminService = declare(ProfileService , {
    	
        /**
         * Create a new profile
         * 
         * @method createProfile
         * @param {Object} profileOrJson Profile object or json representing the profile to be created.
         * @param {Object} [args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        createProfile : function(profileOrJson,args) {
            var profile = this._toProfile(profileOrJson);
            var promise = this._validateProfile(profile);
            if (promise) {
                return promise;
            }

            var requestArgs = {};
            profile.getUserid() ? requestArgs.userid = profile.getUserid() : requestArgs.email = profile.getEmail();
            lang.mixin(requestArgs, args || {});
            
            var callbacks = {};            
            callbacks.createEntity = function(service,data,response) {            	
                return profile;
            };        
            
            var options = {
                    method : "POST",
                    query : requestArgs,
                    headers : consts.AtomXmlHeaders,
                    data : profile.createPostData()
                };   
            
            return this.updateEntity(consts.AdminAtomProfileDo, options, callbacks, args);
            
        },
        
        /**
         * Delete an existing profile
         * 
         * @method deleteProfile
         * @param {Object} profileId userid or email of the profile
         * @param {Object}[args] Object representing various query parameters
         *            that can be passed. The parameters must be exactly as they are
         *            supported by IBM Connections.
         */
        deleteProfile : function(profileId,args) {
        	var promise = this._validateProfileId(profileId);
            if (promise) {
                return promise;
            }

            var requestArgs = {};
            this.isEmail(profileId) ? requestArgs.email = profileId : requestArgs.userid = profileId;
            lang.mixin(requestArgs, args || {});
            
            var options = {
                method : "DELETE",
                query : requestArgs,
                handleAs : "text"
            };
            
            return this.deleteEntity(consts.AdminAtomProfileEntryDo, options, profileId, args);
            
        }        
    });
    return ProfileAdminService;
});

},
'sbt/authenticator/GadgetOAuth':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK. 
 * Definition of the authentication mechanism for OAuth 1.0.
 */
define([ "../declare", "../lang" ], function(declare,lang) {

    /**
     * OpenSocial OAuth authentication.
     * 
     * This class triggers the authentication for a service.
     */
    return declare(null, {

        constructor : function(args) {
            lang.mixin(this, args || {});
        },

        /**
         * Method that authenticates the current user
         */
        authenticate : function(options) {
            var onOpen = function() {
            };
            var onClose = function() {
            };
            var response = options.error.response;
            var popup = new gadgets.oauth.Popup(response.oauthApprovalUrl, null, onOpen, onClose);
            popup.createOpenerOnClick();
        }
    });
});
},
'sbt/authenticator/OAuth':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK.
 * Definition of the authentication mechanism for OAuth 1.0.
 */
define(['../declare','../lang', '../util'], function(declare, lang, util) {

	/**
	 * OAuth 1.0 authentication.
	 * 
	 * This class triggers the authentication for a service.
	 */
	return declare(null, {
		
		url:			"",
		loginUi:		"",	// mainWindow, dialog or popup
	
		constructor: function(args){
			lang.mixin(this, args || {});	
		},
	
		/**
		 * Method that authenticates the current user 
		 */
		authenticate: function(options) {
		    var self = this;
			require(["sbt/config"], function(config) {
			    var mode = options.loginUi || config.Properties["loginUi"] || this.loginUi;
            	var width = config.Properties["login.oauth.width"] || 800;
            	var height = config.Properties["login.oauth.height"] || 450;
	            if(mode=="popup") {
	                return self._authPopup(options, self.url, width, height);
	            } else if(mode=="dialog") {
	                return self._authDialog(options, self.url, width, height);
	            } else {
	                return self._authMainWindow(options, self.url);
	            }
			});
		},
		
		_authMainWindow: function(options, sbtUrl) {
			var url = sbtUrl + "?oaredirect="+encodeURIComponent(window.location.href);
			newwindow=window.location.href = url;
			return true;
			
		},
		
		_authPopup: function(options, sbtUrl, width, height) {
		    require(["sbt/config"], function(config){
		        config.callback = options.callback;
	            var url = sbtUrl + "?loginUi=popup";
	            
	            var windowQueryMap = {
                    height: height,
                    width: width
	            };
	            var windowQuery = util.createQuery(windowQueryMap, ",");
	            newwindow = window.open(url,'Authentication',windowQuery);
	            return true;
		    });
		},
		
		_authDialog: function(options, sbtUrl, width, height) {
			require(["sbt/_bridge/ui/OAuthDialog"], function(dialog) {
				dialog.show(sbtUrl, width, height);
			});
			return true;
		}
	});
});
},
'sbt/store/AtomStore':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * @module sbt.store.AtomStore
 */
define(["../declare","../config","../lang", "../base/core", "../xml", "../xpath", "../itemFactory", "../Promise",
        "dojo/_base/Deferred", "dojo/promise/Promise", "dojo/store/util/QueryResults", "../entities"], 
        function(declare, config, lang, core, xml, xpath, itemFactory, SbtPromise, Deferred, Promise, QueryResults, entities) {
  
    /**
     * @class sbt.store.AtomStore
     */
    var AtomStorePromise = declare(Promise, {
        // private
        _store : null,
        _isRejected : false,
        _isFulfilled : false,
        _isCancelled : false,
        _callbacks : [],
        _errbacks :  [],
        _endpoint : null,
        _xmlData : null,
        // read only
        totalResults : null,
        startIndex : 0,
        itemsPerPage : 5,
        items : null,
        // public
        url : "",
        sendQuery : true,
        unescapeHTML : false,
        atom : core.feedXPath,
        attributes : core.entryXPath,
        namespaces : core.namespaces,
        paramSchema: {},
        total: null,
        
        /**
         * Constructor for the AtomStore promise.
         * @param args requires
         * 	endpoint: the endpoint to be used
         */
        constructor: function(args, query, options) {
            this._endpoint = config.findEndpoint(args.endpoint || "connections");
            this._options = options;
            this._callbacks = [];
            this._errbacks = [];
            this.total = new SbtPromise();
            
            if (args) {
                this.url = args.url;
                this.attributes = args.attributes || this.attributes;
                this.atom = args.feedXPath || this.atom;
                this.namespaces = args.namespaces || this.namespaces;
                this.sendQuery = args.hasOwnProperty("sendQuery") ? args.sendQuery : this.sendQuery;
                this.unescapeHTML = args.unescapeHTML || this.unescapeHTML;
                this.paramSchema = args.paramSchema || this.paramSchema;
            }
            
            // add paging information to the query
            if (this.paramSchema.pageNumber) {
            	var page = Math.floor(options.start / options.count) + 1;
            	query.pageNumber = query.pageNumber || page;
            }
            if (this.paramSchema.startIndex) {
            	query.startIndex = query.startIndex || options.start;
            }
            if (this.paramSchema.pageSize) {
            	query.pageSize = query.pageSize || options.count;
            }
            
            // add the sorting information to the query
            if (options.sort && options.sort[0]) {
                if (options.sort[0].attribute) {
                    query.sortBy = options.sort[0].attribute;
                }

                if(options.sort[0].descending === true) {
                    query.sortOrder = "desc";
                }
                else if(options.sort[0].descending === false) {
                    query.sortOrder = "asc";
                }
            }

            var fetchArgs = {
                query : query
            };

            this._doFetch(fetchArgs);
        },

        /*
         * Add new callbacks to the promise.
         */
        then: function(callback, errback, progback) {
            if (this._isFulfilled) {
                callback(this.items);
                return;
            }
            
            if (callback) {
                this._callbacks.push(callback);
            }
            if (errback) {
                this._errbacks.push(errback);
            }
        },

        /*
         * Inform the deferred it may cancel its asynchronous operation.
         */
        cancel: function(reason, strict) {
            this._isCancelled = true;
        },

        /*
         * Checks whether the promise has been resolved.
         */
        isResolved: function() {
            return this._isRejected || this._isFulfilled;
        },

        /*
         * Checks whether the promise has been rejected.
         */
        isRejected: function() {
            return this._isRejected;
        },

        /*
         * Checks whether the promise has been resolved or rejected.
         */
        isFulfilled: function() {
            return this._isFulfilled;
        },

        /*
         * Checks whether the promise has been canceled.
         */
        isCanceled: function() {
            return this._isCancelled;
        },
        
        // Internals
        
        /*
         * Given a query and set of defined options, such as a start and count of items to return,
         * this method executes the query and makes the results available as data items.
         */
        _doFetch: function(args) {
            var self = this;
            var scope = args.scope || self;
            
            var serviceUrl = this._getServiceUrl(args.query);
            if (!serviceUrl) {
                if (args.onError) {
                    args.onError.call(new Error("sbt.store.AtomStore: No service URL specified."));
                }
                return;
            }
            
            this._endpoint.xhrGet({
                serviceUrl : serviceUrl,
                handleAs : "text",
                preventCache: true,
                load : function(response) {
                    try {
                        // parse the data
                    	self.response = response;
                        self._xmlData = xml.parse(response);
                        self.totalResults = parseInt(xpath.selectText(self._xmlData, self.atom.totalResults, self.namespaces));
                        self.startIndex = parseInt(xpath.selectText(self._xmlData, self.atom.startIndex, self.namespaces));
                        self.itemsPerPage = parseInt(xpath.selectText(self._xmlData, self.atom.itemsPerPage, self.namespaces));
                        self.items = self._createItems(self._xmlData);
                        
                        
                        if (self._options.onComplete) {
                            self._options.onComplete.call(self._options.scope || self, self.items, self._options);
                        }
                        // invoke callbacks
                        self.total.fulfilled(self.totalResults);
                        self._fulfilled(self.items);
                    } catch (error) {
                    	self.total._rejected(error);
                        self._rejected(error);
                    }
                },
                error : function(error) {
                	self.total._rejected(error);
                    self._rejected(error);
                }
            });
        },
        
        /*
         * Create the service url and include query params
         */
        _getServiceUrl: function(query) {
            if (!this.sendQuery) {
                return this.url;
            }
            if (!query) {
                return this.url;
            }
            if (lang.isString(query)) {
            	return this.url + (~this.url.indexOf('?') ? '&' : '?') + query;
            }
            
            var pairs = [];
            var paramSchema = this.paramSchema;
            for(var key in query) {
                if (key in paramSchema) {
                    var val = paramSchema[key].format(query[key]);
                    if (val) {
                    	pairs.push(val);
                    }
                } else {
                	pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
                }
            }
            if (pairs.length == 0) {
                return this.url;
            }
            
            return this.url + (~this.url.indexOf('?') ? '&' : '?') + pairs.join("&");
        },
        
        /*
         * Create a query string from an object
         */
        _createQuery: function(queryMap) {
            if (!queryMap) {
                return null;
            }
            var pairs = [];
            for(var name in queryMap){
                var value = queryMap[name];
                pairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
            }
            return pairs.join("&");
        },        

        _createItems: function(document) {
            var nodes = xpath.selectNodes(document, this.atom.entries, this.namespaces);
            var items = [];
            for (var i=0; i<nodes.length; i++) {
                items.push(this._createItem(nodes[i]));
            }
            return items;
        },
        
        _createItem: function(element) {
            var attribs = this._getAttributes();
            var xpathCountFunction = /^count\(.*\)$/;
            
            // TODO add item.index and item.attribs
            var item = { 
                element : element,
                getValue : function(attrib) { 
                	var result = [];
                	 if(typeof this[attrib] == "object"){
                     	for(var i=0;i<this[attrib].length; i++){
                     		result[i] = entities.encode(this[attrib][i]);
                     	}
                     }
                     else{
                    	 result = entities.encode(this[attrib]);
                     }
                	
                	return result; 
                }
            };
            for (var i=0; i<attribs.length; i++) {
                var attrib = attribs[i];
                var access = this.attributes[attrib];
                if (lang.isFunction(access)) {
                    item[attrib] = access(this, item);
                } else if (access.match(xpathCountFunction)){
                    item[attrib] = xpath.selectNumber(element, access, this.namespaces)+"";
                } else {
                    var nodes = xpath.selectNodes(element, access, this.namespaces);
                    if (nodes && nodes.length == 1) {
                        item[attrib] = entities.encode(nodes[0].text) || entities.encode(nodes[0].textContent);
                    } else if (nodes) {
                        item[attrib] = [];
                        for (var j=0; j<nodes.length; j++) {
                            item[attrib].push(entities.encode(nodes[j].text) || entities.encode(nodes[j].textContent));
                        }
                    } else {
                        item[attrib] = null;
                    }
                }

            }
           
            return item;
        },
        
        _getAttributes: function() {
            var result = [];
            for (var name in this.attributes) {
                if (this.attributes.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        },
        
        _fulfilled : function(totalCount) {
            if (this._isCancelled) {
                return;
            }
            this._isFulfilled = true;
            while (this._callbacks.length > 0) {
                var callback = this._callbacks.shift();
                callback(totalCount);
            }
        },
        
        _rejected : function(error) {
            if (this._isCancelled) {
                return;
            }
            this._isRejected = true;
            while (this._errbacks.length > 0) {
                var errback = this._errbacks.shift();
                errback(error);
            }
        }
        
    });
    
    /**
      * @module sbt.store.AtomStore
      */
    var AtomStore = declare(null, {
        
        // Indicates the property to use as the identity property. The values of this
        // property should be unique.
        idProperty: "id",
        
        _args : null,
        
        /**
         * Constructor for the Atom store.
         * 
         * @param args
         * An anonymous object to initialize properties. It expects the following values:
         *   url: The url to a service or an XML document that represents the store 
         *   unescapeHTML: A boolean to specify whether or not to unescape HTML text 
         *   sendQuery: A boolean indicate to add a query string to the service URL  
         */
        constructor: function(args) {
            this._args = args;

            //if(!args.url) {
            //    throw new Error("sbt.store.AtomStore: A service URL must be specified when creating the data store");
            //}
        },
        
        /**
         * @method getEndpoint
         * @returns
         */
        getEndpoint: function() {
        	return config.findEndpoint(this._args.endpoint || "connections");
        },
        
        /**
         * Retrieves an object by its identity
         * @method get
         * @param id
         */
        get: function(id) {
            throw new Error("sbt.store.AtomStore: Not implemented yet!");
        },

        /**
         * Returns an object's identity
         * @method getIdentity
         * @param object
         */
        getIdentity: function(object) {
            return object.id;
        },
        
        setUrl: function(url){
        	this._args.url = url;
        },
        
        getUrl: function(){
            return this._args.url;
        },
        
        setAttributes: function(attributes){
        	this._args.attributes = attributes;
        },
        
        /**
         * Queries the store for objects. This does not alter the store, but returns a set of data from the store.
         * @method query
         * @param query
         * @param options
         */
        query: function(query, options) {
            var results = new AtomStorePromise(this._args, query, options);
            return QueryResults(results);
        }
    });
    return AtomStore;
    
});

},
'sbt/connections/nls/ConnectionsService':function(){
/*
 * � Copyright IBM Corp. 2012,2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Default resource bundle for ConnectionsService
 */
define({
  root: ({
	  invalid_argument : "Invalid Argument"
  })
});
},
'sbt/itemFactory':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * I18n utilities
 */
define(["./lang", "./xpath", "./base/core"], function(lang, xpath, core) {
    
    var XPathCountFunction = /^count\(.*\)$/;

    /**
     * @module sbt.itemFactory
     */
    return {
        
        createItems: function(document, attributes, thisObject, decoder) {
            var nodes = xpath.selectNodes(document, core.feedXPath.entry, core.namespaces);
            var items = [];
            if (nodes.length == 0) {
                nodes = xpath.selectNodes(document, "a:entry", core.namespaces);
            } 
            for (var i=0; i<nodes.length; i++) {
                items.push(this.createItem(nodes[i], attributes, thisObject, decoder));
            }
            return items;
        },
        
        createItem: function(element, attributes, thisObject, decoder) {
            // TODO add item.index and item.attribs
            var item = { 
                element : element,
                getValue : function(attrib) { return this[attrib]; }
            };
            var attribs = this.getAttribs(attributes);
            for (var i=0; i<attribs.length; i++) {
                var attrib = attribs[i];
                var access = attributes[attrib];
                if (lang.isFunction(access)) {
                    item[attrib] = access(thisObject, item);
                } else if (access.match(XPathCountFunction)){
                    item[attrib] = xpath.selectNumber(element, access, core.namespaces);
                } else {
                    var nodes = xpath.selectNodes(element, access, core.namespaces);
                    if (nodes && nodes.length == 1) {
                        item[attrib] = nodes[0].text || nodes[0].textContent;
                    } else if (nodes) {
                        item[attrib] = [];
                        for (var j=0; j<nodes.length; j++) {
                            item[attrib].push(nodes[j].text || nodes[j].textContent);
                        }
                    } else {
                        item[attrib] = null;
                    }
                }
                
                item[attrib] = (decoder) ? decoder.decode(item[attrib]) : item[attrib];
            }
            return item;
        },
        
        getAttribs: function(attributes) {
            var attribs = [];
            for (var name in attributes) {
                if (attributes.hasOwnProperty(name)) {
                    attribs.push(name);
                }
            }
            return attribs;
        }
        
    };
    
});
},
'sbt/compat':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Compatibility with older browsers
 * 
 *  @module sbt.compat
 */
define([],function() {
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(item, start) {
			 var index = start || 0;
			 var max = this.length;
		     for (; index < max; index++) {
		         if (this[index] === item) { return index; }
		     }
		     return -1;
		};
	}
	return {
		
	};
});
},
'sbt/authenticator/nls/SSO':function(){
/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */ 

/**
 * Social Business Toolkit SDK - Default resource bundle for validate module.
 */


define({
  root: ({	 
	  message_title: "ReAuthenticate",
	  message:"Authentication expired, Please login again."
  })

});
},
'sbt/_bridge/dom':function(){
/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * Social Business Toolkit SDK - Some DOM utilities.
 */
define(['dojo/dom','dojo/_base/window', 'dojo/dom-construct', 'dojo/dom-class'],function(dom,win,domConstruct,domClass) {
	return {
		byId: function(id) {
			return dom.byId(id);
		},
		createTextNode: function(text) {
			//return dojo.doc.createTextNode(text);
			//change also made to define, added 'dojo/_base/window'
			return win.doc.createTextNode(text);
		},
		create: function(element, props, refNode) {
			return domConstruct.create(element, props, refNode);
		},
        destroy: function(node) {
            return domConstruct.destroy(node);
        },
        toDom: function(template, parent) {
            return domConstruct.toDom(template, parent);
        },
		removeAll: function(node) {
			node = this.byId(node);
			if(node) {
				while(node.firstChild) node.removeChild(node.firstChild);
			}
            return node;
		},
		setText: function(node,text) {
			node = this.byId(node);
			if(node) {
				this.removeAll(node);
				node.appendChild(this.createTextNode(text)); 		
			}
            return node;
		},	
		setAttr: function(node,attr,text) {
			node = this.byId(node);
			if(node) {
				if(text) {
					node.setAttribute(attr,text);
				} else {
					node.removeAttribute(attr);
				}
			}
            return node;
		},
		addClass: function(node, className) {
			return domClass.add(node, className);
		},
		removeClass: function(node, className) {
			return domClass.remove(node, className);
		}
	};
});
},
'sbt/connections/FollowService':function(){
/*
 * � Copyright IBM Corp. 2013
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 *The following resources are enabled for these applications:

 *Activities
 *You can follow any public activity. To follow a private activity, you must be a member of the activity.
 *Blogs
 *You can follow any stand-alone blog; you cannot follow community blogs.
 *Communities
 *You do not have to be a member to follow public or moderated communities. You must be a member to follow private communities.
 *Files
 *You can follow any public file or file folders. You can only follow private files and file folders that have been shared with you.
 *Forums
 *You can follow any public forum or forum topic. You can only follow private forums if you are a member or owner of the forum.
 *News repository
 *You can follow any tag.
 *Profiles
 *You can follow any profile.
 *Wikis
 *You can follow any public wiki or wiki page. You must be a reader, editor, or owner of a private wiki before you can follow it or one of its pages.
 * 
 * @module sbt.connections.FollowService
 */
define(
		[ "../declare", "../config", "../lang", "../stringUtil", "../Promise",
				"./FollowConstants", "./ConnectionsService",
				"../base/AtomEntity", "../base/XmlDataHandler" ],
		function(declare, config, lang, stringUtil, Promise, consts,
				ConnectionsService, AtomEntity, XmlDataHandler) {
			
			var SourceTmpl = "<category term=\"${getSource}\" scheme=\"http://www.ibm.com/xmlns/prod/sn/source\"></category>";
			var ResourceTypeTmpl = "<category term=\"${getResourceType}\" scheme=\"http://www.ibm.com/xmlns/prod/sn/resource-type\"></category>";
			var ResourceIdTmpl = "<category term=\"${getResourceId}\" scheme=\"http://www.ibm.com/xmlns/prod/sn/resource-id\"></category>";

			/**
			 * FollowedResource class represents an entry for a resource followed by logged in user.
			 * 
			 * @class FollowedResource
			 * @namespace sbt.connections
			 */
			var FollowedResource = declare(AtomEntity, {
				
				xpath : consts.FollowedResourceXPath,

				/**
				 * Construct a FollowedResource entity.
				 * 
				 * @constructor
				 * @param args
				 */
				constructor : function(args) {
				},

		        /**
		         * Return extra entry data to be included in post data for this entity.
		         * 
		         * @returns {String}
		         */
		        createEntryData : function() {
		        	var postData = "";
		            var transformer = function(value,key) {
		                return value;
		            };
	            	postData += stringUtil.transform(SourceTmpl, this, transformer, this);
	            	postData += stringUtil.transform(ResourceTypeTmpl, this, transformer, this);
	                if (this.getResourceId()) {
	                	postData += stringUtil.transform(ResourceIdTmpl, this, transformer, this);
	                }
		            return stringUtil.trim(postData);
		        },
		        
				/**
				 * Return the value of IBM Connections followed resource ID from
				 * resource ATOM entry document.
				 * 
				 * @method getFollowedResourceUuid
				 * @return {String} Resource ID
				 */
				getFollowedResourceUuid : function() {
					var followedResourceUuid = this.getAsString("followedResourceUuid");
					return extractFollowedResourceUuid(followedResourceUuid);
				},

				/**
				 * Sets id of IBM Connections followed resource.
				 * 
				 * @method setFollowedResourceUuid
				 * @param {String} followedResourceUuid Id of the followed resource
				 */
				setFollowedResourceUuid : function(followedResourceUuid) {
					return this.setAsString("followedResourceUuid", followedResourceUuid);
				},

				/**
				 * Return the value of IBM Connections followed resource's service name
				 * 
				 * @method getSource
				 * @return {String} Followed resource's service name
				 */
				getSource : function() {
					return this.getAsString("source");
				},

				/**
				 * Sets IBM Connections followed resource's service name.
				 * 
				 * @method setSource
				 * @param {String}
				 *            Source service name of the followed resource
				 */
				setSource : function(source) {
					return this.setAsString("source", source);
				},

				/**
				 * Return the value of IBM Connections followed resource's resourceType
				 * 
				 * @method getResourceType
				 * @return {String} Followed resource's resource type
				 */
				getResourceType : function() {
					return this.getAsString("resourceType");
				},

				/**
				 * Sets IBM Connections followed resource's resource type.
				 * 
				 * @method setResourceType
				 * @param {String}
				 *            resourceType of the followed resource
				 */
				setResourceType : function(resourceType) {
					return this.setAsString("resourceType", resourceType);
				},

				/**
				 * Return the value of IBM Connections followed resource's resourceId
				 * 
				 * @method getResourceId
				 * @return {String} Followed resource's resource Id
				 */
				getResourceId : function() {
					return this.getAsString("resourceId");
				},

				/**
				 * Sets IBM Connections followed resource's resourceId.
				 * 
				 * @method setResourceType
				 * @param {String}
				 *            resource id of the followed resource
				 */
				setResourceId : function(resourceId) {
					return this.setAsString("resourceId", resourceId);
				},

				/**
				 * Return the value of IBM Connections followed resource's type
				 * 
				 * @method getType
				 * @return {String} Followed resource's resource type
				 */
				getType : function() {
					return this.getAsString("categoryType");
				},

				/**
				 * Sets IBM Connections followed resource's resource type.
				 * 
				 * @method setCategoryResourceType
				 * @param {String}
				 *            type of the followed resource 
				 */
				setCategoryType : function(categoryType) {
					return this.setAsString("categoryType", categoryType);
				},

		        /**
		         * Start following
		         * 
		         * @method startFollowing
		         * @param {Object} [args] Argument object
		         */
		        startFollowing : function(args) {
		            return this.service.startFollowing(this, args);
		        },

		        /**
		         * Stop following
		         * 
		         * @method stopFollowing
		         * @param {Object} [args] Argument object
		         */
		        stopFollowing : function(args) {
		            return this.service.stopFollowing(this, args);
		        }

			});
			
		    /*
		     * Callbacks used when reading a feed that contains followed resource entries.
		     */
		    var FollowResourceFeedCallbacks = {
		        createEntities : function(service,data,response) {
		            return new XmlDataHandler({
		                service : service,
		                data : data,
		                namespaces : consts.Namespaces,
		                xpath : consts.FollowedResourceFeedXPath
		            });
		        },
		        createEntity : function(service,data,response) {
		             return new FollowedResource({
		                 service : service,
		                 data : data
		             });
		        }
		    };
		    
		    /*
		     * Method used to extract the community uuid for an id url.
		     */
		    var extractFollowedResourceUuid = function(followedResourceUuid) {
		    	var followedResourceUuidPrefix = "urn:lsid:ibm.com:follow:resource-";
	        	if(followedResourceUuid && followedResourceUuid.indexOf(followedResourceUuidPrefix) != -1){
	        		followedResourceUuid = followedResourceUuid.substring(followedResourceUuidPrefix.length, followedResourceUuid.length);
	        	}
	            return followedResourceUuid;
		    };

			/**
			 * FollowService class.
			 * 
			 * @class FollowService
			 * @namespace sbt.connections
			 */
			var FollowService = declare(
					ConnectionsService,
					{
						contextRootMap : {
							activities : "activities",
							blogs : "blogs",
							communities : "communities",
							files : "files",
							forums : "forums",
							news : "news",
							profiles : "profiles",
							wikis : "wikis"
						},
						
						serviceName : "connections",

						/**
						 * Constructor for FollowService
						 * 
						 * @constructor
						 * @param args
						 */
						constructor : function(args) {
							if (!this.endpoint) {
								this.endpoint = config.findEndpoint(this
										.getDefaultEndpointName());
							}
						},

						/**
						 * Get the followed resources feed
						 * 
						 * @method getFollowedResources
						 * @param {String} source String specifying the resource.
						 * @param {String} resourceType String representing the resource type.
						 * @param {Object} [args] Addtional request arguments supported by Connections REST API.
						 */
						getFollowedResources : function(source, resourceType, args) {
							var requestArgs = lang.mixin({
								source : source,
								type : resourceType
							}, args || {});
							
							var options = {
								method : "GET",
								handleAs : "text",
								query : requestArgs
							};
							
							var url = null;
				            url = this.constructUrl(consts.AtomFollowAPI, null, {
				            	service : this._getServiceName(source)
							});
							return this.getEntities(url, options, this._getFollowedResourceFeedCallbacks());
						},
						
						/**
						 * Get the followed resource
						 * 
						 * @method getFollowedResource
				         * @param {String/Object} followedResource
				         * @param {Object} [args] Object representing various parameters if any
						 */
						getFollowedResource : function(followedResourceOrJson, args) {
							var followedResource = this._toFollowedResource(followedResourceOrJson);
				            var promise = this._validateFollowedResource(followedResource, false, args);
				            if (promise) {
				                return promise;
				            }
			                
							var requestArgs = lang.mixin({
								source : followedResource.getSource(),
								type : followedResource.getResourceType(),
								resource : followedResource.getResourceId()
							}, args || {});
							
							var options = {
								method : "GET",
								handleAs : "text",
								query : requestArgs
							};
							
						    var callbacks = {
						        createEntity : function(service,data,response) {
						        	followedResource.xpath = consts.OneFollowedResourceXPath;
						        	followedResource.setData(data);
						            return followedResource;
						        }
						    };
							
							var url = null;
				            url = this.constructUrl(consts.AtomFollowAPI, null, {
				            	service : this._getServiceName(followedResource.getSource())
							});
							return this.getEntity(url, options, followedResource.getResourceId(), callbacks);
						},

				        /**
				         * Start Following a resource
				         * 
				         * @method startFollowing
				         * @param {String/Object} followedResource
				         * @param {Object} [args] Object representing various parameters if any
				         */
						startFollowing : function(followedResourceOrJson, args) {
							var followedResource = this._toFollowedResource(followedResourceOrJson);
				            var promise = this._validateFollowedResource(followedResource, false, args);
				            if (promise) {
				                return promise;
				            }
			                
			                var options = {
			                    method : "POST",
			                    headers : consts.AtomXmlHeaders,
			                    data : followedResource.createPostData()
			                };
							
			                var callbacks = {};
			                callbacks.createEntity = function(service,data,response) {
			                	followedResource.setData(data);
			                    return followedResource;
			                };
			                
							var url = null;
				            url = this.constructUrl(consts.AtomFollowAPI, null, {
				            	service : this._getServiceName(followedResource.getSource())
							});
			                
			                return this.updateEntity(url, options, callbacks);
			            },

				        /**
				         * Stop Following a resource
				         * 
				         * @method stopFollowing
				         * @param {String/Object} followedResource
				         * @param {Object} [args] Object representing various parameters if any
				         */
						stopFollowing : function(followedResourceOrJson, args) {
							var followedResource = this._toFollowedResource(followedResourceOrJson);
				            var promise = this._validateFollowedResource(followedResource, true);
				            if (promise) {
				                return promise;
				            }

				            var requestArgs = lang.mixin({
								source : followedResource.getSource(),
								type : followedResource.getResourceType(),
								resource : followedResource.getResourceId()
							}, args || {});
				            
				            var options = {
			                    method : "DELETE",
			                    headers : consts.AtomXmlHeaders,
			                    query : requestArgs
			                };
				            
			                var url = this.constructUrl(consts.AtomStopFollowAPI, null, {
				            	service : this._getServiceName(followedResource.getSource()),
				            	resourceId : followedResource.getFollowedResourceUuid()
			    			});
			                return this.deleteEntity(url, options, followedResource.getResourceId());
			            },
				        
				        /**
				         * Create a FollowedResource object with the specified data.
				         * 
				         * @method newFollowedResource
				         * @param {Object} args Object containing the fields for the 
				         * new blog 
				         */
				        newFollowedResource : function(args) {
				            return this._toFollowedResource(args);
				        },

						/*
						 * Callbacks used when reading a feed that contains
						 * followed resource entries.
						 */
						_getFollowedResourceFeedCallbacks : function() {
							return FollowResourceFeedCallbacks;
						},

				        /*
				         * Validate a blog, and return a Promise if invalid.
				         */
						_validateFollowedResource : function(followedResource, checkUuid) {
				            if (!followedResource || !followedResource.getSource()) {
				                return this.createBadRequestPromise("Invalid argument, resource with source must be specified.");
				            }
				            if (!followedResource.getResourceType()) {
				                return this.createBadRequestPromise("Invalid argument, resource with resource yype must be specified.");
				            }
				            if (!followedResource.getResourceId()) {
				                return this.createBadRequestPromise("Invalid argument, resource with resource id must be specified.");
				            }
				            if (checkUuid && !followedResource.getFollowedResourceUuid()) {
				                return this.createBadRequestPromise("Invalid argument, resource with UUID must be specified.");
				            }				            
				        },

				        /*
				         * Validate a followedResource UUID, and return a Promise if invalid.
				         */
				        _validateFollowedResourceUuid : function(followedResourceUuid) {
				            if (!followedResourceUuid || followedResourceUuid.length == 0) {
				                return this.createBadRequestPromise("Invalid argument, expected followedResourceUuid.");
				            }
				        },

						/*
				         * Return a Followed Resource instance from FollowedResource or JSON or String. Throws
				         * an error if the argument was neither.
				         */
				        _toFollowedResource : function(followedResourceOrJsonOrString) {
				            if (followedResourceOrJsonOrString instanceof FollowedResource) {
				                return followedResourceOrJsonOrString;
				            } else {
				                if (lang.isString(followedResourceOrJsonOrString)) {
				                	followedResourceOrJsonOrString = {
			                			followedResourceUuid : followedResourceOrJsonOrString
				                    };
				                }
				                return new FollowedResource({
				                    service : this,
				                    _fields : lang.mixin({}, followedResourceOrJsonOrString)
				                });
				            }
				        },
						
				        /*
				         * Return a Followed Resource instance from FollowedResource or JSON or String. Throws
				         * an error if the argument was neither.
				         */
				        _getServiceName : function(source) {
				        	var contextRoot = this.contextRootMap;
				        	for (var key in contextRoot) {
				        		if(source == key){
				        			return contextRoot[key];
				        		}
							}
							return "";
				        }
					});
			return FollowService;
		});
}}});
define([], 1);
