$(document).ready(function () {
    $('.openNavBtn').click(function (e) {
        e.preventDefault();
        $('header nav .navUl .ulnav').addClass('opennav');
        $('.overlayNav').addClass('showOverlay');
    });
    $('.overlayNav , nav ul a').click(function () {
        $('header nav .navUl .ulnav').removeClass('opennav');
        $('.overlayNav').removeClass('showOverlay');
    });

    //header scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Notification dropdown
    $("header nav .sideNavBtn.mobshow .notif").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".notifDrop").toggleClass("show");
    });

    //innerHeader
    var path = window.location.pathname;
    if (path !== "/" && path !== "") {
        $("header").addClass("inner-header");
    }

    // user dropdown
    $("header nav .sideNavBtn.mobshow .userDropDown").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".userDropList").toggleClass("show");
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".notifDrop, .notfiBtn").length) {
            $(".notifDrop").removeClass("show");
        }
        if (!$(e.target).closest(".userDropList").length) {
            $(".userDropList").removeClass("show");
        }
    });

    $(".notifDrop").on("click", ".deleteBtn", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest("li").fadeOut(300, function () {
            $(this).remove();
        });
    });


    //slider
    $('.mainSlider .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        nav: false,
        items: 1,
    });

    $('.factorySlider .owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            560: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1200: {
                items: 3,
            },
            1600: {
                items: 4,
            },
        }
    });

    $('.partners .owl-partner1').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        nav: false,
        autoplay: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            991: {
                items: 9,
            },
        }
    });

    $('.partners .owl-partner2').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            991: {
                items: 9,
            },
        }
    });
    $('#owl-clients').owlCarousel({
        autoplay: true,
        loop: true,
        margin: 10,
        nav: false,
        items: 1,
    });

    //product slider

    var main = $(".main-slider");
    var thumbs = $(".thumbs-slider");
    var syncedSecondary = true;

    main.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        responsiveRefreshRate: 200,
    }).on('changed.owl.carousel', syncPosition);

    thumbs
        .on('initialized.owl.carousel', function () {
            thumbs.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: 3,
            dots: false,
            nav: false,
            margin: 8,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 1,
            responsiveRefreshRate: 100,
            responsive: {
                0: {
                    items: 1,
                },
                360: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                991: {
                    items: 3,
                },
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - 0.5);

        if (current < 0) current = count;
        if (current > count) current = 0;

        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");

        if (!syncedSecondary) return;

        var start = thumbs.find('.owl-item.active').first().index();
        var end = thumbs.find('.owl-item.active').last().index();

        if (current > end) {
            thumbs.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            thumbs.data('owl.carousel').to(current - thumbs.find('.owl-item.active').length + 1, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            main.data('owl.carousel').to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        main.data('owl.carousel').to(number, 300, true);
    });

    //add Cart Modal

    $('.productText form').on('submit', function (e) {
        e.preventDefault();
        $('#quantityModal').modal('show');
    });


    //modal Un

    /* =========================================================
    GLOBAL MODAL STATE
    ========================================================= */
    let $currentItem = null;
    let currentType = null;

    /* =========================================================
       MODAL CONFIG
    ========================================================= */
    const modalConfig = {

        deleteItem: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف المنتج</h3>
                <p>هل تريد حذف هذا المنتج؟</p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteItem">حذف</button>
                `
        },

        deleteAll: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف الكل</h3>
                <p>هل تريد حذف جميع المنتجات؟</p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteAll">حذف الكل</button>
                `
        },

        editQty: {
            img: '/assets/images/edit.png',
            body: `
                <h3>تعديل الكمية</h3>
                <input class="form-control mb-4" type="number" id="newQty" min="1">
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="saveQty">حفظ</button>
                `
        },

        deleteLocation: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف العنوان</h3>
                <p>هل تريد حذف هذا العنوان؟</p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteLocation">حذف</button>
                `
        },

        saveLocation: {
            img: '',
            body: `
                <input type="text" id="addressSearch" class="form-control mb-3" placeholder="ابحث عن الموقع">
                <div id="map" style="height:400px;border-radius:12px;margin-bottom:24px"></div>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="saveLocation">تأكيد</button>
                `
        },
        deleteBank: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف الحساب البنكي</h3>
                <p>هل تريد حذف هذا الحساب النبكي؟</p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteLocation">حذف</button>
                `
        },
        deleteNotification: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف الاشعار؟ </h3>
                <p>هل تريد حذف هذا الاشعار؟ </p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteLocation">حذف</button>
                `
        },
        deleteAllNotifications: {
            img: '/assets/images/delete.png',
            body: `
                <h3>حذف الكل</h3>
                <p>هل تريد حذف جميع الإشعارات؟</p>
                `,
            footer: `
                <button class="mainBtn" data-bs-dismiss="modal">إلغاء</button>
                <button class="blueBtn" id="confirmDeleteLocation">حذف</button>
                `
        },
    };

    /* =========================================================
       OPEN MODAL
    ========================================================= */
    $(document).on('click', '.openModal, .addLocation, .editLocation, .deleteLocation,.deletBank,.deleteAllNotifications,.deleteNotification', function () {

        currentType = $(this).data('type');

        if (currentType === 'deleteItem' || currentType === 'editQty') {
            $currentItem = $(this).closest('.productCartItem');
        } else if (currentType === 'deleteAll') {
            $currentItem = $('.cartInfo');
        } else if ($(this).hasClass('deleteLocation') || $(this).hasClass('editLocation')) {
            $currentItem = $(this).closest('.locationItem');
        } else if ($(this).hasClass('deleteBank')) {
            $currentItem = $(this).closest('.bankAccountItem');
        } else if ($(this).hasClass('deleteNotification')) {
            $currentItem = $(this).closest('.notifItem');
        } else if ($(this).hasClass('deleteAllNotifications')) {
            $currentItem = $('.notifItem');
        } else {
            $currentItem = null;
        }

        const config = modalConfig[currentType];

        if (config.img && config.img.trim() !== '') {
            $('#modalImage').attr('src', config.img).show(); // عرض الصورة
        } else {
            $('#modalImage').hide(); // إخفاء الصورة إذا كانت فارغة
        }

        $('#modalBody').html(config.body);
        $('#modalFooter').html(config.footer);

        if (currentType === 'editQty') {
            $('#newQty').val($(this).data('qty'));
        }

        $('#globalModal').modal('show');
    });

    /* =========================================================
    DELETE / EDIT ACTIONS
    ========================================================= */
    $(document).on('click', '#confirmDeleteItem', function () {
        $currentItem.remove();
        $('#globalModal').modal('hide');
    });

    $(document).on('click', '#confirmDeleteAll', function () {
        $('.productCartItem').remove();
        $('#globalModal').modal('hide');
    });

    $(document).on('click', '#saveQty', function () {
        $currentItem.find('.qtyValue').text($('#newQty').val());
        $('#globalModal').modal('hide');
    });

    $(document).on('click', '#confirmDeleteLocation', function () {
        $currentItem.remove();
        $('#globalModal').modal('hide');
    });

    $(document).on('click', '#confirmDeleteBank', function () {
        $currentItem.remove();
        $('#globalModal').modal('hide');
    });

    /* =========================================================
    GOOGLE MAP LOGIC (CLEAN)
    ========================================================= */
    let map = null;
    let marker = null;
    let geocoder = null;
    let autocomplete = null;

    function initLocationMap() {

        const input = document.getElementById('addressSearch');
        if (!input) return; // أمان

        const defaultLocation = {
            lat: 24.7136,
            lng: 46.6753
        };

        geocoder = new google.maps.Geocoder();

        map = new google.maps.Map(document.getElementById('map'), {
            center: defaultLocation,
            zoom: 12
        });

        marker = new google.maps.Marker({
            map: map,
            position: defaultLocation,
            draggable: true
        });

        autocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: {
                country: 'sa'
            }
        });

        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            map.setCenter(place.geometry.location);
            map.setZoom(16);
            marker.setPosition(place.geometry.location);
        });

        map.addListener('click', function (e) {
            marker.setPosition(e.latLng);
        });
    }

    // ✅ اجعل الدالة متاحة للـ Google Maps API
    window.initMap = initLocationMap;

    /* =========================================================
    INIT MAP ON MODAL OPEN
    ========================================================= */
    $('#globalModal').on('shown.bs.modal', function () {
        if (currentType !== 'saveLocation') return;

        setTimeout(() => {
            if (map) {
                map = null;
                marker = null;
                geocoder = null;
                autocomplete = null;
                $('#map').html('');
            }

            initLocationMap();

            setTimeout(() => {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(marker.getPosition());
            }, 100);
        }, 300);
    });


    /* =========================================================
    SAVE LOCATION
    ========================================================= */
    $(document).on('click', '#saveLocation', function () {

        const position = marker.getPosition();

        geocoder.geocode({
            location: position
        }, function (results, status) {
            if (status === 'OK' && results[0]) {
                console.log({
                    address: results[0].formatted_address,
                    lat: position.lat(),
                    lng: position.lng()
                });
                alert(`تم حفظ الموقع:\n${results[0].formatted_address}\nLat: ${position.lat()}, Lng: ${position.lng()}`);
            } else {
                alert('لم يتم التعرف على الموقع');
            }
        });

        $('#globalModal').modal('hide');
    });

    //modal confirm

    $('.orderConformBtn').on('click', function (e) {
        e.preventDefault();
        $('#dataModal').modal('hside');
        $('#dataModal').on('hidden.bs.modal', function () {
            $('#successModal').modal('show');
            $(this).off('hidden.bs.modal');
        });
    });

    $('#orderForm').on('submit', function (e) {
        e.preventDefault();
        $('#dataModal').modal('hide');
        $('#dataModal').on('hidden.bs.modal', function () {
            $('#successModal').modal('show');
            $(this).off('hidden.bs.modal');
        });
    });

    // Upload logo
    $('#logoInput').on('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('.logoImage').attr('src', e.target.result).show();
                $('.logoText').hide();
            };
            reader.readAsDataURL(file);
        }
    });

    //chat

    const chatContainer = $("#chatContainer");
    const chatBtn = $(".chat");

    // إظهار/إخفاء الشات عند الضغط على الزر
    chatBtn.click(function () {
        chatContainer.toggle(); // toggle لإظهار/إخفاء
    });

    const chatBody = $("#chatBody");
    const msgInput = $("#msgInput");
    const imageInput = $("#imageInput");
    let typingIndicator;

    function sendMessage() {
        const msg = msgInput.val().trim();
        if (msg !== "") {
            addMessage("sent", msg);
            msgInput.val("");
            showTyping();
            setTimeout(botReply, 1500);
        }
    }

    $("#sendBtn").click(sendMessage);

    msgInput.on("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    imageInput.change(function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                addMessage("sent", `<img src="${evt.target.result}" class="chatImage">`);
                showTyping();
                setTimeout(botReply, 1500);
            };
            reader.readAsDataURL(file);
        }
    });

    function addMessage(type, content) {
        const msgHTML = `
        <div class="msg ${type}">
          ${type === "received" ? '<img src="assets/images/chatUser.png" class="avatar">' : ""}
          <div class="bubble">${content}</div>
          ${type === "sent" ? '<img src="assets/images/profile.png" class="avatar">' : ""}
          <span class="time">الآن</span>
        </div>
      `;
        chatBody.append(msgHTML);
        chatBody.scrollTop(chatBody[0].scrollHeight);
    }

    function showTyping() {
        removeTyping();
        typingIndicator = $(`
        <div class="msg received typing" id="typingIndicator">
          <img src="assets/images/chatUser.png" class="avatar">
          <div class="bubble d-flex gap-2">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      `);
        chatBody.append(typingIndicator);
        chatBody.scrollTop(chatBody[0].scrollHeight);
    }

    function removeTyping() {
        $("#typingIndicator").remove();
    }

    function botReply() {
        removeTyping();
        addMessage("received", "تم استلام الرسالة ✅");
    }

    //copy Text
    $(document).on('click', '.copyText', function () {

        var text = $(this)
            .prev('div')
            .find('span')
            .text()
            .trim();
        navigator.clipboard.writeText(text).then(() => {
            showCopyToast();
        });
    });

    function showCopyToast() {
        var toast = $('#copyToast');
        toast.addClass('show');
        setTimeout(() => {
            toast.removeClass('show');
        }, 1500);
    };
    $(".depositBtn").click(function (e) {
        e.preventDefault();
        $('.alertOverlay').addClass('showOverlay');
        $(".deposit").addClass('slideLeftAlert');
    });
    $(".withdrawBtn").click(function (e) {
        e.preventDefault();
        $('.alertOverlay').addClass('showOverlay');
        $(".withdraw").addClass('slideLeftAlert');
    });

    $('#ProductImgInput').on('change', function () {
        const file = this.files[0];
        if (!file) return;
        $('#fileName').text(file.name);
        const type = file.type;
        if (type.includes('image')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#fileIcon').attr('src', '/assets/images/file.png');
            };
            reader.readAsDataURL(file);
        } else if (type.includes('pdf')) {
            $('#fileIcon').attr('src', '/assets/images/pdf-icon.png');
        } else if (type.includes('word')) {
            $('#fileIcon').attr('src', '/assets/images/word-icon.png');
        } else {
            $('#fileIcon').attr('src', '/assets/images/fileIcon.png');
        }
    });

    //modal
    $(".closeModal, .alertOverlay, .verificationOverlay").click(function (e) {
        e.preventDefault();
        $('.alertOverlay').removeClass('showOverlay');
        $('.verificationOverlay').removeClass('showOverlay');
        $(".priceOfferModal, .rejectpriceOfferModal, .addNewphoneModal, .verificationModal , .alertModalBox ,.blockModal  ").removeClass('slideLeftAlert slideLeftVerify');
    });

    $(document).on('submit', '.bankAccountForm', function (e) {
        e.preventDefault();
        $('#successModal').modal('show');
    });

    // Phone input initialization
    var input = document.querySelector("#phone");
    if (input) {
        window.intlTelInput(input, {
            initialCountry: "sa",
            preferredCountries: ["sa", "eg", "ae"],
            separateDialCode: true,
            autoPlaceholder: "aggressive",
            nationalMode: false,
        });
    };


    // General close handlers for modals
    $(".closeModal, .alertOverlay, .verificationOverlay").click(function (e) {
        e.preventDefault();
        $('.alertOverlay').removeClass('showOverlay');
        $('.verificationOverlay').removeClass('showOverlay');
        $(".priceOfferModal, .rejectpriceOfferModal, .addNewphoneModal, .verificationModal , .alertModalBox ,.blockModal  ").removeClass('slideLeftAlert slideLeftVerify');
    });

    // Alert overlay and rest button close
    $(".alertOverlay, .restBtn").click(function () {
        $('.alertOverlay').removeClass('showOverlay');
        $(".alertModal").removeClass('slideLeftAlert');
    });

    // Login form submit
    $(".loginDiv form.sign").submit(function (e) {
        e.preventDefault();
        $("#verificationModal").addClass('slideLeftVerify');
        $('.verificationOverlay').addClass('showOverlay');
        $(".code").first().focus();
    });

    // Edit phone
    $(".editphone").click(function (e) {
        e.preventDefault();
        $("#verificationModal").addClass('slideLeftVerify');
        $('.verificationOverlay').addClass('showOverlay');
        $(".code").first().focus();
    });

    // Confirm phone form
    $(document).on("submit", "#verificationModal .confrimPhoneForm", function (e) {
        e.preventDefault();
        $("#verificationModal").removeClass('slideLeftVerify');
        $('.verificationOverlay').addClass('showOverlay');
        $(".addNewphoneModal").addClass('slideLeftAlert');
    });

    // Add new phone form
    $(".addNewphoneModal form").submit(function (e) {
        e.preventDefault();
        $("#confrimNewPhoneForm").addClass('slideLeftVerify');
        $(".addNewphoneModal").removeClass('slideLeftAlert');
    });

    $(".code").on("input", function () {
        let $this = $(this);
        if ($this.val().length === 1) {
            $this.next(".code").focus();
        }
    });

    // varifcation Code
    $("#verifyBtn").click(function () {
        let code = "";
        $(".code").each(function () {
            code += $(this).val();
        });

        if (code.length === 4) {
            if (code === "1234") {
                window.location.href = "index.html";
                showToast("تم تسجيل الدخول بنجاح", "success");
            } else {
                showToast("رمز التحقق غير صحيح", "error");
            }
        } else {
            showToast("يرجى إدخال 4 أرقام", "info");
        }
    });

    function showToast(message, type = "info", duration = 3000) {
        const $toast = $("#toast");

        $toast
            .removeClass("success error info warning show")
            .addClass(type)
            .text(message)
            .addClass("show");

        setTimeout(() => {
            $toast.removeClass("show");
        }, duration);
    }

    //loader
    $(window).on("load", function () {
        $("#preloader")
            .fadeOut(400, function () {
                $(this).remove();
            });
    });
});