package keeper

import (
	"encoding/binary"

	"github.com/cosmonaut/blog/x/blog/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) AppendComment(ctx sdk.Context, comment types.Comment) uint64 {
	// Get the current number of comments in the store
	count := k.GetCommentCount(ctx)
	// Assign an ID to the comment based on the number of comments in the store
	comment.Id = count
	// Get the store
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CommentKey))
	// Convert the comment ID into bytes
	byteKey := make([]byte, 8)
	binary.BigEndian.PutUint64(byteKey, comment.Id)
	// Marshal the comment into bytes
	appendedValue := k.cdc.MustMarshal(&comment)
	// Insert the comment bytes using comment ID as a key
	store.Set(byteKey, appendedValue)
	// Update the comment count
	k.SetCommentCount(ctx, count+1)
	return count
}

func (k Keeper) GetCommentCount(ctx sdk.Context) uint64 {
	// Get the store using storeKey (which is "blog") and CommentCountKey (which is "Comment-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CommentCountKey))
	// Convert the CommentCountKey to bytes
	byteKey := []byte(types.CommentCountKey)
	// Get the value of the count
	bz := store.Get(byteKey)
	// Return zero if the count value is not found (for example, it's the first comment)
	if bz == nil {
		return 0
	}
	// Convert the count into a uint64
	return binary.BigEndian.Uint64(bz)
}

func (k Keeper) SetCommentCount(ctx sdk.Context, count uint64) {
	// Get the store using storeKey (which is "blog") and CommentCountKey (which is "Comment-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.CommentCountKey))
	// Convert the CommentCountKey to bytes
	byteKey := []byte(types.CommentCountKey)
	// Convert count from uint64 to string and get bytes
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	// Set the value of Comment-count- to count
	store.Set(byteKey, bz)
}
