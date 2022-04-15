# NSLJS

NSL JS is the Nathan Standard Library JavaScript framework. It is a client-side,
model-view-controller framework. It is designed to support visualizations,
games, and single-page websites. It supports the publish-subscribe pattern.

NSL provides automated support for a number of common Nathan problems. These
include:

1. Simple page creation
1. DOM interaction
1. API calls
1. Infinite-scroll pages
1. Arbitrarily sized tables
1. And more!

# Architecture

NSL uses JavaScript classes. Each NSL class (except the base) extends a parent
NSL class.

NSL is divided between classes intended to be directly callable and "abstract"
classes. The callable classes expose valid child NSL classes within the scope of
the current class. The abstract classes contain actual NSL functionality. Each
callable class extends its corresponding abstract class (and has no children).
Each abstract class extends its parent abstract class in the overall NSL
hierarchy. NSL uses this approach to allow easy traversal of classes without
allowing parent classes to expose extraneous child classes.

For example, the NSLViewDOM class extends the NSLViewDOMAbstract class. The
abstrat class contains functions intended for NSLViewDOM objects and their
descendants:

Thus, we are able to get

# Document Object Model

NSL 

# Use
