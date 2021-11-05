package me.varunon9.imagecompressor

import android.content.ContentResolver
import android.database.Cursor
import android.net.Uri
import android.os.AsyncTask
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray

class GalleryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule( ) {
    companion object {
        private const val DISPLAY_NAME = "DISPLAY_NAME"
        private const val DATA = "DATA"
        private const val DATE_TAKEN = "DATE_TAKEN"
        private const val SIZE_IN_BYTES = "SIZE_IN_BYTES"
    }

    override fun getName(): String {
        return "GalleryModule"
    }

    override fun getConstants(): Map<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants[DISPLAY_NAME] = DISPLAY_NAME
        constants[DATA] = DATA
        constants[DATE_TAKEN] = DATE_TAKEN
        constants[SIZE_IN_BYTES] = SIZE_IN_BYTES
        return constants
    }

    @ReactMethod
    fun getImages(promise: Promise) {
        GetImagesTask(promise, reactApplicationContext).execute()
    }

    private class GetImagesTask(private val promise: Promise, private val reactContext: ReactApplicationContext) :
        AsyncTask<Void, Void, Void>() {
            override fun doInBackground(vararg voids: Void): Void? {
                try {
                    val imagesArray: WritableArray = WritableNativeArray()
                    val imageResolver: ContentResolver = reactContext.contentResolver
                    val imageUri: Uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI
                    val imageCursor: Cursor? = imageResolver.query(
                        imageUri, null, null, null,
                        "${android.provider.MediaStore.Images.Media.DATE_TAKEN} DESC"
                    )
                    if (imageCursor != null && imageCursor.moveToFirst()) {
                        val displayNameColumn: Int =
                            imageCursor.getColumnIndex(android.provider.MediaStore.Images.Media.DISPLAY_NAME)
                        val dataColumn: Int =
                            imageCursor.getColumnIndex(android.provider.MediaStore.Images.Media.DATA)
                        val sizeColumn: Int =
                            imageCursor.getColumnIndex(android.provider.MediaStore.Images.Media.SIZE)
                        val dateColumn: Int =
                            imageCursor.getColumnIndex(android.provider.MediaStore.Images.Media.DATE_TAKEN)
                        do {
                            val map: WritableMap = Arguments.createMap()
                            map.putString(DISPLAY_NAME, imageCursor.getString(displayNameColumn))
                            map.putString(DATA, imageCursor.getString(dataColumn))
                            map.putString(DATE_TAKEN, imageCursor.getString(dateColumn))
                            map.putInt(SIZE_IN_BYTES, imageCursor.getInt(sizeColumn))
                            imagesArray.pushMap(map)
                        } while (imageCursor.moveToNext())
                    }
                    promise.resolve(imagesArray)
                } catch (e: Exception) {
                    promise.reject(e)
                }
                return null
            }
        }
}


