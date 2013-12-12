/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Aria.classDefinition({
    $classpath : "test.atplugins.carousel.CarouselTest",
    $extends : "aria.jsunit.WidgetTestCase",
    $dependencies : ["atplugins.carousel.Carousel"],
    $prototype : {

        testMinimumConfig : function () {
            var widget = this.createAndInit("atplugins.carousel.Carousel", {
                width: 800,
                height: 250,
                images : [
                    {src : "/test/atplugins/carousel/images/p1.jpg", title : "This is the caption for the first picture"},
                    {src : "/test/atplugins/carousel/images/p2.jpg", title : "...some text for the second picture..."},
                    {src : "/test/atplugins/carousel/images/p3.jpg", title : "...and some more for the last one."}]

            });
            // check first pic index
            this.assertTrue(widget._idx==1, "minimum config: internal pic index should be 1 but is " + widget._idx);
            widget.$dispose();
            this.outObj.clearAll();
        },

        testEdgeCasesForIndex : function () {
            var data = { loop : {} },
                config = {
                    width: 800,
                    height: 250,
                    images : [
                        {src : "/test/atplugins/carousel/images/p1.jpg", title : "This is the caption for the first picture"},
                        {src : "/test/atplugins/carousel/images/p2.jpg", title : "...some text for the second picture..."},
                        {src : "/test/atplugins/carousel/images/p3.jpg", title : "...and some more for the last one."}],
                    index : 6,
                    loop : {
                        type : "stop",
                        speed : 0
                    },
                    bind : {
                        index : {inside : data, to : "index"},
                        loop  : {inside : data, to : "loop"}
                    }
                },
                widget = this.createAndInit("atplugins.carousel.Carousel", config);

            // pic index checks
            this.assertTrue(widget._idx == 1, "wrong initial index: internal pic index should be 1 but is " + widget._idx);

            aria.utils.Json.setValue(data, "index", config.images.length-1);
            this.assertTrue(widget._idx == config.images.length, "index binding: internal pic index should be " + config.images.length + " but is " + widget._idx);

            // looptype = stop
            aria.utils.Json.setValue(data, "index", config.images.length-1);
            widget._next();
            this.assertTrue(widget._idx == config.images.length, "loop type stop & max index: internal pic index should be " + config.images.length + " but is " + widget._idx + " after _next().");

            aria.utils.Json.setValue(data, "index", 0);
            widget._previous();
            this.assertTrue(widget._idx == 1, "loop type stop & min index: internal pic index should be 1 but is " + widget._idx + " after _previous().");

            // looptype = reverse
            aria.utils.Json.setValue(data.loop, "type", "reverse");
            
            aria.utils.Json.setValue(data, "index", 0);
            var dir = widget._cfg.loop.direction;
            widget._previous();
            this.assertTrue(widget._idx == 1, "loop type reverse & min index: internal pic index should be 1 but is " + widget._idx + " after _previous().");
            this.assertTrue(widget._cfg.loop.direction == !dir, "loop type reverse & min index: direction did not change after _previous().");

            aria.utils.Json.setValue(data, "index", config.images.length-1);
            dir = widget._cfg.loop.direction;
            widget._next();
            this.assertTrue(widget._idx == config.images.length, "loop type reverse & max index: internal pic index should be " + config.images.length + " but is " + widget._idx + " after _next().");
            this.assertTrue(widget._cfg.loop.direction == !dir, "loop type reverse & max index: direction did not change after _next().");

            // looptype = rewind
            aria.utils.Json.setValue(data.loop, "type", "rewind");
            
            aria.utils.Json.setValue(data, "index", config.images.length-1);
            widget._next();
            this.assertTrue(widget._idx == 1, "loop type rewind & max index: internal index should be 1 but is " + widget._idx + " after _next().");

            aria.utils.Json.setValue(data, "index", 0);
            widget._previous();
            this.assertTrue(widget._idx == config.images.length, "loop type rewind & min index: internal index should be " + config.images.length + " but is " + widget._idx + " after _previous().");

            // looptype = continuous
            aria.utils.Json.setValue(data.loop, "type", "continuous");

            aria.utils.Json.setValue(data, "index", config.images.length-1);
            widget._next();
            this.assertTrue(widget._idx == config.images.length+1, "loop type continuous & max index: internal index should be " + (config.images.length+1) + " but is " + widget._idx + " after _next().");

            aria.utils.Json.setValue(data, "index", 0); // beware: this does not reset the internal index since we're using the C A B C A structure
            widget._previous();
            this.assertTrue(widget._idx == config.images.length, "loop type continuous & min index: internal index should be " + config.images.length + " but is " + widget._idx + " after _previous().");

            widget.$dispose();
            this.outObj.clearAll();
        }


    }
});