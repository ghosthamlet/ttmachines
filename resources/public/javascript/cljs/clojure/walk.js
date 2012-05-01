goog.provide('clojure.walk');
goog.require('cljs.core');
/**
* Traverses form, an arbitrary data structure.  inner and outer are
* functions.  Applies inner to each element of form, building up a
* data structure of the same type, then applies outer to the result.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.walk = (function walk(inner,outer,form){
if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null,form)))
{return outer.call(null,cljs.core.doall.call(null,cljs.core.map.call(null,inner,form)));
} else
{if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null,form)))
{return outer.call(null,cljs.core.into.call(null,cljs.core.empty.call(null,form),cljs.core.map.call(null,inner,form)));
} else
{if(cljs.core.truth_("﷐'else"))
{return outer.call(null,form);
} else
{return null;
}
}
}
});
/**
* Performs a depth-first, post-order traversal of form.  Calls f on
* each sub-form, uses f's return value in place of the original.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.postwalk = (function postwalk(f,form){
return clojure.walk.walk.call(null,cljs.core.partial.call(null,postwalk,f),f,form);
});
/**
* Like postwalk, but does pre-order traversal.
*/
clojure.walk.prewalk = (function prewalk(f,form){
return clojure.walk.walk.call(null,cljs.core.partial.call(null,prewalk,f),cljs.core.identity,f.call(null,form));
});
/**
* Recursively transforms all map keys from strings to keywords.
*/
clojure.walk.keywordize_keys = (function keywordize_keys(m){
var f__4795 = (function (p__4790){
var vec__4791__4792 = p__4790;
var k__4793 = cljs.core.nth.call(null,vec__4791__4792,0,null);
var v__4794 = cljs.core.nth.call(null,vec__4791__4792,1,null);

if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,k__4793)))
{return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4793),v__4794]);
} else
{return cljs.core.Vector.fromArray([k__4793,v__4794]);
}
});

return clojure.walk.postwalk.call(null,(function (x){
if(cljs.core.truth_(cljs.core.map_QMARK_.call(null,x)))
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,f__4795,x));
} else
{return x;
}
}),m);
});
/**
* Recursively transforms all map keys from keywords to strings.
*/
clojure.walk.stringify_keys = (function stringify_keys(m){
var f__4801 = (function (p__4796){
var vec__4797__4798 = p__4796;
var k__4799 = cljs.core.nth.call(null,vec__4797__4798,0,null);
var v__4800 = cljs.core.nth.call(null,vec__4797__4798,1,null);

if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,k__4799)))
{return cljs.core.Vector.fromArray([cljs.core.name.call(null,k__4799),v__4800]);
} else
{return cljs.core.Vector.fromArray([k__4799,v__4800]);
}
});

return clojure.walk.postwalk.call(null,(function (x){
if(cljs.core.truth_(cljs.core.map_QMARK_.call(null,x)))
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,f__4801,x));
} else
{return x;
}
}),m);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the root of the tree first.
*/
clojure.walk.prewalk_replace = (function prewalk_replace(smap,form){
return clojure.walk.prewalk.call(null,(function (x){
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,smap,x)))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the leaves of the tree first.
*/
clojure.walk.postwalk_replace = (function postwalk_replace(smap,form){
return clojure.walk.postwalk.call(null,(function (x){
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,smap,x)))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
